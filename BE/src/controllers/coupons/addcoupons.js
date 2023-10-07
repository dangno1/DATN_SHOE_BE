import Coupons from "../../models/coupons.js";
import couponsSchema from "../../schemas/coupons.js";

export const create = async (req, res) => {
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

    const coupons = await Coupons.create(req.body);
    if (!coupons) {
      return res.status(400).json({
        success: false,
        message: "Không thể tạo mã giảm giá!",
      });
    }
    return res.status(201).json({
      success: true,
      message: "Tạo mã giảm giá thành công",
      data: coupons,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
