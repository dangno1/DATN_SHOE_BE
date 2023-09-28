import Product from "../../models/product.js";
import Category from "../../models/category.js";
import Size from "../../models/size.js";
import Color from "../../models/color.js";
import Coupons from "../../models/coupons.js";

export const remove = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id }); // Xóa product

    // Thông báo lỗi không tìm thấy product
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm!",
      });
    }

    // Xóa productId trong mảng products của bảng category, size, color, coupons
    await Category.findByIdAndUpdate(product.categoryId, {
      $pull: {
        products: product._id,
      },
    });
    await Size.findByIdAndUpdate(
      product.variants.map((variant) => variant.sizeId),
      {
        $pull: {
          products: product._id,
        },
      }
    );
    await Color.findByIdAndUpdate(
      product.variants.map((variant) => variant.colorId),
      {
        $pull: {
          products: product._id,
        },
      }
    );
    await Coupons.findByIdAndUpdate(product.couponsId, {
      $pull: {
        products: product._id,
      },
    });

    // Thông báo xóa product thành công
    return res.status(200).json({
      success: true,
      message: "Xóa sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    // Thông báo khi server lỗi
    return res.status(500).json({
      message: error,
    });
  }
};
