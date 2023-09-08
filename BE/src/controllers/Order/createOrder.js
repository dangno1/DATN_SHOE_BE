import validateOrder from '../../schemas/orderValidation';
import Order from '../../models/order';

const createOrder = async (req, res) => {
  try {
    const validationErrors = validateOrder(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }

    // Tạo đơn hàng trong CSDL
    const newOrder = new Order(req.body);
    await newOrder.save();

    return res.status(201).json({ message: 'Đơn hàng đã được tạo thành công', order: newOrder });
  } catch (err) {
    return res.status(500).json({ error: 'Lỗi server nội bộ' });
  }
// console.log('hshsd');
};

export { createOrder };
