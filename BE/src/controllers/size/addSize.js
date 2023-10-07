import Size from "../../models/size.js";
import sizeSchema from "../../schemas/size.js";

export const create = async (req, res) => {
  try {
    const { error } = sizeSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.json({
        success: false,
        messages: error.details.map((detail) => detail.message),
      });
    }

    const size = await Size.create(req.body);
    if (!size) {
      return res.status(400).json({
        success: false,
        message: "Không thể tạo size!",
      });
    }
    return res.status(201).json({
      success: true,
      message: "Tạo size thành công",
      data: size,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
