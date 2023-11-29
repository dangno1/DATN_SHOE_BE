import express from 'express';
import { createComment } from '../controllers/Comment/createComment.js';
import {getComments} from '../controllers/Comment/getComment.js'
// import { deleteComment } from '../controllers/comment/deleteComment.js';
import { getcommentID } from '../controllers/Comment/getcommentID.js';
const commentRouter = express.Router();


commentRouter.post('/comments', createComment);
commentRouter.get('/comments', getComments );
commentRouter.get('/comments/:id', getcommentID );
// commentRouter.delete('/comments/:id', deleteComment);

export default commentRouter;
