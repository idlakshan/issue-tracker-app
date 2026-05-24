import { NavLink } from "react-router-dom";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  count?: number;
  to: string;
  end?: boolean;
}

export default function SidebarItem({
  icon,
  label,
  count,
  to,
  end,
}: SidebarItemProps) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition ${
          isActive
            ? "bg-(--color-primary)/10 text-(--color-primary)"
            : "text-secondary-text hover:bg-gray-100"
        }`
      }
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>

      {count !== undefined && (
        <span className="text-xs bg-(--color-primary)/10 text-(--color-primary) px-2 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </NavLink>
  );
}
