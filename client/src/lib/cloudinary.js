import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (fileUri, folderName) => {
  const res = await cloudinary.uploader.upload(fileUri, {
    invalidate: true,
    resource_type: "image",
    folder: "vedaMint/" + folderName,
    use_filename: true,
  });

  return res;
};
