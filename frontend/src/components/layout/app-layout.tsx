import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { useState } from "react";

export default function AppLayout() {
  const totalIssuesCount = 8;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
          onNewIssueClick={() => console.log("Open Global New Issue Modal")}
          onExportClick={() => console.log("Exporting to Excel...")}
        />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
