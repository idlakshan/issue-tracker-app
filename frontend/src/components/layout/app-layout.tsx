import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Navbar from "./navbar";



const AppLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Right Side Content Container */}
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        {/* Fixed Navbar */}
        <Navbar />

        {/* Dynamic Pages Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;