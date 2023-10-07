import Product from "../../models/product.js";
import Category from "../../models/category.js";
import productSchema from "../../schemas/product.js";
import Size from "../../models/size.js";
import Color from "../../models/color.js";
import Coupons from "../../models/coupons.js";

export const create = async (req, res) => {
  try {
    // Chuyển req.body thành một đối tượng thông thường
    let body = JSON.parse(JSON.stringify(req.body));

    // Phân giải chuỗi JSON từ variants
    body.variants = JSON.parse(body.variants);

    // validate và thông báo lỗi bằng joi
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
        message: "Thiếu image và thumbnail!",
      });
    } else if (!req.files["image"]) {
      return res.status(400).json({
        success: false,
        message: "Thiếu image!",
      });
    } else if (!req.files["thumbnail"]) {
      return res.status(400).json({
        success: false,
        message: "Thiếu thumbnail!",
      });
    }

    // kiểm tra sizeId, colorId, couponsId, categoryId user nhập có tồn tại không
    const category = await Category.findById(body.categoryId);
    const coupons = await Coupons.findById(body.couponsId);
    const size = await Size.exists({
      _id: body.variants.map((variant) => variant.sizeId),
    });
    const color = await Color.exists({
      _id: body.variants.map((variant) => variant.colorId),
    });

    // Thông báo lỗi nếu sizeId, colorId, couponsId, categoryId user nhập không tồn tại
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Danh mục sản phẩm không tồn tại!",
      });
    } else if (!size) {
      return res.status(404).json({
        success: false,
        message: "Kích cỡ không tồn tại!",
      });
    } else if (!color) {
      return res.status(404).json({
        success: false,
        message: "Màu sắc không tồn tại!",
      });
    } else if (!coupons) {
      return res.status(404).json({
        success: false,
        message: "Mã giảm giá không tồn tại!",
      });
    }

    // Tạo mới sản phẩm
    const product = await Product.create({
      ...body,
      image: req.files["image"][0].path,
      thumbnail: req.files["thumbnail"].map((file) => file.path),
    });
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Không thể tạo sản phẩm!",
      });
    }

    // thêm productId vào bảng category, coupons, size, color.
    await Category.findByIdAndUpdate(product.categoryId, {
      $addToSet: {
        products: product._id,
      },
    });
    await Coupons.findByIdAndUpdate(product.couponsId, {
      $addToSet: {
        products: product._id,
      },
    });
    body.variants.map(
      async (variant) =>
        await Size.findByIdAndUpdate(variant.sizeId, {
          $addToSet: {
            products: product._id,
          },
        })
    );
    body.variants.map(
      async (variant) =>
        await Color.findByIdAndUpdate(variant.colorId, {
          $addToSet: {
            products: product._id,
          },
        })
    );

    // thông báo tạo mới product thành công
    return res.status(201).json({
      success: true,
      message: "Tạo sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    // Thông báo khi server lỗi
    return res.status(500).json({
      message: error.message,
    });
  }
};
