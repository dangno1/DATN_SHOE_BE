import joi from "joi";

const couponsSchema = joi.object({
  value: joi.number().integer().positive().required().max(100).messages({
    "number.base": "Mã giảm giá phải là một số",
    "number.integer": "Mã giảm giá phải là một số nguyên",
    "number.positive": "Mã giảm giá phải là một số lớn hơn 0",
    "number.max": "Mã giảm giá không được lớn hơn 100",
  }),
});

export default couponsSchema;
