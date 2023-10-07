import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const colorSchema = new mongoose.Schema(
  {
    value: String,
    products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true, versionKey: false }
);

colorSchema.plugin(mongoosePaginate);

export default mongoose.model("Color", colorSchema);
