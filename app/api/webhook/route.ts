// this thing should be dynamic and we should prevent the caching
export const dynamic = "force-dynamic"; // defaults to auto
import dbConnect from "@/utils/db";
import Transaction from "@/models/transaction";
import stripe from "@/utils/stripe";
// webhook
export async function POST(req: Request) {
  await dbConnect();
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();
  try {
    // Verify the webhook signature and parse the event
    const event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any; // Cast to `any` to access properties
      console.log("WEBHOOK SESSION => ", session);
      const transaction = new Transaction({
        sessionId: session.id,
        customerId: session.customer,
        invoiceId: session.invoice,
        subscriptionId: session.subscription,
        mode: session.mode,
        paymentStatus: session.payment_status,
        customerEmail: session.customer_email,
        amountTotal: session.amount_total,
        status: session.status,
      });
      await transaction.save();
      return Response.json(
        { message: "Event processed successfully" },
        { status: 200 }
      );
    } else {
      // Handle unexpected event types
      return Response.json(
        { message: "Unhandled event type" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("Error handling webhook event:", error);
    return Response.json(
      { message: `Webhook error: ${error.message}` },
      { status: 400 }
    );
  }
}
