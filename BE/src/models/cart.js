import mongoose from "mongoose";

const { Schema } = mongoose;

const cartSchema = new Schema({
    userName: String,
    userEmail: String,
    userAddress: String,
    productName: String,
    quantity: Number,
    price: Number,
    initialPrice: Number,
    totalPrice: Number,
    size: Number,
    category: String,
    image: String,
    color: String,
    status: String,
    quantityAvailable: Number,
    productID: String,
    variantsId: String,
    quantityStock: Number,
});

export default mongoose.model("Cart", cartSchema);