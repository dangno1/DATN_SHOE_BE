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
  orderCode: String,
  status: String,
});

export default mongoose.model("OrderedProduct", orderedProductSchema);
