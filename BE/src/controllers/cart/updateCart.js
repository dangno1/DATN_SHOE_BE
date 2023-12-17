import Cart from "../../models/cart.js";

export const updateQuantityCartPlus = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm trong giỏ hàng",
      });
    }
    const initialPrice = cart.totalPrice;

    cart.quantity = req.body.quantity;
    cart.totalPrice = cart.quantity * initialPrice;
    await cart.save();
    // console.log(cart);
    return res.json({
      success: true,
      message: "Cập nhật sản phẩm thành công",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

export const updateQuantityCartMinus = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm trong giỏ hàng",
      });
    }

    if (cart.quantity > 1) {
      const initialPrice = cart.price;

      cart.quantity--;
      cart.totalPrice = cart.quantity * initialPrice;
      await cart.save();
    }

    return res.json({
      success: true,
      message: "Cập nhật sản phẩm thành công",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};
