import express from "express";
import { createComment } from "../controllers/Comment/createComment";
import { getComments } from "../controllers/Comment/getComment";
import { getcommentID } from "../controllers/Comment/getcommentID";
import {
  deleteCommentAdmin,
  deleteCommentsAdmin,
} from "../controllers/Comment/deleteCommentAdmin";

import { deleteComment } from "../controllers/Comment/deleteComment.js";

const commentRouter = express.Router();

commentRouter.post("/comments", createComment);
commentRouter.get("/comments", getComments);
commentRouter.get("/comments/:id", getcommentID);
commentRouter.delete("/commentAdmin/:id", deleteCommentAdmin);
commentRouter.delete("/commentsAdmin", deleteCommentsAdmin);
commentRouter.delete("/comments/:id", deleteComment);

export default commentRouter;
