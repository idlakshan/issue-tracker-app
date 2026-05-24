import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { useState } from "react";
import { useGetIssueStatsQuery } from "../../store/api/issueApi";
import IssueModel from "../issue-modal";

export default function AppLayout() {
  const { data: stats } = useGetIssueStatsQuery();

  const totalIssuesCount = stats?.total ?? 0;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`
        fixed inset-y-0 left-0 z-50 md:sticky md:z-0 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        <Sidebar
          totalIssuesCount={totalIssuesCount}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      <div className="flex flex-col flex-1 h-screen overflow-hidden w-full">
        <Navbar
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          onNewIssueClick={() => setIsIssueModalOpen(true)}
        />

        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <IssueModel
        open={isIssueModalOpen}
        onClose={() => setIsIssueModalOpen(false)}
      />
    </div>
  );
}
