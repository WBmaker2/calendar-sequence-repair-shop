import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: "primary" | "secondary" | "ghost";
  readonly pulse?: boolean;
  readonly children: ReactNode;
}

export default function ActionButton({
  variant = "primary",
  pulse = false,
  className,
  children,
  ...buttonProps
}: ActionButtonProps) {
  const classes = [
    "action-button",
    `action-button--${variant}`,
    pulse ? "gi-pulse" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
