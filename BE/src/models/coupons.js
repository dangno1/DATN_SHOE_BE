import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const couponsSchema = new mongoose.Schema(
  {
    value: Number,
    products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true, versionKey: false }
);

couponsSchema.plugin(mongoosePaginate);

export default mongoose.model("Coupons", couponsSchema);
