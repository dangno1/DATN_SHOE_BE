import Category from "../../models/category";
import Color from "../../models/color";
import Size from "../../models/size";
import productSchema from "../../schemas/product";

const validate = async (req, res, next) => {
  try {
    let body = JSON.parse(JSON.stringify(req.body));
    body.variants = JSON.parse(body.variants);

    const { error } = productSchema.validate(body, {
      abortEarly: false,
    });
    if (error) {
      return res.json({
        error: true,
        messages: error.details.map((detail) => detail.message),
      });
    }

    if (!req.files["image"]) {
      return res.status(400).json({
        error: true,
        message: "Thiếu image!",
      });
    }

    if (!req.files["thumbnail"]) {
      return res.status(400).json({
        error: true,
        message: "Thiếu thumbnail!",
      });
    }

    const category = await Category.exists({ _id: body.categoryId });
    const size = await Size.exists({
      _id: body.variants.map((variant) => variant.sizeId),
    });
    const color = await Color.exists({
      _id: body.variants.map((variant) => variant.colorId),
    });

    if (!category) {
      return res.status(404).json({
        error: true,
        message: "Danh mục sản phẩm không tồn tại!",
      });
    }

    if (!size) {
      return res.status(404).json({
        error: true,
        message: "Kích cỡ không tồn tại!",
      });
    }

    if (!color) {
      return res.status(404).json({
        error: true,
        message: "Màu sắc không tồn tại!",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

export default validate;
