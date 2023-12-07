import Brand from "../../models/brand.js";
import brandSchema from "../../schemas/brand.js";

export const update = async (req, res) => {
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

    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy thương hiệu",
      });
    }

    return res.status(200).json({
      success: true,
      message: "cập nhật thương hiệu thành công",
      data: brand,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
