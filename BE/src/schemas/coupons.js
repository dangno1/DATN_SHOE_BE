import joi from "joi";

const couponsSchema = joi.object({
  code: joi.string().required().messages({
    "string.base": "Mã giảm giá phải là một chuỗi",
    "any.required": "Mã giảm giá là trường bắt buộc",
  }),
  quantity: joi.number().integer().positive().required().messages({
    "number.base": "Số lượng phải là một số",
    "number.integer": "Số lượng phải là một số nguyên",
    "number.positive": "Số lượng phải là một số dương",
    "any.required": "Số lượng là trường bắt buộc",
  }),

  discountValue: joi.number().required().max(100).messages({
    "number.base": "Giá trị giảm giá phải là một số",
    "number.max": "Giá trị giảm giá không được lớn hơn 100",
    "any.required": "Giá trị giảm giá là trường bắt buộc",
  }),
  products: joi.array().items(
    joi.object({
      product: joi.string().required(),
    })
  ),
});

export default couponsSchema;
