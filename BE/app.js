import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import routerAuth from "./src/routes/auth.js";
import routerUser from "./src/routes/user.js";




const app = express();
app.use(express.json());
app.use(cors());


app.use("/api", routerAuth);
app.use("/api", routerUser);

const port = 8000;

mongoose
  .connect("mongodb://127.0.0.1:27017/DATN")
  .then(() => console.log("Connect to DB successfully"));

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});