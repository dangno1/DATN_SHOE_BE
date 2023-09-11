import express from 'express'

import { addUser } from '../controllers/user/addUser.js';
import { getAllUser } from '../controllers/user/ListUser.js';
import { getDetail } from '../controllers/user/detail.js';


const routerUser = express.Router();

routerUser.get('/users/', getAllUser)
routerUser.get('/user/:id', getDetail)
routerUser.post('/user/addUser',addUser)


export default routerUser