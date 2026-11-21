import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { whenIdle } from "./whenIdle";

describe("whenIdle", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    Reflect.deleteProperty(window, "requestIdleCallback");
    Reflect.deleteProperty(window, "cancelIdleCallback");
  });

  it("falls back to a short timeout when requestIdleCallback is missing", () => {
    const task = vi.fn();
    whenIdle(task);

    expect(task).not.toHaveBeenCalled();
    vi.advanceTimersByTime(100);
    expect(task).toHaveBeenCalledTimes(1);
  });

  it("can be cancelled before it runs", () => {
    const task = vi.fn();
    const cancel = whenIdle(task);

    cancel();
    vi.advanceTimersByTime(1000);
    expect(task).not.toHaveBeenCalled();
  });

  it("uses requestIdleCallback when the browser has it", () => {
    const requestIdleCallback = vi.fn().mockReturnValue(7);
    const cancelIdleCallback = vi.fn();
    window.requestIdleCallback = requestIdleCallback;
    window.cancelIdleCallback = cancelIdleCallback;

    const cancel = whenIdle(() => undefined, 900);
    expect(requestIdleCallback).toHaveBeenCalledWith(expect.any(Function), { timeout: 900 });

    cancel();
    expect(cancelIdleCallback).toHaveBeenCalledWith(7);
  });
});
