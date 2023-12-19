import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: "loipv03",
  api_key: "525947552955512",
  api_secret: process.env.API_SECRET_CLOUDINARY,
});

// Khởi tạo Multer với lưu trữ Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: process.env.FOLDER_CLOUDINARY,
  },
});

export default cloudinary;

export const upload = multer({ storage });
