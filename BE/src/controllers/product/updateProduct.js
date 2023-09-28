import Product from "../../models/product.js";
import Category from "../../models/category.js";
import productSchema from "../../schemas/product.js";

export const update = async (req, res) => {
  try {
    // validate và thông báo lỗi bằng joi
    const { error } = productSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.json({
        success: false,
        messages: error.details.map((detail) => detail.message),
      });
    }

    // Thông báo lỗi không tìm thấy category
    const category = await Category.findById(req.body.categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Danh mục sản phẩm không tồn tại",
      });
    }

    // Cập nhật product dựa vào id
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    // thông báo lỗi không tìm thấy product
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm",
      });
    }

    // Thông báo cập nhật product thành công
    return res.status(200).json({
      success: true,
      message: "Sản phẩm đã được cập nhật thành công",
      data: product,
    });
  } catch (error) {
    // Thông báo khi server lỗi
    return res.status(500).json({
      message: error,
    });
  }
};
