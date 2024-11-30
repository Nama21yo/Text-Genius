"use client";

import React from "react";
import { useUsage } from "@/context/usage";
import { Button } from "@/components/ui/button";

export default function Usage() {
  const { count } = useUsage();
  const credits = 10000;
  const percentage = (count / credits) * 100;

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
        <span>{count} credits used</span>
        <span>{credits} total credits</span>
      </div>

      {/* Upgrade Button */}
      <Button className="w-full mt-4 py-2" variant="secondary">
        Upgrade Now
      </Button>
    </div>
  );
}
