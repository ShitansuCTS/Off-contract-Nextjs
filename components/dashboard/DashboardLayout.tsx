"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import { useAuthStore } from "@/stores/useAuthStore";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { initialized, loading, isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    if (!initialized) {
      checkAuth();
    }
  }, [initialized, checkAuth]);

  useEffect(() => {
    if (initialized && !loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [initialized, loading, isAuthenticated, router]);

  if (!initialized || loading) {
    return (
      <div className="dashboard-auth-loading">Checking authentication...</div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

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
