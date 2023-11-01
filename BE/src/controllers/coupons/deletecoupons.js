import Coupons from "../../models/coupons.js";
import Product from "../../models/product.js";

export const remove = async (req, res) => {
  try {
    const coupons = await Coupons.findOneAndDelete({
      _id: req.params.id,
    });

    await Product.updateMany({ coupons: coupons._id }, { coupons: 0 });

    if (coupons.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy mã giảm giá!",
      });
    }

    await Product.findByIdAndUpdate(coupons._id, {
      $pull: {
        products: coupons._id,
      },
    });
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
