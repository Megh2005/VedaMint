import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/User";
import jwt from "jsonwebtoken";

export async function GET(req) {
  await connectDB();

  try {
    const url = new URL(req.url);
    const userId = url.pathname.split("/").pop();
    const token = req.headers.get("Authorization");

    if (!userId) {
      throw new Error("User ID is required");
    }

    if (!token) {
      throw new Error("Token is required");
    }

    const headerToken = token.split(" ")[1];

    const decoded = jwt.verify(headerToken, process.env.JWT_AUTH_SECRET);

    if (!decoded) throw new Error("Invalid token");

    // check if user exists in database

    const user = await UserModel.findById(userId).select(
      "-password -createdAt -updatedAt -__v"
    );
    if (!user) {
      throw new Error("User does not exist");
    }

    return NextResponse.json(
      {
        success: true,
        user,
        message: "User profile fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        user: null,
        message: error.message || "Error fetching user profile",
      },
      { status: 500 }
    );
  }
}
