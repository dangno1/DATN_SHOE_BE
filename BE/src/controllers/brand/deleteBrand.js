import Brand from "../../models/brand.js";

export const remove = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy thương hiệu!",
      });
    }

    // Thông báo xóa brand thành công
    return res.status(200).json({
      message: "Xóa thương hiệu thành công",
      brand,
    });
  } catch (error) {
    // Thông báo khi server lỗi
    return res.status(500).json({
      message: error,
    });
  }
};
