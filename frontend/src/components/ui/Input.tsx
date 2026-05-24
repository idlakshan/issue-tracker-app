import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
}

export default function Input({ icon, className = "", ...rest }: InputProps) {
  return (
    <div className="relative flex items-center w-full">
      {icon && (
        <span className="absolute left-3 flex items-center text-secondary-text">
          {icon}
        </span>
      )}

      <input
        className={`border border-secondary-text/30 rounded-md px-3 py-2 text-text-main bg-surface
          placeholder:text-secondary-text/60 placeholder:font-medium focus:outline-none focus:border-primary transition-colors
          ${icon ? "pl-10" : ""}
          ${className}
        `}
        {...rest}
      />
    </div>
  );
}
