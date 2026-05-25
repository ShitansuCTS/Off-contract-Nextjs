"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ListChecks,
  Settings,
  ClipboardList,
  ChevronRight,
} from "lucide-react";

type DashboardSidebarProps = {
  sidebarOpen: boolean;
};

const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Leads",
    href: "/dashboard/my-leads",
    icon: ClipboardList,
  },
  {
    label: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    label: "Listings",
    href: "/dashboard/listings",
    icon: ListChecks,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function DashboardSidebar({
  sidebarOpen,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={`admin-sidebar ${sidebarOpen ? "open" : "closed"}`}>
      <div className="admin-sidebar-logo">
        <Link href="/dashboard">
          <Image
            src="/icons/logo.png"
            alt="Logo"
            width={170}
            height={48}
            priority
          />
        </Link>
      </div>

      <div className="admin-sidebar-menu-title">Main Menu</div>

      <nav className="admin-sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-sidebar-link ${isActive ? "active" : ""}`}
            >
              <span className="admin-sidebar-link-left">
                <span className="admin-sidebar-icon">
                  <Icon size={18} />
                </span>

                <span>{item.label}</span>
              </span>

              <ChevronRight className="admin-sidebar-arrow" size={16} />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
