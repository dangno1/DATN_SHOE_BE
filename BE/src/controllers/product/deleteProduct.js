import Product from "../../models/product.js";
import Category from "../../models/category.js";
import Brand from "../../models/brand.js";
import Size from "../../models/size.js";
import Color from "../../models/color.js";
import cloudinary from "../../configs/cloudinary.js";
import dotenv from "dotenv";
dotenv.config();

export const remove = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id });

    if (!product) {
      return res.status(400).json({
        error: true,
        message: "Xóa thất bại!",
      });
    }

    const pathImages = [product.image, ...product.thumbnail];

    if (!(pathImages.length <= 0)) {
      for (const pathImage of pathImages) {
        const splitPath = pathImage.split("/");
        const publicId = splitPath[splitPath.length - 1].split(".")[0];
        const { result } = await cloudinary.uploader.destroy(
          `${process.env.FOLDER_CLOUDINARY}/${publicId}`
        );
        if (result !== "ok") {
          return res.status(404).json({
            error: true,
            message: "Xóa thất bại!",
          });
        }
      }
    }

    await Category.findByIdAndUpdate(product.categoryId, {
      $pull: {
        products: product._id,
      },
    });

    await Brand.findByIdAndUpdate(product.brandId, {
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

    return res.status(200).json({
      success: true,
      message: "Xóa thành công",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};
