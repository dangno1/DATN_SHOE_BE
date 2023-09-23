import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: "loipv03",
  api_key: "525947552955512",
  api_secret: "bY_U7KoA7HvPL3HCEZ8hG3jN0gc",
});

// Khởi tạo Multer với lưu trữ Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "DATN",
    allowed_formats: ["jpg", "png", "bmp", "tiff"],
  },
});

export const upload = multer({ storage });
