import joi from "joi";

const sizeSchema = joi.object({
  value: joi.number().integer().positive().required().messages({
    "number.base": "Kích cỡ phải là một số",
    "number.integer": "Kích cỡ phải là một số nguyên",
    "number.positive": "Kích cỡ phải là một số lớn hơn 0",
    "any.required": "Kích cỡ là trường bắt buộc",
  }),
});

export default sizeSchema;
