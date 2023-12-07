import express from "express";
import {
  create,
  get,
  getAll,
  remove,
  update,
} from "../controllers/brand/index.js";
const router = express.Router();

router.get("/brand", getAll);
router.get("/brand/:id", get);
router.post("/brand", create);
router.delete("/brand/:id", remove);
router.patch("/brand/update/:id", update);

export default router;
