import express from "express";
import { upload } from "../cloudinaryService/cloudinary.js";
import {
  create,
  get,
  getAll,
  remove,
  update,
} from "../controllers/product/index.js";

const router = express.Router();

router.get("/products", getAll);
router.get("/products/:id", get);
router.post(
  "/products",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "thumbnail", maxCount: 20 },
  ]),
  create
);
router.delete("/products/:id", remove);
router.patch("/products/:id", update);

export default router;
