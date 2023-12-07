import joi from "joi";

const categorySchema = joi.object({
  name: joi.string().required().min(3).messages({
    "string.empty": "Tên danh mục không được để trống",
    "any.required": "Tên danh mục là trường bắt buộc",
    "string.min": "Tên danh mục phải có ít nhất 3 ký tự",
  }),
});

export default categorySchema;
