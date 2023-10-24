import express from "express";
import { upload } from "../configs/cloudinary.js";
import {
  create,
  get,
  getAll,
  remove,
  update,
} from "../controllers/product/index.js";
import { deleteThumbnail } from "../controllers/product/deleteThumbnail.js";
import validate from "../controllers/product/validate.js";

const router = express.Router();

router.get("/products", getAll);
router.get("/products/:id", get);
router.post(
  "/products",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "thumbnail", maxCount: 20 },
  ]),
  validate,
  create
);
router.delete("/products/:id", remove);
router.patch(
  "/products/update/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "thumbnail", maxCount: 20 },
  ]),
  update
);

router.delete("/products/thumbnail/:id/:publicId", deleteThumbnail);

export default router;
