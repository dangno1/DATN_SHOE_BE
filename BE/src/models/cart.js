import mongoose from "mongoose";

const { Schema } = mongoose;

const cartSchema = new Schema({
    userName: String,
    userEmail: String,
    userAddress: String,
    productName: String,
    quantity: Number,
    price: Number,
    totalPrice: Number,
    category: Number,
    color: String
});

export default mongoose.model("Cart", cartSchema);