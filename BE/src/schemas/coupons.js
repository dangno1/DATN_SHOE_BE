import joi from "joi";

const couponsSchema = joi.object({
  value: joi.number().integer().positive().required().max(100).messages({
    "number.base": "Giá trị mã giảm giá phải là một số",
    "number.integer": "Giá trị mã giảm giá phải là một số nguyên",
    "number.positive": "Giá trị mã giảm giá phải là một số lớn hơn 0",
    "number.max": "Giá trị mã giảm giá không được lớn hơn 100",
  }),
  quantity: joi.number().integer().positive().required().messages({
    "number.base": "Số lượng mã giảm giá phải là một số",
    "number.integer": "Số lượng mã giảm giá phải là một số nguyên",
    "number.positive": "Số lượng mã giảm giá phải là một số lớn hơn 0",
  }),
});

export default couponsSchema;
