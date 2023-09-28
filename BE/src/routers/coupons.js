import express from "express";
import {
  create,
  get,
  getAll,
  remove,
  update,
} from "../controllers/coupons/index";
const router = express.Router();

router.get("/coupons", getAll);
router.get("/coupons/:id", get);
router.post("/coupons", create);
router.delete("/coupons/:id", remove);
router.patch("/coupons/:id", update);

export default router;
