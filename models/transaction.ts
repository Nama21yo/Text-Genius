import mongoose from "mongoose";
const { Schema } = mongoose;
const TransactionSchema = new Schema(
  {
    sessionId: String,
    customerId: String,
    invoiceId: String,
    subscriptionId: String,
    mode: String,
    paymentStatus: String,
    customerEmail: String,
    amountTotal: Number,
    status: String,
  },
  { timestamps: true }
);
// If the model is already compiled, we use it. Otherwise, we compile a new model.
const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);
export default Transaction;
