import express from "express";
import getCarts from "../controllers/cart/getCart.js";
import addCart from "../controllers/cart/addCart.js";
import deleteCart from "../controllers/cart/deleteCart.js";
import calculateTotalPrice from "../controllers/cart/totalPrice.js";
import { updateQuantityCartMinus, updateQuantityCartPlus } from "../controllers/cart/updateCart.js";

const routeCart = express.Router();

routeCart.get("/cart", getCarts);
routeCart.post("/cart/add", addCart);
routeCart.delete("/cart/delete/:id", deleteCart);
routeCart.patch("/cart/updatePlus/:id", updateQuantityCartPlus);
routeCart.patch("/cart/updateMinus/:id", updateQuantityCartMinus);
routeCart.post("/cart/calculateTotalPrice", calculateTotalPrice);

export default routeCart;
