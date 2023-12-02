import joi from "joi";

const brandSchema = joi.object({
  name: joi.string().required().messages({
    "string.empty": "Tên thương hiệu không được để trống",
    "any.requiired": "Tên thương hiệu là trường bắt buộc",
  }),
});

export default brandSchema;
