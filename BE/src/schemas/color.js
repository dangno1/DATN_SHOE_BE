import joi from "joi";

const colorSchema = joi.object({
  value: joi.string().required().messages({
    "string.empty": "Màu sắc không được để trống",
    "any.required": "Màu sắc là trường bắt buộc",
  }),
});

export default colorSchema;
