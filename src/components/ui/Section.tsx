import type { ComponentPropsWithoutRef } from "react";
import styles from "./Section.module.css";

type SectionProps = ComponentPropsWithoutRef<"section">;

export function Section({ className, ...rest }: SectionProps) {
  const classes = className ? `${styles.section} ${className}` : styles.section;
  return <section className={classes} {...rest} />;
}
