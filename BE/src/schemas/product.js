import joi from "joi";

const variantSchema = joi.object({
  size: joi.number().required().integer().positive().messages({
    "any.required": "size là trường bắt buộc",
    "number.base": "size phải là một số",
    "number.integer": "size phải là một số nguyên",
    "number.positive": "size phải là một số lớn hơn 0",
  }),
  color: joi.string().required().messages({
    "string.empty": "Màu sắc không được để trống",
    "any.required": "size là trường bắt buộc",
  }),
  price: joi.number().integer().positive().required().messages({
    "number.base": "price phải là một số",
    "number.integer": "price phải là một số nguyên",
    "number.positive": "price phải là một số lớn hơn 0",
    "any.required": "price là trường bắt buộc",
  }),
  quantity: joi.number().integer().positive().required().messages({
    "number.base": "quantity phải là một số",
    "number.integer": "quantity phải là một số nguyên",
    "number.positive": "quantity phải là một số lớn hơn 0",
    "any.required": "quantity là trường bắt buộc",
  }),
  status: joi.number().required().messages({
    "number.base": "Trạng thái phải là một số",
    "any.required": "Trạng thái là trường bắt buộc",
  }),
});

const productSchema = joi.object({
  name: joi.string().required().min(3).messages({
    "string.empty": "name không được để trống",
    "any.required": "name là trường bắt buộc",
    "string.min": "name phải có ít nhất 3 ký tự",
  }),

  image: joi.string().required().messages({
    "string.empty": "image không được để trống",
    "any.required": "image là trường bắt buộc",
  }),

  images: joi.array().items(
    joi.string().messages({
      "string.empty": "images không được để trống",
      "any.required": "images là trường bắt buộc",
    })
  ),

  desc: joi.string().messages({
    "string.empty": "description không được để trống",
    "any.required": "description là trường bắt buộc",
  }),

  variants: joi.array().items(variantSchema),

  brand: joi.string().required().messages({
    "string.empty": "brand không được để trống",
    "any.required": "brand là trường bắt buộc",
  }),

  categoryId: joi.string().required().messages({
    "string.empty": "Danh mục không được để trống",
    "any.required": "Danh mục là trường bắt buộc",
  }),
});

export default productSchema;
