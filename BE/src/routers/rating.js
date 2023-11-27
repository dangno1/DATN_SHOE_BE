import express from 'express';
import { createRating } from '../controllers/rating/createRating';
import { getRatings } from '../controllers/rating/getRating';
const ratingRouter = express.Router();


ratingRouter.post('/ratings', createRating);
ratingRouter.get('/ratings', getRatings );


export default ratingRouter;