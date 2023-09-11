import Category from "../../models/category.js";
import Product from "../../models/product.js";

export const remove = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    await Product.updateMany(
      { categoryId: category._id },
      { categoryId: null }
    );
    return res.status(200).json({
      message: "Xóa danh mục sản phẩm thành công",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
