import Cart from "../../models/cart.js";

const getCartById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if(!cart) {
      return res.status(404).json({
        error: true,
        message: "Không có dữ liệu!",
      });
    }
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
}

export default getCartById;