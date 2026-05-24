import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Download, Plus } from "lucide-react";
import Button from "../ui/button";

interface NavbarProps {
  onNewIssueClick?: () => void;
  onExportClick?: () => void;
}

const routeTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/issues": "All Issues",
  "/assignees": "Team Assignees",
};

export default function Navbar({
  onNewIssueClick,
  onExportClick,
}: NavbarProps) {
  const location = useLocation();

  const title = useMemo(() => {
    return routeTitles[location.pathname] || "Dashboard";
  }, [location.pathname]);

  return (
    <header className="h-16 bg-(--color-surface) border-b border-secondary-text/10 flex items-center justify-between px-6 shadow-xs sticky top-0 z-10">
      <h1 className="text-lg font-semibold text-(--color-text)">{title}</h1>

      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          icon={<Download size={16} />}
          onClick={onExportClick || (() => console.log("Exporting issues..."))}
        ></Button>

        <Button
          variant="primary"
          icon={<Plus size={16} />}
          onClick={onNewIssueClick || (() => console.log("Open Issue Modal"))}
        >
          New Issue
        </Button>
      </div>
    </header>
  );
}
