import Product from "../../models/product.js";
import Category from "../../models/category.js";
import Size from "../../models/size.js";
import Color from "../../models/color.js";
import productSchema from "../../schemas/product.js";
import cloudinary from "../../configs/cloudinary.js";

export const update = async (req, res) => {
  try {
    let body = JSON.parse(JSON.stringify(req.body));
    body.variants = JSON.parse(body.variants);

    const { error } = productSchema.validate(
      { ...body, thumbnail: undefined },
      {
        abortEarly: false,
      }
    );
    if (error) {
      return res.json({
        error: true,
        messages: error.details.map((detail) => detail.message),
      });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        error: true,
        message: "Sản phẩm không tồn tại",
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

    if (req.files["image"]) {
      const splitUrlImage = product.image.split("/");
      const publicIdImage =
        splitUrlImage[splitUrlImage.length - 1].split(".")[0];
      await cloudinary.uploader.destroy(
        `${process.env.FOLDER_CLOUDINARY}/${publicIdImage}`
      );
    }

    if (!req.files["thumbnail"] && product.thumbnail.length === 0) {
      return res.status(400).json({
        error: true,
        message: "Chọn tối thiểu 1 thumbnail",
      });
    }

    const idProduct = req.params.id;
    const imagePath = req.files["image"]?.[0].path;
    const thumbnailPath = req.files["thumbnail"]?.map((file) => file.path);
    const newProduct = await Product.findByIdAndUpdate(
      idProduct,
      {
        ...body,
        image: imagePath,
        thumbnail: thumbnailPath && [...thumbnailPath, ...product.thumbnail],
      },
      {
        new: true,
      }
    );

    if (!newProduct) {
      return res.status(404).json({
        error: true,
        message: "Cập nhật thất bại",
      });
    }

    if (body.categoryId !== product.categoryId) {
      await Category.findByIdAndUpdate(body.categoryId, {
        $addToSet: {
          products: product._id,
        },
      });

      await Category.findByIdAndUpdate(product.categoryId, {
        $pull: {
          products: product._id,
        },
      });
    }

    body.variants.map(async (variant, index) => {
      if (variant.sizeId !== product.variants?.[index]?.sizeId) {
        await Size.findByIdAndUpdate(variant.sizeId, {
          $addToSet: {
            products: product._id,
          },
        });
        await Size.findByIdAndUpdate(product.variants?.[index]?.sizeId, {
          $pull: {
            products: product._id,
          },
        });
      }
      if (variant.colorId !== product.variants?.[index]?.colorId) {
        await Color.findByIdAndUpdate(variant.colorId, {
          $addToSet: {
            products: product._id,
          },
        });
        await Color.findByIdAndUpdate(product.variants?.[index]?.colorId, {
          $pull: {
            products: product._id,
          },
        });
      }
    });

    return res.status(201).json({
      success: true,
      message: "Cập nhật thành công",
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};
