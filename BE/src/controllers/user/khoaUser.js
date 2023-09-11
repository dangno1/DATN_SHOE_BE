import User from "../../models/user.js";

// Để khóa tài khoản
export const blockUser = async (req, res) => {
    try {
      const userId = req.params.id;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Người dùng không tồn tại' });
      }
  
      user.isBlocked = true;
      await user.save();
  
      return res.status(200).json({ message: 'Tài khoản đã bị khóa' });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Lỗi server" });
    }
  };
  
  // Để mở khóa tài khoản
  export const unblockUser = async (req, res) => {
    try {
      const userId = req.params.id;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Người dùng không tồn tại' });
      }
  
      user.isBlocked = false;
      await user.save();
  
      return res.status(200).json({ message: 'Tài khoản đã được mở khóa' });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Lỗi server" });
    }
  };
  