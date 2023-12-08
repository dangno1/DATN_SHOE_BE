import Category from "../../models/category.js";
import Product from "../../models/product.js";

export const remove = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id); // Xóa category dựa vào id

    // Thông báo lỗi nếu category không tồn tại
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy danh mục sản phẩm!",
      });
    }

    // Xóa categoryId trong bảng product
    await Product.updateMany(
      { categoryId: category._id },
      { categoryId: null }
    );

    // Thông báo xóa category thành công
    return res.status(200).json({
      message: "Xóa danh mục sản phẩm thành công",
      category,
    });
  } catch (error) {
    // Thông báo khi server lỗi
    return res.status(500).json({
      message: error,
    });
  }
};
