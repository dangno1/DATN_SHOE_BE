import OrderedProduct from "../../models/orderedProduct.js";

const getOredrs = async (req, res) => {
  try {
    const orderedProduct = await OrderedProduct.find();
    return res.json({
      success: true,
      data: orderedProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Lỗi trong quá trình lấy dữ liệu giỏ hàng",
    });
  }
};

export default getOredrs;