import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to db successfully", conn.connection.host);
  } catch (err) {
    console.log("Error connecting to DB", err);
  }
};
