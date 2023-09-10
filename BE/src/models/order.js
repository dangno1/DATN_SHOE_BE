import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const orderProduct = new Schema ({
    OrderItems: [
        {
            ProductName: { type: String, required: true },
            ProductQuantity: { type: Number, required: true },
            ProductImage: { type: String, required: true },
            ProductPrice: { type: Number, required: true },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product', // Tham chiếu đến mô hình sản phẩm
                required: true,
              },
        },
    ],
    shippingAddress: {
        UserName: { type: String, required: true },
        UserAddress: { type: String, required: true },
        UserEmail: { type: String, required: true },
        UserPhone: { type: Number, required: true },
    }
})

export default mongoose.model('order', orderProduct)