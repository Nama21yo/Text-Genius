import { UserProfile } from "@clerk/nextjs";
import React from "react";

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Your Profile
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Manage your personal information, update account details, and more.
        </p>
      </div>

      {/* Profile Section */}
      <div>
        <UserProfile />
      </div>

      {/* Footer Section */}
      <footer className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
        Need help? Visit our{" "}
        <a
          href="/support"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          Support Center
        </a>
        .
      </footer>
    </div>
  );
};

export default Page;
