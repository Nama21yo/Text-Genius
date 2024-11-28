"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  FileClock,
  WalletCards,
  Settings,
  Menu,
  ChevronLeft,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SideNav = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "History",
      icon: FileClock,
      path: "/dashboard/history",
    },
    {
      name: "Billing",
      icon: WalletCards,
      path: "/dashboard/billing",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  return (
    <div
      className={`h-screen p-5 shadow-sm border bg-white transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-md hover:bg-gray-200 transition"
          aria-label="Toggle Sidebar"
        >
          {isCollapsed ? <Menu size={28} /> : <ChevronLeft size={28} />}
        </button>
        {!isCollapsed && (
          <h1 className="text-xl font-bold text-gray-800">TextGenAI</h1>
        )}
      </div>

      {/* Menu Items */}
      <nav className="space-y-2">
        {menu.map((item, index) => {
          const isActive = pathname.startsWith(item.path);
          return (
            <div
              key={index}
              className={`${
                isActive
                  ? "bg-primary text-white"
                  : "hover:bg-primary hover:text-white text-gray-800"
              } flex items-center p-2 rounded-lg transition`}
            >
              <Link
                href={item.path}
                className="flex items-center w-full"
                aria-label={item.name}
              >
                <item.icon
                  size={isCollapsed ? 28 : 20} // Larger icons when collapsed
                  className={`${isActive ? "text-white" : "text-gray-600"} ${
                    isCollapsed ? "mx-auto" : ""
                  }`}
                />
                {!isCollapsed && (
                  <span className="ml-3 hidden md:inline">{item.name}</span>
                )}
              </Link>
              {isCollapsed && (
                <div className="absolute left-20 bg-gray-900 text-white text-sm px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition">
                  {item.name}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default SideNav;
