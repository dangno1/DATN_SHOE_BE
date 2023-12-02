import Brand from "../../models/brand.js";
import brandSchema from "../../schemas/brand.js";

export const create = async (req, res) => {
  try {
    const { error } = brandSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.json({
        success: false,
        messages: error.details.map((detail) => detail.message),
      });
    }

    const brand = await Brand.create(req.body);

    if (!brand) {
      return res.status(400).json({
        success: false,
        message: "Không thể tạo thương hiệu!",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Tạo thương hiệu thành công",
      data: brand,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
