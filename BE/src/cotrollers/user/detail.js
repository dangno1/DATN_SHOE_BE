import User from "../../models/user.js";

  export const getDetail = async (req, res) => {
    try {
      const users = await User.findById(req.params.id).populate("role");
      if (!users) {
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
  