import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();


export const checkPermission = async (req, res, next) => {
  try {
    const autho = req.headers.authorization;
    if (!autho) {
      return res.status(400).json({
        message: "Ban chua dang nhap",
      });
    }
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, SECRET_CODE, async function (err, decoded) {
      if (err) {
        if ((err.name = "TokenExpiredError")) {
          return res.status(400).json({
            message: err.message || "Token het han",
          });
        }
        if ((err.name = "JsonWebTokenError")) {
          return res.status(400).json({
            message: err.message || "Token loi!",
          });
        }
      }
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(400).json({
          message: "User khong co trong he thong!",
        });
      }
      if (user.role !== "admin") {
        return res.status(400).json({
          message: "Ban khong co quyen thuc hien hanh dong nay!",
        });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      message: "Loi Server",
    });
  }
};
