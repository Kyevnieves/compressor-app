import cloudinary from "cloudinary";
import { config } from "dotenv";
config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
  secure: false,
});

export const uploadImage = async (filePath) => {
  return await cloudinary.v2.uploader.upload(filePath, { folder: "posts" })
};
