import Order from '../../models/order';

const getAllOrders = async (req, res) => {
  try {
    // Lấy tất cả đơn hàng từ CSDL
    const allOrders = await Order.find();

    return res.status(200).json({ orders: allOrders });
  } catch (err) {
    return res.status(500).json({ error: 'Lỗi server nội bộ' });
  }
};

export { getAllOrders };
