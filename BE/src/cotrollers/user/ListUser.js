import User from "../../models/user.js";

export const getAllUser = async (req, res) => {
    try {
      const users = await User.find().populate("role");
      if (users.length == 0) {
        return res.status(400).json({
          message: "Không tìm thấy người dùng"
        })
      }
      return res.status(200).json({
        message: " Tìm người dùng thành công",
        datas: users
      })
    } catch (error) {
      res.status(500).json({
        message: "Lỗi server"
      })
    }
  }