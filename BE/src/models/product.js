import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    images: [String],
    desc: String,
    brand: String,
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    variants: [
      {
        _id: false,
        size: Number,
        color: String,
        price: Number,
        quantity: Number,
        status: Number,
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

productSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", productSchema);
