import express from 'express'
import { signIn, signOut,signUp } from '../cotrollers/login/auth.js';
import { blockUser, unblockUser } from '../cotrollers/user/khoaUser.js';

const routerAuth = express.Router();

routerAuth.post('/auth/signup', signUp)
routerAuth.post('/auth/signin', signIn)
routerAuth.put('/auth/blockUser/:id', blockUser)
routerAuth.put('/auth/unblockUser/:id', unblockUser)
routerAuth.get('/auth/signOut',signOut)

export default routerAuth