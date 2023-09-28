import Size from "../../models/size.js";
import Product from "../../models/product.js";

export const remove = async (req, res) => {
  try {
    const size = await Size.findOneAndDelete({ _id: req.params.id });

    if (size.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy size!",
      });
    }

    await Product.findByIdAndUpdate(size._id, {
      $pull: {
        products: size._id,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Xóa size thành công",
      data: size,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
