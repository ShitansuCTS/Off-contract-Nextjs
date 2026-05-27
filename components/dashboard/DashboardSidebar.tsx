"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  LayoutDashboard,
  Users,
  ListChecks,
  Settings,
  ClipboardList,
  ChevronRight,
  ShieldCheck,
  ChevronDown,
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
  {
    label: "KYC Verification",
    href: "#",
    icon: ShieldCheck,
    subMenus: [
      {
        label: " Business Profile",
        href: "/dashboard/kyc/complete-profile",
      },
      {
        label: "Complete Payment",
        href: "/dashboard/kyc/complete-payment",
      },
      {
        label: "Admin Approved",
        href: "/dashboard/kyc/admin-approval",
      },
    ],
  },
];

export default function DashboardSidebar({
  sidebarOpen,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  // Open/Close State
  const [openMenu, setOpenMenu] = useState<string | null>(
    pathname.startsWith("/dashboard/kyc") ? "KYC Verification" : null,
  );

  const toggleMenu = (label: string) => {
    setOpenMenu(openMenu === label ? null : label);
  };

  return (
    <aside className={`admin-sidebar ${sidebarOpen ? "open" : "closed"}`}>
      <div className="admin-sidebar-logo">
        <Link href="/">
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

          const isOpen = openMenu === item.label;

          return (
            <div key={item.href}>
              {/* Main Menu */}
              {item.subMenus ? (
                <button
                  onClick={() => toggleMenu(item.label)}
                  className={`admin-sidebar-link ${isActive ? "active" : ""}`}
                  style={{
                    width: "100%",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <span className="admin-sidebar-link-left">
                    <span className="admin-sidebar-icon">
                      <Icon size={18} />
                    </span>

                    <span>{item.label}</span>
                  </span>

                  {isOpen ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>
              ) : (
                <Link
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
              )}

              {/* Sub Menu */}
              {item.subMenus && isOpen && (
                <div className="admin-sidebar-submenu">
                  {item.subMenus.map((sub) => {
                    const isSubActive = pathname === sub.href;

                    return (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className={`admin-sidebar-sublink ${
                          isSubActive ? "active" : ""
                        }`}
                      >
                        {sub.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
