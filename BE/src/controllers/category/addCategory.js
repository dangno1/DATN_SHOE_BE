import Category from "../../models/category.js";
import categorySchema from "../../schemas/category.js";

export const create = async (req, res) => {
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

    const category = await Category.create(req.body);
    if (!category) {
      return res.status(400).json({
        message: "Không thể tạo danh mục sản phẩm",
      });
    }
    return res.status(201).json({
      message: "Category created",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
