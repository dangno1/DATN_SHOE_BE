import express from 'express';
import { createComment } from '../controllers/Comment/createComment';
import {getComments} from '../controllers/Comment/getComment'
import { deleteComment } from '../controllers/Comment/deleteComment';
import { getcommentID } from '../controllers/Comment/getcommentID';
import { checkPermission } from '../middlewares/checkPermision';
import { deleteCommentAdmin, deleteCommentsAdmin } from '../controllers/Comment/deleteCommentAdmin';
const commentRouter = express.Router();


commentRouter.post('/comments', createComment);
commentRouter.get('/comments', getComments );
commentRouter.get('/comments/:id', getcommentID );
commentRouter.delete('/comments/:id', deleteComment);
commentRouter.delete('/commentAdmin/:id', deleteCommentAdmin);
commentRouter.delete('/commentsAdmin', deleteCommentsAdmin);

export default commentRouter;
