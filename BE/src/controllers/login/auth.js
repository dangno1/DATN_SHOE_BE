import User from "../../models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { signinSchema, signupSchema } from "../../schemas/user.js";
dotenv.config();

const SECRET_CODE = "s";
let isLoggedOut = false;

export const signUp = async (req, res) => {
  try {
    const { email, password, fullname, phone, address, username } = req.body;
    const { error } = signupSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.json({
        success: false,
        messages: error.details.map((detail) => detail.message),
      });
    }
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({
        messages: "Email đã tồn tại",
      });
    }
    const hashedPassword = await bcryptjs.hash(password, 15);
    const user = await User.create({
      ...req.body,
      fullname,
      username,
      email,
      phone,
      address,
      password: hashedPassword,
    });
    user.password = undefined;
    return res.status(200).json({
      message: "Đăng kí thành công",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "lỗi server",
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = signinSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.json({
        success: false,
        messages: error.details.map((detail) => detail.message),
      });
    }
    const haveUser = await User.findOne({ email });
    if (!haveUser) {
      return res.status(400).json({
        message: "Email không tồn tại",
      });
    }
    if (haveUser.isBlocked) {
      return res.status(403).json({ message: "Tài khoản của bạn đã bị khóa" });
    }
    const checkPass = await bcryptjs.compare(password, haveUser.password);
    if (!checkPass) {
      return res.status(400).json({
        message: "Mật khẩu không chính xác",
      });
    }
    const token = jwt.sign(
      {
        id: haveUser.id,
      },
      SECRET_CODE,
      { expiresIn: "1d" }
    );
    haveUser.password = undefined;
    return res.status(200).json({
      message: "Đăng nhập thành công",
      accessToken: token,
      user: haveUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server",
    });
  }
};


export const signOut = async (req, res) => {
  try {
    if (isLoggedOut) {
      return res.status(400).json({
        message: "Bạn đã đăng xuất rồi",
      });
    }

    // Xóa token bằng cách xóa cookie chứa token
    res.clearCookie("token");

    // Đánh dấu người dùng đã đăng xuất
    isLoggedOut = true;

    return res.status(200).json({
      message: "Đăng xuất thành công",
    });
    //res.redirect("/");  Chuyển hướng người dùng về trang chủ
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server",
    });
  }
};
