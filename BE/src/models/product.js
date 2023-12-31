import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    thumbnail: [String],
    desc: {
      type: String,
      default: "Đang cập nhật",
    },
    brandId: {
      type: mongoose.Types.ObjectId,
      ref: "Brand",
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    variants: [
      {
        sizeId: {
          type: mongoose.Types.ObjectId,
        },
        colorId: {
          type: mongoose.Types.ObjectId,
        },
        price: Number,
        discount: {
          type: Number,
          default: 0,
        },
        amountSold: Number,
        quantity: Number,
        status: {
          type: Number,
          default: 1,
        },
      },
    ],
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

productSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", productSchema);
