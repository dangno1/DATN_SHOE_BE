import mongoose from "mongoose";
import express from "express";
import productRouter from "./src/routers/product.js";
import sizeRouter from "./src/routers/size.js";
import colorRouter from "./src/routers/color.js";
import categoryRouter from "./src/routers/category.js";
import couponsRouter from "./src/routers/coupons.js";
import cors from "cors";
import routerAuth from "./src/routers/auth.js";
import routerUser from "./src/routers/user.js";
import orderRoutes from "./src/routers/orderRoutes.js";
import commentRouter from "./src/routers/commentRouter.js";
import routeCart from "./src/routers/cart.js";
import routerOderProduct from "./src/routers/orderedProducts.js";
import ratingRouter from "./src/routers/rating.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", productRouter);
app.use("/api", sizeRouter);
app.use("/api", colorRouter);
app.use("/api", categoryRouter);
app.use("/api", couponsRouter);
app.use("/api", routerAuth);
app.use("/api", routerUser);
app.use("/api", orderRoutes);
app.use("/api", commentRouter);
app.use("/api", routeCart);
app.use("/api", routerOderProduct)
app.use("/api", ratingRouter);
const port = 8000;

mongoose
  .connect("mongodb://127.0.0.1:27017/DATN", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to DB successfully");
    app.listen(port, function () {
      console.log(`Server is running on port ${port}`);
    });
  });
