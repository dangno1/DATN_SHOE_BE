import express  from "express";
import addOrderedProduct from "../controllers/orderedProduct/addorderProduct.js";
import getOredrs from "../controllers/orderedProduct/getAllOrderProduct.js";
import updateStatus from "../controllers/orderedProduct/updateOrder.js";
import checkout from "../controllers/orderedProduct/checkout.js";
const routerOderProduct = express.Router();

routerOderProduct.post("/addOderProduct", addOrderedProduct);
routerOderProduct.get("/orderProducts", getOredrs)
routerOderProduct.patch("/orderProducts/:id", updateStatus)
routerOderProduct.post('/checkout', checkout);
export default routerOderProduct;