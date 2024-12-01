"use client";
import React from "react";
import { ChevronRight } from "lucide-react";
import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SignInModal() {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const router = useRouter();

  const handleClick = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      openSignIn();
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-between border border-slate-400 rounded-full bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 px-6 py-3 w-3/4 sm:w-1/2 lg:w-1/3 mx-auto mb-6 hover:from-slate-700 hover:via-slate-800 hover:to-slate-900 hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg"
    >
      <span className="text-white text-lg font-semibold">
        {user ? "🚀 Go to Dashboard" : "🌟 Join Free Membership"}
      </span>
      <span className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md">
        <ChevronRight size={20} />
      </span>
    </div>
  );
}
