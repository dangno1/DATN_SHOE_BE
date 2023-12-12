import OrderedProduct from "../../models/orderedProduct.js";

const updateStatus = async (req, res) => {
  try {
    const orderProduct = await OrderedProduct.findById(req.params.id);
    orderProduct.status = "Đã Xác Nhận";
    await orderProduct.save();
    return res.json({
      success: true,
      message: "Cập nhật sản phẩm thành công",
      data: orderProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

export default updateStatus;
