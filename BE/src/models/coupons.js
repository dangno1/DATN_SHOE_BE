import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const couponsSchema = new mongoose.Schema(
  {
    code: String,           
    quantity: Number,     
    discountType: String,   // Loại giảm giá cần áp dụng, ví dụ: "phần trăm" hoặc "cố định".
    discountValue: Number,  
    products: [
      {
        product: { type: mongoose.Types.ObjectId, ref: "Product" }
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

couponsSchema.plugin(mongoosePaginate);

export default mongoose.model("Coupons", couponsSchema);
