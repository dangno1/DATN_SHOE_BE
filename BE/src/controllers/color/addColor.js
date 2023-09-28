import Color from "../../models/color.js";
import colorSchema from "../../schemas/color.js";

export const create = async (req, res) => {
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

    const color = await Color.create(req.body);
    if (!color) {
      return res.status(400).json({
        success: false,
        message: "Không thể tạo color!",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Tạo color thành công",
      data: color,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
