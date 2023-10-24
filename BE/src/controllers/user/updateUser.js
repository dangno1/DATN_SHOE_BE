import User from '../../models/user.js';
import bcrypt from 'bcryptjs';
import { updateUserSchema } from '../../schemas/userSchema.js';

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const dataToUpdate = req.body;
    const { error, value } = updateUserSchema.validate(dataToUpdate, {
      abortEarly: false,
    });
    if (error) {
      return res.json({
        success: false,
        messages: error.details.map((detail) => detail.message),
      });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }

    // Kiểm tra xem email đã tồn tại trong hệ thống chưa
    if (value.email !== user.email) {
      const existingUser = await User.findOne({ email: value.email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email đã tồn tại trong hệ thống' });
      }
    }

    const updatedData = {};

    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        if (key === 'password') {
          const hashedPassword = await bcrypt.hash(value[key], 10);
          user[key] = hashedPassword;
          updatedData[key] = hashedPassword;
        } else {
          user[key] = value[key];
          updatedData[key] = value[key]; 
        }
      }
    }
    await user.save();
    return res.json({
      message: 'Cập nhật thông tin người dùng thành công',
      updatedData, 
      user,
    });
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};
