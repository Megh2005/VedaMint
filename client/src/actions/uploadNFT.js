"use server";

import { uploadToCloudinary } from "@/lib/cloudinary";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/User";
import jwt from "jsonwebtoken";

export async function uploadNFT(formData, token) {
  await connectDB();
  try {
    const decoded = jwt.verify(token, process.env.JWT_AUTH_SECRET);

    if (!decoded) throw new Error("Invalid token");

    const userId = decoded.id;

    const imgFile = formData.get("imgFile");

    if (!imgFile) {
      throw new Error("Image is required");
    }

    // upload to cloudinary

    const fileBuffer = await imgFile.arrayBuffer();
    const mimeType = imgFile.type;
    const encoding = "base64";
    const base64Data = Buffer.from(fileBuffer).toString("base64");

    const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

    const res = await uploadToCloudinary(fileUri, "nfts");

    if (!res) {
      throw new Error("Error uploading NFT");
    }

    const nftUrl = res.secure_url;

    const user = await UserModel.findById(userId);

    if (!user) {
      throw new Error("User does not exist");
    }

    user.nfts.push(nftUrl);

    await user.save();

    return {
      success: true,
      message: "NFT uploaded successfully",
      nftUrl,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Error uploading NFT",
    };
  }
}
