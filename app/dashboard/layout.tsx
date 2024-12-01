"use client";

import Head from "next/head";
import SideNav from "@/components/nav/side-nav";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>TextGenius Dashboard</title>
        <meta
          name="description"
          content="Your personal dashboard for managing your account and data."
        />
      </Head>
      <div className="flex flex-col h-screen">
        {/* Mobile Navigation */}
        <div className="md:hidden">
          <SideNav />
        </div>

        {/* Main Layout */}
        <div className="flex flex-1 h-screen">
          {/* Sidebar */}
          <div className="hidden h-screen md:block md:w-64 lg:w-1/4">
            <SideNav />
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
