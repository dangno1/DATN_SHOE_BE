import Color from "../../models/color.js";
import Product from "../../models/product.js";

export const remove = async (req, res) => {
  try {
    const color = await Color.findOneAndDelete({ _id: req.params.id });
    await Product.findByIdAndUpdate(color._id, {
      $pull: {
        products: color._id,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Xóa color thành công!",
      data: color,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
