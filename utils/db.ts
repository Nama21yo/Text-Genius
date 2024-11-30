import mongoose from "mongoose";

export default async function db() {
  if (mongoose.connection.readyState >= 1) return; //already connected
  await mongoose.connect(process.env.MONGODB_URL as string);
}
