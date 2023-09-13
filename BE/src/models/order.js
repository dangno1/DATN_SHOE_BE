const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderItems: [
        {
            productName: { type: String, required: true },
            productQuantity: { type: Number, required: true },
            productImage: { type: String, required: true },
            productPrice: { type: Number, required: true },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
        },
    ],
    shippingAddress: {
        userName: { type: String, required: true },
        userAddress: { type: String, required: true },
        userEmail: { type: String, required: true },
        userPhone: { type: Number, required: true },
    },
});

// hàm tính tiền sản phẩm
orderSchema.virtual('totalPrice').get(function () {
    return this.orderItems.reduce((total, item) => total + item.productPrice * item.productQuantity, 0);
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
