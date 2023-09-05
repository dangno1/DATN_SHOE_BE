import Product from "../../models/product.js";
import Category from "../../models/category.js";
import productSchema from "../../schemas/product.js";

export const create = async (req, res) => {
  try {
    // validate và thông báo lỗi
    const { error } = productSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.json({
        success: false,
        messages: error.details.map((detail) => detail.message),
      });
    }

    // kiểm tra productId user nhập có tồn tại không
    const category = await Category.findById(req.body.categoryId);
    if (!category) {
      return res.status(400).json({
        message: "Danh mục sản phẩm không tồn tại",
      });
    }

    // tạo mới sản phẩm
    const product = await Product.create(req.body);
    if (!product) {
      return res.status(400).json({
        message: "Không thể tạo sản phẩm",
      });
    }

    // thêm productId vào bảng category
    await Category.findByIdAndUpdate(product.categoryId, {
      $addToSet: {
        products: product._id,
      },
    });

    // thông báo tạo sản phẩm thành công
    return res.status(201).json({
      message: "Product created",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
