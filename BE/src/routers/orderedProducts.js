import express  from "express";
import addOrderedProduct from "../controllers/orderedProduct/addorderProduct.js";
import getOredrs from "../controllers/orderedProduct/getAllOrderProduct.js";
import checkout from "../controllers/orderedProduct/checkout.js";
import updateQuantity from "../controllers/orderedProduct/updateQuantity.js";
import sendEmailConfirmation from "../controllers/orderedProduct/sendEmailConfirmation.js";
import updateStatusAdmin from "../controllers/orderedProduct/updateOrderAdmin.js";
const routerOderProduct = express.Router();

routerOderProduct.post("/addOderProduct", addOrderedProduct);
routerOderProduct.get("/orderProducts", getOredrs)
routerOderProduct.patch("/orderProductUpdate/:id", updateStatusAdmin)
routerOderProduct.post('/checkout', checkout);
routerOderProduct.post('/updateQuantity', updateQuantity);
routerOderProduct.post('/sendEmail', sendEmailConfirmation);

export default routerOderProduct;