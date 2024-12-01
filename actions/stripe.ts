"use server";
import { currentUser } from "@clerk/nextjs/server";
import dbConnect from "@/utils/db";
import Transaction from "@/models/transaction";
import stripe from "@/utils/stripe";

interface CheckoutSessionResponse {
  url?: string;
  error?: string;
}
export async function createCheckoutSession(): Promise<CheckoutSessionResponse> {
  const user = await currentUser();
  const customerEmail = user?.emailAddresses[0]?.emailAddress;
  if (!customerEmail) {
    return { error: "No email found for the user" };
  }
  try {
    // Check user subscription status
    await dbConnect();
    // Find the Stripe customer ID from your database
    const existingTransaction = await Transaction.findOne({ customerEmail });
    if (existingTransaction) {
      // Retrieve the customer's subscriptions from Stripe
      const subscriptions = await stripe.subscriptions.list({
        customer: existingTransaction.customerId, // Ensure you have this field in your model
        status: "all",
        limit: 1,
      });
      // Check if any subscription is active
      const currentSubscription = subscriptions.data.find(
        (sub) => sub.status === "active"
      );
      if (currentSubscription) {
        // If an active subscription is found
        return { error: "You already have an active subscription" };
      }
    }
    // Create a new checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_MONTHLY_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "subscription",
      customer_email: customerEmail,
      success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}`,
    });
    return { url: session.url ?? undefined }; // Ensure url is either string or undefined
  } catch (error) {
    console.error("Error creating Stripe Checkout session:", error);
    return { error: "Error creating Stripe Checkout session" }; // Return an object with an error
  }
}
