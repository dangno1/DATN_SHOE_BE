import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const sizeSchema = new mongoose.Schema(
  {
    value: Number,
    products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true, versionKey: false }
);

sizeSchema.plugin(mongoosePaginate);

export default mongoose.model("Size", sizeSchema);
