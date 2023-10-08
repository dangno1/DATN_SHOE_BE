import Product from "../../models/product.js";
import Category from "../../models/category.js";
import productSchema from "../../schemas/product.js";
import { v2 as cloudinary } from "cloudinary";

export const update = async (req, res) => {
  try {
    // Chuyển req.body thành một đối tượng thông thường
    let body = JSON.parse(JSON.stringify(req.body));

    // Phân giải chuỗi JSON từ variants
    body.variants = JSON.parse(body.variants);

    // Kiểm tra xem biến body.variants có phải là một mảng không
    // if (!Array.isArray(body.variants)) {
    //   return res.json({
    //     success: false,
    //     messages: "errrrr",
    //   });
    // }

    // validate và thông báo lỗi bằng joi

    const { error } = productSchema.validate(body, {
      abortEarly: false,
    });
    if (error) {
      console.log(error);
      return res.json({
        success: false,
        messages: error.details.map((detail) => detail.message),
      });
    }

    // Thông báo lỗi không tìm thấy category
    const category = await Category.findById(req.body.categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Danh mục sản phẩm không tồn tại",
      });
    }

    const productList = await Product.findById(req.params.id);

    // Delete the existing image and thumbnail from Cloudinary
    if (productList) {
      if (productList.image) {
        const idImage = productList.image.split("/");
        await cloudinary.uploader.destroy(
          idImage[idImage.length - 1].split(".")[0]
        );
      }
      for (const thumbnail of productList.thumbnail) {
        const idThumbnail = thumbnail.split("/");
        await cloudinary.uploader.destroy(
          idThumbnail[idThumbnail.length - 1].split(".")[0]
        );
      }
    }

    // Cập nhật product dựa vào id
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...body,
        image: req.files["image"][0].path,
        thumbnail: req.files["thumbnail"].map((file) => file.path),
      },
      {
        new: true,
      }
    );

    // thông báo lỗi không tìm thấy product
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm",
      });
    }

    // Thông báo cập nhật product thành công
    return res.status(201).json({
      success: true,
      message: "Sản phẩm đã được cập nhật thành công",
      data: product,
    });
  } catch (error) {
    // Thông báo khi server lỗi
    return res.status(500).json({
      message: error,
    });
  }
};
