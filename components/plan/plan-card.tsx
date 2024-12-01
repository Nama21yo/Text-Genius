"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import { SignInButton, useUser } from "@clerk/nextjs";
import { createCheckoutSession } from "@/actions/stripe";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";

export default function PlanCard({
  name,
  image,
}: {
  name: string;
  image: string;
}) {
  const [loading, setLoading] = React.useState(false);
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  const handleCheckout = async () => {
    if (name === "Free") {
      router.push("/dashboard");
      return;
    }
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center px-4 py-8">
      <Toaster />
      <div className="flex flex-col max-w-md w-full rounded-xl shadow-lg border bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white overflow-hidden transform hover:scale-105 transition-transform duration-300">
        {/* Image */}
        <div className="flex justify-center p-8 bg-gradient-to-b from-white to-gray-100">
          <Image
            width={120}
            height={120}
            className="rounded-full shadow-xl border-4 border-blue-500"
            src={image}
            alt={`${name} Membership`}
          />
        </div>

        {/* Card Content */}
        <div className="p-6 flex flex-col items-center text-center space-y-4">
          <h2 className="text-3xl font-extrabold">{name} Membership</h2>
          <p className="text-lg">
            {name === "Free"
              ? "Limited AI-generated content forever for $0.00."
              : "Unlimited AI-generated content forever for $9.99/month."}
          </p>
          <ul className="space-y-2 text-base">
            <li>
              ✨ {name === "Free" ? "Limited" : "Unlimited"} word generation
            </li>
            <li>✨ Advanced AI features</li>
            <li>⚡ Faster processing times</li>
            {name !== "Free" && <li>💬 Priority customer support</li>}
          </ul>
        </div>

        {/* Action Button */}
        <div className="px-6 pb-8 text-center">
          {loading ? (
            <Button disabled={loading} className="w-full bg-blue-700">
              <Loader2Icon className="animate-spin mr-2" />
              Processing...
            </Button>
          ) : !isLoaded ? null : !isSignedIn ? (
            <Button className="w-full bg-purple-700 hover:bg-purple-800">
              <SignInButton />
            </Button>
          ) : (
            <Button
              onClick={handleCheckout}
              className={`w-full ${
                name === "Free"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-indigo-700 hover:bg-indigo-800"
              } text-white font-bold py-3 rounded-md shadow-md`}
            >
              {name === "Free" ? "Get Started for Free" : "Subscribe Now"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
