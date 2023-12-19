import User from "../../models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { signinSchema, signupSchema } from "../../schemas/user.js";
import nodemailer from "nodemailer";
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

// export const signIn = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const { error } = signinSchema.validate(req.body, {
//       abortEarly: false,
//     });
//     if (error) {
//       return res.json({
//         success: false,
//         messages: error.details.map((detail) => detail.message),
//       });
//     }
//     const haveUser = await User.findOne({ email });
//     if (!haveUser) {
//       return res.status(400).json({
//         message: "Email không tồn tại",
//       });
//     }
//     if (haveUser.isBlocked) {
//       return res.status(403).json({ message: "Tài khoản của bạn đã bị khóa" });
//     }
//     const checkPass = await bcryptjs.compare(password, haveUser.password);
//     if (!checkPass) {
//       return res.status(400).json({
//         message: "Mật khẩu không chính xác",
//       });
//     }
//     const token = jwt.sign(
//       {
//         id: haveUser.id,
//       },
//       SECRET_CODE,
//       { expiresIn: "1d" }
//     );
//     haveUser.password = undefined;
//     return res.status(200).json({
//       message: "Đăng nhập thành công",
//       accessToken: token,
//       user: haveUser,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Lỗi server",
//     });
//   }
// };


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
    
    // Đặt JWT vào cookie thay vì accessToken
    res.cookie('jwt', token, { httpOnly: true, maxAge: 86400000 }); // 1 ngày
    
    haveUser.password = undefined;
    return res.status(200).json({
      message: "Đăng nhập thành công",
      user: haveUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server",
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    // Kiểm tra xem email có tồn tại trong cơ sở dữ liệu
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email không tồn tại",
      });
    }
    // Tạo mã OTP ngẫu nhiên
    const otp = Math.floor(100000 + Math.random() * 900000);
    // Gửi mã OTP qua email
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "truongduy97a@gmail.com",
        pass: "qejcmqsanvaoircm",
      },
    });
    // Hàm để gửi email
    async function sendEmail(email, otp) {
      try {
        const info = await transporter.sendMail({
          from: 'truongduy97a@gmail.com', // Điền thông tin người gửi ở đây
          to:email, // Địa chỉ email người nhận
          subject: "Mã xác nhận đổi mật khẩu", // Tiêu đề email
          text: `Mã xác nhận của bạn là: ${otp}`, // Nội dung email dạng text
        });
        console.log("Message sent: %s", info.messageId);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
    // Sử dụng hàm sendEmail để gửi email
    async function main() {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: "Email không tồn tại",
        });
      }
      // Tạo mã OTP ngẫu nhiên
      const otp = Math.floor(1000 + Math.random() * 9000);
      // Gửi email
      const emailSent = await sendEmail(email, otp);
      if (emailSent) {
        // Lưu mã OTP vào cơ sở dữ liệu
        user.otp = otp;
        user.save();
        return res.status(200).json({ message: "Mã xác nhận đã được gửi qua email." });
      } else {
        return res.status(500).json({ message: "Lỗi khi gửi email xác nhận." });
      }
    }
    main().catch(console.error);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Lỗi server",
    });
  }
};

// export const resetPassword = async (req, res) => {
//   try {
//     const { email, otp, newPassword, confirmPassword } = req.body;
    
//     // Kiểm tra xem mã OTP người dùng nhập có khớp với mã OTP mới trong cơ sở dữ liệu không
//     const user = await User.findOne({ email, otp });
    
//     if (!user) {
//       return res.status(400).json({ message: 'Mã xác nhận không hợp lệ.' });
//     }
    
//     // Kiểm tra xác thực mật khẩu
//     if (newPassword !== confirmPassword) {
//       return res.status(400).json({ message: 'Mật khẩu và xác nhận mật khẩu không khớp.' });
//     }
    
//     // Tại đây, xác minh mã OTP và mật khẩu đã thành công, tiến hành cập nhật mật khẩu
//     const hashedPassword = await bcryptjs.hash(newPassword, 15);
    
//     // Cập nhật mật khẩu và xóa mã OTP
//     user.password = hashedPassword;
//     user.otp = null;
//     await user.save();
    
//     return res.status(200).json({ message: 'Mật khẩu đã được đổi thành công.' });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Lỗi server",
//     });
//   }
// };

export const otpauthentication = async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    // Kiểm tra xem mã OTP người dùng nhập có khớp với mã OTP mới trong cơ sở dữ liệu không
    const user = await User.findOne({ email, otp });
    
    if (!user) {
      return res.status(400).json({ message: 'Mã xác nhận không hợp lệ.' });
    }
    
    // Gửi thông báo xác nhận mã OTP thành công
    return res.status(200).json({ message: 'Mã OTP xác nhận thành công.' });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;
    
    // Kiểm tra xem mật khẩu mới và xác nhận mật khẩu mới có khớp nhau
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Mật khẩu và xác nhận mật khẩu không khớp.' });
    }
    
    // Tại đây, xác minh mã OTP và mật khẩu đã thành công, tiến hành cập nhật mật khẩu
    const hashedPassword = await bcryptjs.hash(newPassword, 15);
    
    // Cập nhật mật khẩu và xóa mã OTP
    const user = await User.findOne({ email });
    if (user) {
      user.password = hashedPassword;
      user.otp = null;
      await user.save();
    }
    
    return res.status(200).json({ message: 'Mật khẩu đã được đổi thành công.' });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server",
    });
  }
};

export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Email không tồn tại" });
    }

    // Tạo mã OTP ngẫu nhiên
    const otp = Math.floor(1000 + Math.random() * 9000);

    // Gửi lại mã OTP qua email
    const emailSent = await sendEmail(email, otp);

    if (emailSent) {
      // Cập nhật mã OTP mới vào cơ sở dữ liệu
      user.otp = otp;
      await user.save();

      return res.status(200).json({ message: "Mã OTP mới đã được gửi qua email." });
    } else {
      return res.status(500).json({ message: "Lỗi khi gửi lại email xác nhận." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Lỗi server",
    });
  }
};

async function sendEmail(email, otp) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "truongduy97a@gmail.com",
        pass: "qejcmqsanvaoircm",
      },
    });

    const info = await transporter.sendMail({
      from: "your-email@gmail.com",
      to: email,
      subject: "Mã xác nhận đổi mật khẩu",
      text: `Mã xác nhận của bạn là: ${otp}`,
    });

    console.log("Message sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}