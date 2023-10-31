import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import Joi from 'joi';

const couponsSchema = new mongoose.Schema(
  {
    code: String,
    quantity: Number,
    products: [
      {
        product: { type: mongoose.Types.ObjectId, ref: 'Product' },
        discountType: String,
        discountValue: Number,
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

couponsSchema.plugin(mongoosePaginate);

const productSchema = Joi.object({
  product: Joi.string().required(),
  discountType: Joi.string().valid('phần trăm', 'cố định').required(),
  discountValue: Joi.number().required(),
});

const couponSchema = Joi.object({
  code: Joi.string().required(),
  quantity: Joi.number().integer().positive().required(),
  products: Joi.array().items(productSchema).min(1).required(),
  discountType: Joi.string().valid("phần trăm", "cố định").required(),
  discountValue: Joi.number().positive().required(),
});

const Coupons = mongoose.model('Coupons', couponsSchema);

export { Coupons, couponSchema };
