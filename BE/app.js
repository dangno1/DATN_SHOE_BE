import mongoose from "mongoose";
import express from "express";
import productRouter from "./src/routers/product.js";
import categoryRouter from "./src/routers/category.js";
import cors from "cors";
import routerAuth from "./src/routers/auth.js";
import routerUser from "./src/routers/user.js";
import orderRoutes from './src/routes/orderRoutes';
import commentRouter  from './src/routers/commentRouter';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", productRouter);
app.use("/api", categoryRouter);
app.use("/api", routerAuth);
app.use("/api", routerUser);
app.use("/api", orderRoutes);
app.use("/api", commentRouter);


const port = 8000;

mongoose
  .connect("mongodb://127.0.0.1:27017/DATN")
  .then(() => console.log("Connect to DB successfully"));

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
