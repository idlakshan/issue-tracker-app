import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Menu, Plus } from "lucide-react";
import Button from "../ui/button";
import AvatarStack from "../ui/avatar-stack";

interface NavbarProps {
  onNewIssueClick?: () => void;
  onExportClick?: () => void;
  onMenuClick: () => void;
}

const routeTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/issues": "All Issues",
  "/assignees": "Team Assignees",
};

export default function Navbar({ onNewIssueClick, onMenuClick }: NavbarProps) {
  const location = useLocation();

  const title = useMemo(() => {
    return routeTitles[location.pathname] || "Dashboard";
  }, [location.pathname]);

  return (
    <header className="h-16 bg-(--color-surface) border-b border-secondary-text/10 flex items-center justify-between px-6 shadow-xs sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-lg hover:bg-gray-100 block md:hidden text-(--color-text) cursor-pointer"
        >
          <Menu size={20} />
        </button>

        <h1 className="text-base md:text-lg font-semibold text-(--color-text)">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <div className="hidden sm:block">
          <AvatarStack maxVisible={4} />
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <Button
            variant="primary"
            icon={<Plus size={16} />}
            onClick={onNewIssueClick || (() => console.log("Open Issue Modal"))}
          >
            <span className="hidden sm:inline">New Issue</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
