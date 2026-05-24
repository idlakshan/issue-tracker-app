import { LayoutDashboard, ListTodo, Users, ShieldHalf } from "lucide-react";
import SidebarSection from "../sidebar-section";
import SidebarItem from "../sidebar-item";
import UserInfo from "../user-info";

interface SidebarProps {
  totalIssuesCount?: number;
}

export default function Sidebar({ totalIssuesCount = 0 }: SidebarProps) {
  return (
    <aside className="w-64 h-screen bg-(--color-surface) border-r border-secondary-text/10 flex flex-col justify-between shadow-xs sticky top-0">
      <div>
        <div className="flex items-center gap-2 h-16 px-4 border-b border-secondary-text/10">
          <div className="w-8 h-8 rounded-md bg-(--color-primary) flex items-center justify-center text-(--color-surface)">
            <ShieldHalf size={18} />
          </div>
          <h1 className="text-lg font-semibold text-(--color-text)">
            Issue<span className="text-(--color-primary)">Tracker</span>
          </h1>
        </div>

        <div className="px-3 py-4 space-y-6">
          <SidebarSection title="OVERVIEW">
            <SidebarItem
              icon={<LayoutDashboard size={18} />}
              label="Dashboard"
              to="/admin"
              end
            />
            <SidebarItem
              icon={<ListTodo size={18} />}
              label="All Issues"
              count={totalIssuesCount}
              to="/admin/issues"
            />
          </SidebarSection>

          <SidebarSection title="TEAM">
            <SidebarItem
              icon={<Users size={18} />}
              label="Assignees"
              to="/admin/assignees"
            />
          </SidebarSection>
        </div>
      </div>

      <div className="border-t border-secondary-text/10 p-4 bg-(--color-surface)">
        <UserInfo onLogout={() => console.log("Logging out from Sidebar...")} />
      </div>
    </aside>
  );
}
