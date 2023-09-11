import Cart from "../../models/cart.js";

const deleteCart = async (req, res) => {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    return res.json({
        success: true,
        message: "Xóa sản phẩm thành công",
        data: cart,
    })
}

export default deleteCart;