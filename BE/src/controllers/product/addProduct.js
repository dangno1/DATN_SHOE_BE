import Product from "../../models/product.js";
import Category from "../../models/category.js";
import productSchema from "../../schemas/product.js";

export const create = async (req, res) => {
  try {
    // Chuyển req.body thành một đối tượng thông thường
    let body = JSON.parse(JSON.stringify(req.body));

    // Phân giải chuỗi JSON từ variants
    body.variants = JSON.parse(body.variants);

    // validate và thông báo lỗi
    const { error } = productSchema.validate(body, {
      abortEarly: false,
    });
    if (error) {
      return res.json({
        success: false,
        messages: error.details.map((detail) => detail.message),
      });
    }
    if (!req.files) {
      return res.status(400).json({
        success: false,
        message: "Thiếu image và images!",
      });
    } else if (!req.files["image"]) {
      return res.status(400).json({
        success: false,
        message: "Thiếu image!",
      });
    } else if (!req.files["images"]) {
      return res.status(400).json({
        success: false,
        message: "Thiếu images!",
      });
    }

    // kiểm tra categoryId user nhập có tồn tại không

    const category = await Category.findById(body.categoryId);
    if (!category) {
      return res.status(400).json({
        message: "Danh mục sản phẩm không tồn tại",
      });
    }

    // tạo mới sản phẩm
    const product = await Product.create({
      ...body,
      image: req.files["image"][0].path,
      images: req.files["images"].map((file) => file.path),
    });
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
      message: "Tạo sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server",
    });
  }
};
