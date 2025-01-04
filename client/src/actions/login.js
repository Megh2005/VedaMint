"use server";

import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/User";
import bcrypt from "bcrypt";

export async function login(email, password) {
  await connectDB();

  try {
    if (!email || !password) {
      throw new Error("All fields are required");
    }

    // check if user exists in database

    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      throw new Error("User does not exist");
    }

    // check if password is correct

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      throw new Error("Password is incorrect");
    }

    return {
      success: true,
      message: "User logged in successfully",
    };
  } catch (error) {
    console.error("Error logging in user: ", error);
    return {
      success: false,
      message: error.message || "Error logging in user",
    };
  }
}
