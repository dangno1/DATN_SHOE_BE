import express from "express";
import {
  createCoupon,
  getCouponById,
  getAllCoupons,
  deleteCoupon,
  updateCoupon,
} from "../controllers/coupons/index.js";
const router = express.Router();

router.get("/coupons", getAllCoupons);
router.get("/coupons/:id", getCouponById);
router.post("/coupons", createCoupon);
router.delete("/coupons/:id", deleteCoupon);
router.patch("/coupons/update/:id", updateCoupon);

export default router;
