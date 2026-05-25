"use client";

import { useState } from "react";
import {
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import "@/styles/dashboard/dashboard-header.css";

type DashboardHeaderProps = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DashboardHeader({
  sidebarOpen,
  setSidebarOpen,
}: DashboardHeaderProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <button
          type="button"
          className="admin-icon-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle Sidebar"
        >
          {sidebarOpen ? (
            <PanelLeftClose size={22} />
          ) : (
            <PanelLeftOpen size={22} />
          )}
        </button>

        <div className="admin-search-box">
          <Search size={19} />
          <input type="text" placeholder="Search anything..." />
        </div>
      </div>

      <div className="admin-header-right">
        <div className="admin-notification-wrap">
          <button
            type="button"
            className="admin-icon-btn admin-notification-btn"
            onClick={() => setNotificationOpen(!notificationOpen)}
          >
            <Bell size={21} />
            <span></span>
          </button>

          {notificationOpen && (
            <div className="admin-dropdown admin-notification-dropdown">
              <h4>Notifications</h4>

              <div className="admin-notification-item">
                <strong>New lead received</strong>
                <p>Rahul Sharma submitted an inquiry.</p>
              </div>

              <div className="admin-notification-item">
                <strong>Listing pending</strong>
                <p>One listing needs approval.</p>
              </div>
            </div>
          )}
        </div>

        <div className="admin-profile-wrap">
          <button
            type="button"
            className="admin-profile-btn"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <div className="admin-avatar">
              <User size={20} />
            </div>

            <div className="admin-profile-info">
              <strong>Admin User</strong>
              <span>Administrator</span>
            </div>

            <ChevronDown size={18} />
          </button>

          {profileOpen && (
            <div className="admin-dropdown admin-profile-dropdown">
              <button type="button">
                <User size={17} />
                My Profile
              </button>

              <button type="button">
                <Settings size={17} />
                Account Settings
              </button>

              <button type="button" className="logout">
                <LogOut size={17} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
