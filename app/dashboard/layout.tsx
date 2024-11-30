import MobileNav from "@/components/nav/mobile-nav";
import SideNav from "@/components/nav/side-nav";
import React from "react";

export const metadata = {
  title: "Dashboard",
  description: "Your personal dashboard for managing your account and data.",
};

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col h-screen">
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <MobileNav />
      </div>

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar for Desktop */}
        <div className="hidden md:block md:w-64 lg:w-1/4">
          <SideNav />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-4">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
