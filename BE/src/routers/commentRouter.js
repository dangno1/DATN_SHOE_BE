import express from 'express';
import { createComment } from '../controllers/Comment/createComment';
import {getComments} from '../controllers/Comment/getComment'
import { deleteComment } from '../controllers/comment/deleteComment';
import { getcommentID } from '../controllers/Comment/getcommentID';
import { checkPermission } from '../middlewares/checkPermision';
const commentRouter = express.Router();


commentRouter.post('/comments', createComment);
commentRouter.get('/comments', getComments );
commentRouter.get('/comments/:id', getcommentID );
commentRouter.delete('/comments/:id', deleteComment);

export default commentRouter;
