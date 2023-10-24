import User from '../../models/user.js';
import bcrypt from 'bcryptjs';
import { changePasswordSchema } from '../../schemas/userSchema.js';


export const changePassword = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { oldPassword, newPassword, confirmPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }

    const { error } = changePasswordSchema.validate({ oldPassword, newPassword, confirmPassword }, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: 'Lỗi xác nhận mật khẩu mới',
        details: error.details.map((detail) => detail.message),
      });
    }

    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      return res.status(400).json({ message: 'Mật khẩu cũ không đúng' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Mật khẩu mới và xác nhận mật khẩu không khớp' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.json({ message: 'Đổi mật khẩu thành công' });
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};
