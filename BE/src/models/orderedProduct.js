import mongoose from "mongoose";

const { Schema } = mongoose;
const orderedProductSchema = new Schema({
  userName: String,
  userEmail: String,
  userAddress: String,
  userPhone: Number,
  products: [
    {
      productName: String,
      productInitialPrice: Number,
      productPrice: Number,
      productImage: String,
      productColor: String,
      productSize: Number,
      productQuantity: Number,
    },
  ],
  otp: String,
  orderCode: String,
  timer: String,
  paymentMethod: Number,
  status: String,
});

export default mongoose.model("OrderedProduct", orderedProductSchema);
