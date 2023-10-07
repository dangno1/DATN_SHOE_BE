import joi from "joi";

const sizeSchema = joi.object({
  value: joi.number().integer().positive().messages({
    "number.base": "Kích cỡ phải là một số",
    "number.integer": "Kích cỡ phải là một số nguyên",
    "number.positive": "Kích cỡ phải là một số lớn hơn 0",
  }),
});

export default sizeSchema;
