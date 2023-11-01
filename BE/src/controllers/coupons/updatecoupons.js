import Coupons from "../../models/coupons.js";
import couponsSchema from "../../schemas/coupons.js";

export const update = async (req, res) => {
  try {
    const { error } = couponsSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.json({
        success: false,
        messages: error.details.map((detail) => detail.message),
      });
    }

    const coupons = await Coupons.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!coupons) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy mã giảm giá!",
      });
    }

    return res.status(201).json({
      success: true,
      message: "mã giảm giá đã được cập nhật thành công",
      data: coupons,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
