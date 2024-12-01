"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import { SignInButton, useUser } from "@clerk/nextjs";
import { createCheckoutSession } from "@/actions/stripe";
import { useRouter } from "next/navigation";

export default function PlanCard({
  name,
  image,
}: {
  name: string;
  image: string;
}) {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  const handleCheckout = async () => {
    if (name === "Free") {
      router.push("/dashboard");
      return;
    }
    try {
      const response = await createCheckoutSession();
      const { url, error } = response;
      if (error) {
        toast.error(error);
        return;
      }
      if (url) {
        window.location.href = url;
      }
    } catch (err: any) {
      console.error("Error creating Stripe Checkout session:", err);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="flex justify-center px-4 py-6">
      <Toaster />
      <div className="flex flex-col max-w-md w-full rounded-xl shadow-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Image */}
        <div className="flex justify-center p-6 bg-gray-100 dark:bg-gray-700">
          <Image
            width={100}
            height={100}
            className="rounded-full shadow-md"
            src={image}
            alt={`${name} Membership`}
          />
        </div>

        {/* Card Content */}
        <div className="p-6 flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            {name} Membership
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Enjoy{" "}
            {name === "Free"
              ? "limited AI-generated content forever for $0.00."
              : "unlimited AI-generated content forever for $9.99/month."}
          </p>
          <ul className="text-left space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              ✨ {name === "Free" ? "Limited" : "Unlimited"} word generation
            </li>
            <li>✨ Advanced AI features</li>
            <li>⚡ Faster processing times</li>
            {name !== "Free" && <li>💬 Priority customer support</li>}
          </ul>
        </div>

        {/* Action Button */}
        <div className="px-6 pb-6 text-center">
          {!isLoaded ? null : !isSignedIn ? (
            <Button className="w-full">
              <SignInButton />
            </Button>
          ) : (
            <Button
              onClick={handleCheckout}
              variant="outline"
              className="w-full"
            >
              {name === "Free" ? "Get Started for Free" : "Subscribe Now"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
