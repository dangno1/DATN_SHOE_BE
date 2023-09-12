import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const orderProduct = new Schema ({
    orderItems: [
        {
            productName: { type: String, required: true },
            productQuantity: { type: Number, required: true },
            productImage: { type: String, required: true },
            productPrice: { type: Number, required: true },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product', // Tham chiếu đến mô hình sản phẩm
                required: true,
              },
        },
    ],
    shippingAddress: {
        userName: { type: String, required: true },
        userAddress: { type: String, required: true },
        userEmail: { type: String, required: true },
        userPhone: { type: Number, required: true },
    }
})

export default mongoose.model('order', orderProduct)