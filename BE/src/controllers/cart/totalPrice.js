import Cart from "../../models/cart.js";

const calculateTotalPrice = async (req, res) => {
  try {
    const selectedProductIds = req.body.selectedProductIds;

    const totalPrice = await Cart.aggregate([
      {
        $match: {
          _id: { $in: selectedProductIds },
        },
      },
      {
        $group: {
          _id: null,
          totalPrice: { $sum: "$price" },
        },
      },
    ]);

    return res.json({
      success: true,
      message: "Tính tổng tiền thành công",
      data: { totalPrice: totalPrice[0]?.totalPrice || 0 },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Lỗi trong quá trình tính tổng tiền",
      error: error.message,
    });
  }
};

export default calculateTotalPrice;
