import { Reveal } from "@/components/animation/Reveal";
import { SplitText } from "@/components/animation/SplitText";
import shared from "./shared.module.css";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
}

/** Small accent label that fades in, followed by a split-text section heading. */
export function SectionHeader({ eyebrow, title }: SectionHeaderProps) {
  return (
    <div className={shared.header}>
      <Reveal distance={16} duration={0.6}>
        <p className={shared.eyebrow}>{eyebrow}</p>
      </Reveal>
      <SplitText text={title} className={shared.title} />
    </div>
  );
}
