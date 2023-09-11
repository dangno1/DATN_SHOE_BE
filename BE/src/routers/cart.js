import  express  from "express";
import getCarts from "../controllers/cart/getCart.js";
import addCart from "../controllers/cart/addCart.js";
import deleteCart from "../controllers/cart/deleteCart.js";

const routeCart = express.Router();

routeCart.get('/cart', getCarts);
routeCart.post('/cart/add', addCart);
routeCart.delete('/cart/delete/:id', deleteCart);

export default routeCart;