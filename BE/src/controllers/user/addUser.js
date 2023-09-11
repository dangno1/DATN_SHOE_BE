import User from "../../models/user.js";
import bcrypt from "bcryptjs"; 
import userSchema from "../../schemas/userSchema.js";

export const addUser = async (req, res) => {
  try {
    const {fullname, username, email, password,phone, address, isBlocked} = req.body;
    const { error } = userSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.json({
        success : false,
        messages: error.details.map((detail) => detail.message),
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const checkEmail = await User.findOne({ email })
    if (checkEmail) {
        return res.status(400).json({
            message: "Email đã tồn tại"
        })
    }
    const newUser = new User({
      fullname,
      username,
      email,
      phone,
      address,
      password: hashedPassword,
      isBlocked:false
    });

    await newUser.save();
    return res.status(201).json({ message: 'Thêm user thành công', user: newUser });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
