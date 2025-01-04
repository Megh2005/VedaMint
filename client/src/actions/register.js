"use server";

import { uploadToCloudinary } from "@/lib/cloudinary";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/User";
import bcrypt from "bcrypt";

export async function register(userDetails) {
  try {
    await connectDB();

    const firstname = userDetails.get("firstname");
    const lastname = userDetails.get("lastname");
    const email = userDetails.get("email");
    const password = userDetails.get("password");
    const avatarFile = userDetails.get("avatarFile");

    if (!firstname || !lastname || !email || !password || !avatarFile) {
      throw new Error("All fields are required");
    }

    // check if user exists in database

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      throw new Error("User already exists");
    }

    // upload to cloudinary

    const fileBuffer = await avatarFile.arrayBuffer();
    const mimeType = avatarFile.type;
    const encoding = "base64";
    const base64Data = Buffer.from(fileBuffer).toString("base64");

    const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

    const res = await uploadToCloudinary(fileUri, "avatar");

    if (!res) {
      throw new Error("Error uploading avatar");
    }

    const avatarUrl = res.secure_url;
    const hashedPassword = await bcrypt.hash(password, 7);

    await UserModel.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      avatar: avatarUrl,
    });

    return {
      success: true,
      message: "User registered successfully",
    };
  } catch (error) {
    console.error("Error registering user: ", error);
    return {
      success: false,
      message: error.message || "Error registering user",
    };
  }
}
