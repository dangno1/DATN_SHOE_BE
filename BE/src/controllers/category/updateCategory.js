import Category from "../../models/category.js";
import categorySchema from "../../schemas/category.js";

export const update = async (req, res) => {
  try {
    // validate và thông báo lỗi bằng joi
    const { error } = categorySchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.json({
        success: false,
        messages: error.details.map((detail) => detail.message),
      });
    }

    // Cập nhật category dựa vào id
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    // Thông báo lỗi không tìm thấy category
    if (!category) {
      return res.status(404).json({
        message: "Không tìm thấy danh mục sản phẩm",
      });
    }

    // Thông báo cập nhật category thành công
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
