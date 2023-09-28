import Color from "../../models/color.js";
import colorSchema from "../../schemas/color.js";

export const update = async (req, res) => {
  try {
    const { error } = colorSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.json({
        success: false,
        messages: error.details.map((detail) => detail.message),
      });
    }

    const color = await Color.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!size) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy color!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "color đã được cập nhật thành công",
      data: color,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
