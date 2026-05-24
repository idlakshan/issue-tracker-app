interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function SidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <div>
      <p className="text-xs font-semibold text-secondary-text px-2 mb-2 tracking-wider">
        {title}
      </p>
      <div className="space-y-1">{children}</div>
    </div>
  );
}