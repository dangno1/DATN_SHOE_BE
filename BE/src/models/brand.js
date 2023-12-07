import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const brandSchema = new mongoose.Schema(
  {
    name: String,
    products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true, versionKey: false }
);

brandSchema.plugin(mongoosePaginate);

export default mongoose.model("Brand", brandSchema);
