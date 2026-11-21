import type { ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "ghost";

interface CommonProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

interface LinkButtonProps extends CommonProps {
  href: string;
}

interface NativeButtonProps extends CommonProps {
  href?: undefined;
  type?: "button" | "submit";
}

type ButtonProps = LinkButtonProps | NativeButtonProps;

/** A button-styled link (when `href` is set) or a real <button>. */
export function Button(props: ButtonProps) {
  const { variant = "primary", children, className } = props;
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(" ");

  if (props.href !== undefined) {
    return (
      <a href={props.href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={props.type ?? "button"} className={classes}>
      {children}
    </button>
  );
}
