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

export default function TopNav() {
  const { isSignedIn, user } = useUser();
  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-white">
      <Toaster />
      {/* Brand/Logo Section */}
      <Link
        href="/"
        className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
        aria-label="Home"
      >
        Text<span className="text-gray-700">Genius</span>
      </Link>

      <div className="text-center font-semibold">
        <Link href="/membership">Join free or $4.99/month</Link>
      </div>
      {/* Navigation Links & User Actions */}
      <div className="flex items-center space-x-4">
        {isSignedIn && (
          <Link
            href="/dashboard"
            className="text-gray-800 font-medium hover:text-blue-600 transition"
            aria-label="Dashboard"
          >
            {`${user.fullName}'s Dashboard`}
          </Link>
        )}

        {/* Signed-Out View */}
        <SignedOut>
          <SignInButton>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition focus:outline-none focus:ring focus:ring-blue-400"
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

        <div className="ml-2">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
