import Product from "../../models/product.js";
import Category from "../../models/category.js";
import productSchema from "../../schemas/product.js";

export const update = async (req, res) => {
  try {
    // Chuyển req.body thành một đối tượng thông thường
    let body = JSON.parse(JSON.stringify(req.body));

    // Phân giải chuỗi JSON từ variants
    body.variants = JSON.parse(body.variants);

    // validate và thông báo lỗi bằng joi
    const { error } = productSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
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
    if (productList.image) {
      await cloudinary.v2.uploader.destroy(product.image);
    }
    if (productList.thumbnail) {
      for (const thumbnailUrl of product.thumbnail) {
        await cloudinary.v2.uploader.destroy(thumbnailUrl);
      }
    }

    // Upload the new image to Cloudinary
    const uploadResult = await cloudinary.v2.uploader.upload(req.file.image);

    // Update the product image
    product.image = uploadResult.secure_url;

    // Upload the thumbnail images to Cloudinary
    const thumbnailUploadResults = await cloudinary.v2.uploader.upload(
      req.file.thumbnail
    );

    // Update the product thumbnail
    product.thumbnail = thumbnailUploadResults.map(
      (result) => result.secure_url
    );

    // Cập nhật product dựa vào id
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...body, variants: body.variants.map((variant) => ({ ...variant })) },
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
    return res.status(200).json({
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
