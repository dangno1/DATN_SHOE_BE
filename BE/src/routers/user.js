import express from 'express'

import { addUser } from '../cotrollers/user/addUser.js';
import { getAllUser } from '../cotrollers/user/ListUser.js';
import { getDetail } from '../cotrollers/user/detail.js';


const routerUser = express.Router();

routerUser.get('/users/', getAllUser)
routerUser.get('/user/:id', getDetail)
routerUser.post('/user/addUser',addUser)


export default routerUser