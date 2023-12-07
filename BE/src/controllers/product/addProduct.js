import Product from "../../models/product.js";
import Category from "../../models/category.js";
import Size from "../../models/size.js";
import Color from "../../models/color.js";

export const create = async (req, res) => {
  try {
    let body = JSON.parse(JSON.stringify(req.body));
    body.variants = JSON.parse(body.variants);

    const product = await Product.create({
      ...body,
      image: req.files["image"]?.[0].path,
      thumbnail: req.files["thumbnail"]?.map((file) => file.path),
    });
    if (!product) {
      return res.status(400).json({
        error: true,
        message: "Không thể tạo sản phẩm!",
      });
    }

    await Category.findByIdAndUpdate(product.categoryId, {
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

    return res.status(201).json({
      success: true,
      message: "Tạo sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};
