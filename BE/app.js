import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import commentRouter  from './src/routers/commentRouter';

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/api", commentRouter);

const port = 8000;

mongoose
  .connect("mongodb://127.0.0.1:27017/DATN")
  .then(() => console.log("Connect to DB successfully"));

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
