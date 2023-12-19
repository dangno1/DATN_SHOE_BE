import Coupons from "../../models/coupons.js";
import Product from "../../models/product.js";

export const remove = async (req, res) => {
  try {
    const coupons = await Coupons.findOneAndDelete({
      _id: req.params.id,
    });

    if (coupons.length === 0) {
      return res.status(200).json({
        success: false,
        message: "Không tìm thấy mã giảm giá!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Xóa mã giảm giá thành công",
      data: coupons,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
