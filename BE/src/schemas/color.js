import joi from "joi";

const colorSchema = joi.object({
  value: joi.string().required().min(3).messages({
    "string.empty": "Màu sắc không được để trống",
    "any.required": "Màu sắc là trường bắt buộc",
    "string.min": "Màu sắc phải có ít nhất 3 ký tự",
  }),
});

export default colorSchema;
