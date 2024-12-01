"use server";
import { currentUser } from "@clerk/nextjs/server";
import dbConnect from "@/utils/db";
import Transaction from "@/models/transaction";
import stripe from "@/utils/stripe";

interface CheckoutSessionResponse {
  url?: string;
  error?: string;
}
/**
 * Creates a Stripe Checkout session for user subscription.
 *
 * This function checks if the user already has an active subscription,
 * and if not, creates a new Stripe Checkout session for subscription purchase.
 *
 * @returns {Promise<CheckoutSessionResponse>} An object containing either the Checkout session URL or an error message.
 * @property {string} [url] - The URL of the created Checkout session, if successful.
 * @property {string} [error] - An error message if the session creation fails or if the user already has an active subscription.
 */
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

/**
 * Checks the subscription status of the current user.
 *
 * This function retrieves the current user's email, finds their latest completed transaction,
 * and checks if they have an active subscription with Stripe.
 *
 * @returns {Promise<Object>} An object indicating the subscription status
 * @returns {boolean} ok - True if the user has an active subscription, false otherwise
 * @returns {string} [message] - Error message if there was an issue checking the subscription status
 */
export async function checkUserSubscription() {
  const user = await currentUser();
  const customerEmail = user?.emailAddresses[0]?.emailAddress;
  try {
    // Find the latest transaction for the given customer email
    const transaction = await Transaction.findOne({
      customerEmail,
      status: "complete",
    });
    if (transaction && transaction.subscriptionId) {
      // Retrieve subscription details from Stripe
      const subscription = await stripe.subscriptions.retrieve(
        transaction.subscriptionId
      );
      // Check if the subscription status is active
      if (subscription.status === "active") {
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
        };
      }
    }
  } catch (error) {
    console.error("Error checking subscription status:", error);
    return {
      message: "Error checking subscription status. Please try again later.",
    };
  }
}

/**
 * Creates a Stripe Customer Portal session for the current user.
 *
 * This function retrieves the current user's email, finds their transaction record,
 * and creates a Stripe Customer Portal session using their customer ID.
 *
 * @returns {Promise<string | null>} The URL for the Customer Portal session if successful,
 *                                   or null if an error occurs.
 * @throws {Error} If there's an issue creating the Stripe Customer Portal session.
 */
export async function createCustomerPortalSession() {
  const user = await currentUser();
  const customerEmail = user?.emailAddresses[0]?.emailAddress;
  try {
    const transaction = await Transaction.findOne({
      customerEmail,
    });
    const session = await stripe.billingPortal.sessions.create({
      customer: transaction.customerId,
      return_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
    });
    return session.url ?? `${process.env.NEXT_PUBLIC_URL}/dashboard`;
  } catch (error) {
    console.error("Error creating Stripe Customer Portal session:", error);
    return null;
  }
}
