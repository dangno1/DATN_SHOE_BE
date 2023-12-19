import express from "express";
import {
  create,
  get,
  getAll,
  remove,
  update,
} from "../controllers/size/index.js";
const router = express.Router();

router.get("/size", getAll);
router.get("/size/:id", get);
router.post("/size", create);
router.delete("/size/:id", remove);
router.patch("/size/update/:id", update);

export default router;
