import express from 'express';
import { createComment } from '../controllers/Comment/createComment';
import {getComments} from '../controllers/Comment/getComment'
import { deleteComment } from '../controllers/Comment/deleteComment';

const commentRouter = express.Router();


commentRouter.post('/comments', createComment);
commentRouter.get('/comments', getComments );
commentRouter.delete('/comments/:id', deleteComment);

export default commentRouter;
