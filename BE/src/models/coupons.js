import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const couponsSchema = new mongoose.Schema(
  {
    code: String,
    quantity: Number,
    discountValue: Number,
  },
  { timestamps: true, versionKey: false }
);

couponsSchema.plugin(mongoosePaginate);

export default mongoose.model("Coupons", couponsSchema);
