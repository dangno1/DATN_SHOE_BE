import cloudinary from "../../configs/cloudinary.js";
import Product from "../../models/product.js";

export const deleteThumbnail = async (req, res) => {
  try {
    const productId = req.params.id;
    const publicId = req.params.publicId;

    const product = await Product.findById(productId);

    const result = await cloudinary.uploader.destroy(
      `${process.env.FOLDER_CLOUDINARY}/${publicId}`
    );

    let urlThumbnail = product.thumbnail.find((item) =>
      item.includes(publicId)
    );

    await Product.findByIdAndUpdate(
      productId,
      {
        $pull: {
          thumbnail: urlThumbnail,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};
