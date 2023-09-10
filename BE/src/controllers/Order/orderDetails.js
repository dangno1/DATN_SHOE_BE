import Order from '../../models/order';

const getOrderDetails = async (req, res) => {
  try {
    const orderId = req.params.id;

    // Tìm đơn hàng theo orderId
    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }

    return res.status(200).json({ order });
  } catch (err) {
    return res.status(500).json({ error: 'Lỗi server nội bộ' });
  }
};

export { getOrderDetails };
