import Cart from "../../models/cart.js";
import validateCart from "../../schemas/cart.js";

const addCart = async (req, res) => {
  const result = {
    success: true,
    message: [],
    data: null,
  };

  const validationErrors = validateCart(req.body);

  if (validationErrors.length > 0) {
    result.success = false;
    result.message = validationErrors;
    return res.status(400).json(result);
  }

  try {
    const cart = await Cart.create(req.body);
    result.message.push('Thêm cart thành công');
    result.data = cart;
    res.json(result);
  } catch (err) {
    result.success = false;
    result.message.push('Lỗi khi thêm cart');
    res.status(500).json(result);
  }
};

export default addCart;
