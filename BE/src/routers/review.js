import express from "express";
import createReview from "../controllers/review/createReview.js";
import getAllReview from "../controllers/review/getReview.js";
const reviewRouter = express.Router();

reviewRouter.post("/reviews", createReview);
reviewRouter.get("/reviews", getAllReview);

export default reviewRouter;
