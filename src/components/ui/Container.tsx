import type { ComponentPropsWithoutRef, ElementType } from "react";
import styles from "./Container.module.css";

type ContainerProps<T extends ElementType> = {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

export function Container<T extends ElementType = "div">({
  as,
  className,
  ...rest
}: ContainerProps<T>) {
  const Tag: ElementType = as ?? "div";
  const classes = className ? `${styles.container} ${className}` : styles.container;
  return <Tag className={classes} {...rest} />;
}
