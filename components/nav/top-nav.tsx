"use client";
import React from "react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Toaster } from "react-hot-toast";
import { useUsage } from "@/context/usage";
import { ChevronRight } from "lucide-react";

export default function TopNav() {
  const { isSignedIn, user } = useUser();
  const subscribed = useUsage();

  return (
    <nav className="flex flex-wrap items-center justify-between p-4 shadow-md bg-white md:flex-nowrap">
      <Toaster />
      {/* Brand/Logo Section */}
      <Link
        href="/"
        className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
        aria-label="Home"
      >
        Text<span className="text-gray-700">Genius</span>
      </Link>

      {/* Membership Info - Hidden on smaller screens */}
      {!subscribed && (
        <div className="hidden md:block text-center font-semibold">
          <Link href="/membership">Join free or $4.99/month</Link>
        </div>
      )}

      <div className="text-center">
        <Link
          href="/gen-ai"
          className="inline-block px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-md transform transition-transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <span className="flex items-center justify-center gap-2">
            🚀 TextGenAI
            <ChevronRight className="w-5 h-5" />
          </span>
        </Link>
      </div>

      {/* Navigation Links & User Actions */}
      <div className="flex flex-wrap items-center space-x-4 mt-4 md:mt-0 md:flex-nowrap">
        {isSignedIn && (
          <Link
            href="/dashboard"
            className="text-gray-800 font-medium hover:text-blue-600 transition"
            aria-label="Dashboard"
          >
            {`${user?.fullName}'s Dashboard`}
          </Link>
        )}

        {/* Signed-Out View */}
        <SignedOut>
          <SignInButton>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition focus:outline-none focus:ring focus:ring-blue-400 w-full md:w-auto"
              aria-label="Sign In"
            >
              Sign In
            </button>
          </SignInButton>
        </SignedOut>

        {/* Signed-In View */}
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "h-8 w-8",
              },
            }}
            aria-label="User Profile"
          />
        </SignedIn>

        {/* Mode Toggle */}
        <div className="ml-2">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
