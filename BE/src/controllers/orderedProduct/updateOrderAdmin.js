import OrderedProduct from "../../models/orderedProduct.js";

const updateStatusAdmin = async (req, res) => {
  const orderedProduct = await OrderedProduct.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  return res.json({
    success: true,
    message: "Cập nhật Trạng Thái thành công",
    data: orderedProduct,
  });
};

export default updateStatusAdmin;
