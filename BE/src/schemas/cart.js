import Joi from "joi";

const cartSchema = Joi.object({
  userName: Joi.string().trim().min(6).required().messages({
    "string.empty": "userName không được bỏ trống",
    "any.required": "userName là trường bắt buộc",
    "string.min": "userName phải có ít nhất 6 ký tự",
    "string.trim": "userName không được chứa khoảng trắng",
  }),
  userEmail: Joi.string().trim().email().required().messages({
    "string.empty": "userEmail không được bỏ trống",
    "string.email": "userEmail phải là địa chỉ email hợp lệ",
    "any.required": "userEmail là trường bắt buộc",
  }),
  userAddress: Joi.string()
  .messages({}),
  productName: Joi.string()
    .trim()
    .min(6)
    .required()
    .custom((value, helpers) => {
      if (/^\s+$/.test(value)) {
        return helpers.message(
          "productName không được chứa tất cả là khoảng trắng"
        );
      }
      return value;
    })
    .messages({
      "string.empty": "productName không được bỏ trống",
      "any.required": "productName là trường bắt buộc",
      "string.min": "productName phải có ít nhất 6 ký tự",
      "string.trim": "productName không được chứa tất cả là khoảng trắng",
    }),
  quantity: Joi.number().integer().min(1).required().messages({
    "number.base": "quantity phải là số",
    "number.integer": "quantity phải là số nguyên",
    "number.min": "quantity phải lớn hơn hoặc bằng 1",
    "any.required": "quantity là trường bắt buộc",
  }),
  size: Joi.required().messages({
    "number.base": "size phải là số",
  }),
  price: Joi.number().min(0).required().messages({
    "number.base": "price phải là số",
    "number.min": "price phải lớn hơn hoặc bằng 0",
    "any.required": "price là trường bắt buộc",
  }),
  totalPrice: Joi.number().min(0).required().messages({
    "number.base": "totalPrice phải là số",
    "number.min": "totalPrice phải lớn hơn hoặc bằng 0",
    "any.required": "totalPrice là trường bắt buộc",
  }),
  category: Joi.string().required().messages({
    "string.empty": "category không được bỏ trống",
    "any.required": "category là trường bắt buộc",
  }),
  initialPrice: Joi.number().min(0).required().messages({
    "number.base": "totalPrice phải là số",
    "number.min": "totalPrice phải lớn hơn hoặc bằng 0",
    "any.required": "totalPrice là trường bắt buộc",
  }),
  color: Joi.string()
    .trim()
    .min(2)
    .required()
    .custom((value, helpers) => {
      if (/^\s+$/.test(value)) {
        return helpers.message("color không được chứa tất cả là khoảng trắng");
      }
      return value;
    })
    .messages({
      "string.empty": "color không được bỏ trống",
      "any.required": "color là trường bắt buộc",
      "string.min": "color phải có ít nhất 2 ký tự",
      "string.trim": "color không được chứa tất cả là khoảng trắng",
    }),
  status: Joi.string().required().messages({
    "string.empty": "category không được bỏ trống",
    "any.required": "category là trường bắt buộc",
  }),
  productID: Joi.string().required().messages({
    "string.empty": "productID không được bỏ trống",
    "any.required": "productID là trường bắt buộc",
  }),
  image: Joi.string().required().messages({}),
}).options({ abortEarly: false });

const validateCart = (data) => {
  const { error } = cartSchema.validate(data, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return errorMessages;
  }

  return [];
};

export default validateCart;
