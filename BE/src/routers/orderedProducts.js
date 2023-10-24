import express  from "express";
import addOrderedProduct from "../controllers/orderedProduct/addorderProduct.js";

const routerOderProduct = express.Router();

routerOderProduct.post("/addOderProduct", addOrderedProduct)

export default routerOderProduct;