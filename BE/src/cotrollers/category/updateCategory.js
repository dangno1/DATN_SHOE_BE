import Category from "../../models/category.js";
import categorySchema from "../../schemas/category.js";

export const update = async (req, res) => {
  try {
    const { error } = categorySchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.json({
        success: false,
        messages: error.details.map((detail) => detail.message),
      });
    }

    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) {
      return res.status(404).json({
        message: "Không tìm thấy danh mục sản phẩm",
      });
    }

    return res.status(200).json({
      message: "cập nhật danh mục sản phẩm thành công",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
