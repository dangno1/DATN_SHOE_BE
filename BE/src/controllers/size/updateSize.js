import Size from "../../models/size.js";
import sizeSchema from "../../schemas/size.js";

export const update = async (req, res) => {
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

    const size = await Size.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!size) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy size!",
      });
    }

    return res.status(201).json({
      success: true,
      message: "size đã được cập nhật thành công",
      data: size,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
