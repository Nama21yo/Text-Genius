"use client";

import React from "react";
import { useUsage } from "@/context/usage";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Usage() {
  const { count, subscribed } = useUsage();
  const credits = Number(process.env.NEXT_PUBLIC_FREE_TIER_USAGE) || 0;
  const percentage = subscribed ? 100 : Math.min((count / credits) * 100, 100);

  return (
    <div className="m-4 p-4 bg-white border rounded-lg shadow-sm">
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Credit Summary
      </h2>

      {/* Progress Bar */}
      <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {/* Usage Stats */}
      <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
        {subscribed ? (
          <span>Unlimited Credits</span>
        ) : (
          <div>
            <span>{count} credits used</span>
            <span>{credits} total credits</span>
          </div>
        )}
      </div>

      {/* Upgrade Button */}
      <Link href="/membership">
        <Button className="w-full mt-4 py-2" variant="secondary">
          Upgrade Now
        </Button>
      </Link>
    </div>
  );
}
