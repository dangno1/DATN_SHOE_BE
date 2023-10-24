import express from 'express'

import { addUser } from '../controllers/user/addUser.js';
import { getAllUser } from '../controllers/user/ListUser.js';
import { getDetail } from '../controllers/user/detail.js';
import { updateUser } from '../controllers/user/updateUser.js';
import { changePassword } from '../controllers/user/updatePassword.js';


const routerUser = express.Router();

routerUser.get('/users/', getAllUser)
routerUser.get('/user/:id', getDetail)
routerUser.post('/user/addUser',addUser)
routerUser.patch('/user/updateUser/:userId',updateUser)
routerUser.patch('/user/changePassword/:userId',changePassword)


export default routerUser