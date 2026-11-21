import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { animateIn } from "./animateIn";

type VisibilityCallback = (entries: { isIntersecting: boolean }[]) => void;

describe("animateIn", () => {
  let reveal: VisibilityCallback = () => undefined;
  const play = vi.fn();
  const pause = vi.fn();
  const cancel = vi.fn();
  const animate = vi.fn(() => ({ play, pause, cancel }));

  beforeEach(() => {
    play.mockClear();
    pause.mockClear();
    cancel.mockClear();
    animate.mockClear();
    Element.prototype.animate = animate as unknown as Element["animate"];
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(callback: VisibilityCallback) {
          reveal = callback;
        }
        observe() {}
        disconnect() {}
      },
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    Reflect.deleteProperty(Element.prototype, "animate");
  });

  it("starts every element paused and staggers their delays", () => {
    const trigger = document.createElement("div");
    const targets = [document.createElement("p"), document.createElement("p")];

    animateIn(trigger, targets, {
      from: "translateY(20px)",
      duration: 1,
      delay: 0.5,
      stagger: 0.1,
    });

    expect(animate).toHaveBeenCalledTimes(2);
    expect(pause).toHaveBeenCalledTimes(2);
    expect(play).not.toHaveBeenCalled();
    const delays = animate.mock.calls.map((call) => (call as unknown[])[1]);
    expect(delays).toEqual([
      expect.objectContaining({ delay: 500, duration: 1000 }),
      expect.objectContaining({ delay: 600, duration: 1000 }),
    ]);
  });

  it("plays the animations once the trigger becomes visible", () => {
    const trigger = document.createElement("div");
    animateIn(trigger, [document.createElement("p")], { from: "none", duration: 1 });

    reveal([{ isIntersecting: false }]);
    expect(play).not.toHaveBeenCalled();

    reveal([{ isIntersecting: true }]);
    expect(play).toHaveBeenCalledTimes(1);
  });

  it("plays immediately without waiting when asked to", () => {
    const trigger = document.createElement("div");
    animateIn(trigger, [document.createElement("p")], {
      from: "none",
      duration: 1,
      immediate: true,
    });

    expect(pause).not.toHaveBeenCalled();
  });

  it("cancels the animations on cleanup", () => {
    const trigger = document.createElement("div");
    const stop = animateIn(trigger, [document.createElement("p")], { from: "none", duration: 1 });

    stop();
    expect(cancel).toHaveBeenCalledTimes(1);
  });

  it("leaves content alone when the browser has no Web Animations support", () => {
    Reflect.deleteProperty(Element.prototype, "animate");
    const trigger = document.createElement("div");

    expect(() =>
      animateIn(trigger, [document.createElement("p")], { from: "none", duration: 1 })(),
    ).not.toThrow();
    expect(animate).not.toHaveBeenCalled();
  });
});
