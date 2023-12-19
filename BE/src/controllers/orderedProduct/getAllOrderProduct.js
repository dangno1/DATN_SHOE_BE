import OrderedProduct from "../../models/orderedProduct.js";

const getOredrs = async (req, res) => {
  try {
    const orderedProduct = await OrderedProduct.find();
    return res.status(200).json(orderedProduct);
  } catch (error) {
    return res.status(500).json({ error: 'Lỗi quá trình lấy giữ liệu giỏ hàng' });
  }
};

export default getOredrs;