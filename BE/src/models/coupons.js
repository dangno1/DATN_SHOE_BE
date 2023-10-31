// couponsModel.js

import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const couponsSchema = new mongoose.Schema(
  {
    code: String,           
    quantity: Number,       
    products: [
      {
        product: { type: mongoose.Types.ObjectId, ref: "Product" },
        discountType: String,   // Loại giảm giá cần áp dụng, ví dụ: "phần trăm" hoặc "cố định".
        discountValue: Number,  // Giá trị chiết khấu, có thể là phần trăm hoặc số tiền cố định, tùy thuộc vào discountType.
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

couponsSchema.plugin(mongoosePaginate);

export default mongoose.model("Coupons", couponsSchema);
