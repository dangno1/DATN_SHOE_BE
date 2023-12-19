import express from 'express'
import { forgotPassword, otpauthentication, resendOTP, resetPassword, signIn, signOut,signUp } from '../controllers/login/auth.js';
import { blockUser, unblockUser } from '../controllers/user/khoaUser.js';

const routerAuth = express.Router();

routerAuth.post('/auth/signup', signUp)
routerAuth.post('/auth/signin', signIn)
routerAuth.put('/auth/blockUser/:id', blockUser)
routerAuth.put('/auth/unblockUser/:id', unblockUser)
routerAuth.get('/auth/signOut',signOut)
routerAuth.patch('/auth/forgotpassword', forgotPassword);
routerAuth.patch('/auth/otpauthentication', otpauthentication);
routerAuth.patch('/auth/resetpassword', resetPassword);
routerAuth.patch('/auth/resendotp', resendOTP)
export default routerAuth