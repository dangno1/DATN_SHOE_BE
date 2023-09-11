import Cart from "../../models/cart.js";

const getCarts = async (req, res) => {
    try {
        const cart = await Cart.find();
        return res.json({
            success: true,
            data: cart,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Lỗi trong quá trình lấy dữ liệu giỏ hàng",
        });
    }
}

export default getCarts;
