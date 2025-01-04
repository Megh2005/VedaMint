import mongoose from "mongoose";

const connection = {};

export async function connectDB() {
  if (connection.isConnected) return;

  try {
    const connectionInstance = await mongoose.connect(
      process.env.MONGO_URI || ""
    );
    connection.isConnected = connectionInstance.connections[0].readyState;
  } catch (error) {
    console.error("Error connecting to database: ", error);
    process.exit(1);
  }
}
