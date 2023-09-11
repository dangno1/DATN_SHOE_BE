import Product from "../../models/product.js";
import Category from "../../models/category.js";

export const remove = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id });
    await Category.findByIdAndUpdate(product.categoryId, {
      $pull: {
        products: product._id,
      },
    });
    return res.status(201).json({
      message: "Xóa sản phẩm thành công",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
