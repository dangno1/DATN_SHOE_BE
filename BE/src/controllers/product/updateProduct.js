import Product from "../../models/product.js";
import Category from "../../models/category.js";
import productSchema from "../../schemas/product.js";

export const update = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.json({
        success: false,
        messages: error.details.map((detail) => detail.message),
      });
    }

    const category = await Category.findById(req.body.categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Danh mục sản phẩm không tồn tại",
      });
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm",
      });
    }

    return res.status(200).json({
      message: "Sản phẩm đã được cập nhật thành công",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
