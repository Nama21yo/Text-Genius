"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  FileClock,
  WalletCards,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Usage from "./usage";
import SignUpModal from "../modal/sign-up-modal";

const SideNav = () => {
  const pathname = usePathname();

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
    <div className="flex flex-col h-full bg-gray-50 shadow-lg border-r p-4">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold text-gray-800">TextGenAI</h1>
      </div>

      {/* Menu Items */}
      <ul className="flex-1 space-y-4">
        {menu.map((item, index) => {
          const isActive = pathname === item.path;
          return (
            <li key={index}>
              <Link
                href={item.path}
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <item.icon className="w-6 h-6" />
                <span className="ml-3">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Usage Component */}
      <div className="mt-6">
        <Usage />
        <SignUpModal />
      </div>
    </div>
  );
};

export default SideNav;
