import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  throw new Error("Stripe secret key not provided");
}
// Create a new Stripe client
const stripe = new Stripe(secretKey, {
  apiVersion: "2024-11-20.acacia",
});

export default stripe;
