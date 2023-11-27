import Joi from "joi";

const orderedProductSchemaJoi = Joi.object({
  userName: Joi.string().min(6).required().pattern(/^(?!\s)(?!.*\s$)/).message({
      "string.min": "Tên người dùng phải có ít nhất 6 ký tự",
      "any.required": "Tên người dùng là trường bắt buộc",
      "string.pattern.base": "Tên người dùng không được chứa tất cả cách",
    }),
  userEmail: Joi.string().trim().email().required().messages({
    "string.empty": "userEmail không được bỏ trống",
    "string.email": "userEmail phải là địa chỉ email hợp lệ",
    "any.required": "userEmail là trường bắt buộc",
  }),
  userAddress: Joi.string().trim().min(3).required().messages({
      "string.empty": "userAddress không được bỏ trống",
      "any.required": "userAddress là trường bắt buộc",
      "string.min": "userAddress phải có ít nhất 3 ký tự",
      "string.trim": "userAddress không được chứa tất cả là khoảng trắng",
    }),
  userPhone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
  products: Joi.array().items(
    Joi.object({
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
      productInitialPrice: Joi.number().min(0).required().messages({
        "number.base": "productInitialPrice phải là số",
        "number.min": "productInitialPrice phải lớn hơn hoặc bằng 0",
        "any.required": "productInitialPrice là trường bắt buộc",
      }),
      productPrice: Joi.number().min(0).required().messages({
        "number.base": "productPrice phải là số",
        "number.min": "productPrice phải lớn hơn hoặc bằng 0",
        "any.required": "productPrice là trường bắt buộc",
      }),
      productImage: Joi.string().required(),
      productColor: Joi.string()
        .trim()
        .min(2)
        .required()
        .custom((value, helpers) => {
          if (/^\s+$/.test(value)) {
            return helpers.message(
              "productColor không được chứa tất cả là khoảng trắng"
            );
          }
          return value;
        })
        .messages({
          "string.empty": "productColor không được bỏ trống",
          "any.required": "productColor là trường bắt buộc",
          "string.min": "productColor phải có ít nhất 2 ký tự",
          "string.trim": "productColor không được chứa tất cả là khoảng trắng",
        }),
      productSize: Joi.number().min(20).required().messages({
        "number.base": "productSize phải là số",
        "number.min": "productSize phải lớn hơn hoặc bằng 20",
        "any.required": "productSize là trường bắt buộc",
      }),
      productQuantity: Joi.number().integer().min(1).required().messages({
        "number.base": "productQuantity phải là số",
        "number.integer": "productQuantity phải là số nguyên",
        "number.min": "productQuantity phải lớn hơn hoặc bằng 1",
        "any.required": "productQuantity là trường bắt buộc",
      }),
      productID: Joi.string().required().messages({
        "string.empty": "productID không được bỏ trống",
        "any.required": "productID là trường bắt buộc",
      }),
    })
  ),
  paymentMethod: Joi.string().required(),
  status: Joi.string().valid("Chờ Xác Nhận", "Đang Chuẩn Bị Hàng", "Đơn Hàng Đang Đến Với Bạn").required(),
  totalPrice: Joi.number().required(),
}).options({ abortEarly: false });

const validateOrder = (data) => {
  const { error } = orderedProductSchemaJoi.validate(data, {
    abortEarly: false,
  });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return errorMessages;
  }

  return [];
};

export default validateOrder;
