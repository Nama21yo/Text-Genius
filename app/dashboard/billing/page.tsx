"use client";
import { createCustomerPortalSession } from "@/actions/stripe";
import { Button } from "@/components/ui/button";
import React from "react";

const Page = () => {
  const handleClick = async () => {
    try {
      const response = await createCustomerPortalSession();
      window.location.href = response as string;
    } catch (error) {
      console.error("Error accessing the customer portal:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center">
      {/* Header Section */}
      <div className="w-full max-w-lg p-10 my-5 rounded-lg bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 dark:from-blue-800 dark:via-blue-700 dark:to-blue-600 shadow-md">
        <h1 className="text-3xl text-center font-extrabold text-gray-900 dark:text-white">
          Billing Management
        </h1>
        <p className="mt-3 text-md text-gray-700 dark:text-gray-300 text-center">
          Keep track of your subscription and payment details effortlessly.
        </p>
      </div>

      {/* Call to Action Section */}
      <div className="w-full max-w-md px-5 py-10 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-4">
          Access Your Customer Portal
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">
          Use the portal to view your invoices, update payment methods, or
          manage your subscription plan securely.
        </p>
        <Button
          onClick={handleClick}
          className="w-full py-3 text-lg font-semibold"
        >
          Go to Stripe Customer Portal
        </Button>
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
          You will be redirected to a secure Stripe portal to manage your
          billing details.
        </p>
      </div>

      {/* Footer Section */}
      <footer className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
        Need help? Contact our{" "}
        <a
          href="/support"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          Support Team
        </a>
        .
      </footer>
    </div>
  );
};

export default Page;
