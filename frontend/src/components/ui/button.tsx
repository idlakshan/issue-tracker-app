import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: "primary" | "secondary";
  icon?: ReactNode;
}

export default function Button({
  children,
  variant = "primary",
  icon,
  disabled,
  className = "",
  ...rest
}: ButtonProps) {
  const styles = {
    primary: "bg-primary text-primary-text hover:bg-primary-hover",
    secondary:
      "bg-transparent text-secondary-text border border-secondary-text/30 hover:bg-secondary-hover hover:text-text-main",
  };

  return (
    <button
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 font-medium rounded-md cursor-pointer transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed
        ${styles[variant]} ${className}`}
      {...rest}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </button>
  );
}