import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    thumbnail: [String],
    desc: String,
    brand: String,
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    amountSold: Number,
    couponsId: {
      type: mongoose.Types.ObjectId,
      ref: "Coupons",
      default: 0,
    },
    variants: [
      {
        _id: false,
        sizeId: {
          type: mongoose.Types.ObjectId,
        },
        colorId: {
          type: mongoose.Types.ObjectId,
        },
        price: Number,
        quantity: Number,
        status: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

productSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", productSchema);
