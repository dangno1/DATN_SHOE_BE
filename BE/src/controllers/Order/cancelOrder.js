import Order from '../../models/order';

const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    // Xóa đơn hàng theo orderId
    const deletedOrder = await Order.findOneAndDelete({ orderId });

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng để hủy' });
    }

    return res.status(200).json({ message: 'Đơn hàng đã được hủy thành công' });
  } catch (err) {
    return res.status(500).json({ error: 'Lỗi server nội bộ' });
  }
};

export { cancelOrder };
