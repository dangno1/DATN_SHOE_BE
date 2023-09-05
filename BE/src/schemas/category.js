import joi from "joi";

const categorySchema = joi.object({
  name: joi.string().required().min(3).messages({
    "string.empty": "name không được để trống",
    "any.required": "name là trường bắt buộc",
    "string.min": "name phải có ít nhất 3 ký tự",
  }),
});

export default categorySchema;
