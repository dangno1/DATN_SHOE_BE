import Category from "../../models/category.js";
import categorySchema from "../../schemas/category.js";

export const create = async (req, res) => {
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

    const category = await Category.create(req.body); // Tạo mới product

    // Thông báo lỗi tạo category thất bại
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Không thể tạo danh mục sản phẩm!",
      });
    }

    // Thông báo tạo mới category thành công
    return res.status(201).json({
      success: true,
      message: "Tạo danh mục sản phẩm thành công",
      data: category,
    });
  } catch (error) {
    // Thông báo khi server lỗi
    return res.status(500).json({
      message: error,
    });
  }
};
