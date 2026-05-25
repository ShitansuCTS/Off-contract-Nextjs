"use client";

import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="dashboard-wrapper">
      <DashboardSidebar sidebarOpen={sidebarOpen} />

      <div className={`dashboard-main ${!sidebarOpen ? "full" : ""}`}>
        <DashboardHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="dashboard-content">{children}</div>
      </div>
    </div>
  );
}