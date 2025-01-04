import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      default: "",
      required: true,
    },
    avatar: {
      type: String,
      default: "",
      required: true,
    },
  },
  { timestamps: true }
);

export const UserModel =
  mongoose.models.User || mongoose.model("User", userSchema);
