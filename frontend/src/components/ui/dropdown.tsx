import type { SelectHTMLAttributes } from "react";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: DropdownOption[];
}

export const Dropdown = ({ options, className = "", ...rest }: DropdownProps) => {
  return (
    <select
      className={`border border-secondary-text/50 rounded-md px-3 py-2 text-(--color-text) focus:outline-none bg-(--color-surface) cursor-pointer h-[42px] text-sm ${className}`}
      {...rest}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};