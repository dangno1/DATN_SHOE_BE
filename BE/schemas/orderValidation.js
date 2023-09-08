import Joi from 'joi';


const orderItemSchema = Joi.object({
  ProductName: Joi.string().required().messages({
    'string.empty': 'Product Name không được bỏ trống',
    'any.required': 'Product Name là trường bắt buộc',
  }),
  ProductQuantity: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      'number.base': 'Product Quantity phải là số',
      'number.integer': 'Product Quantity phải là số nguyên',
      'number.min': 'Product Quantity phải lớn hơn hoặc bằng 1',
      'any.required': 'Product Quantity là trường bắt buộc',
    }),
  ProductImage: Joi.string().required().messages({
    'string.empty': 'Product Image không được bỏ trống',
    'any.required': 'Product Image là trường bắt buộc',
  }),
  ProductPrice: Joi.number()
    .min(0)
    .required()
    .messages({
      'number.base': 'Product Price phải là số',
      'number.min': 'Product Price phải lớn hơn hoặc bằng 0',
      'any.required': 'Product Price là trường bắt buộc',
    }),
  product: Joi.string().required().messages({
    'string.empty': 'Product không được bỏ trống',
    'any.required': 'Product là trường bắt buộc',
  }),
});


const shippingAddressSchema = Joi.object({
  UserName: Joi.string().required().messages({
    'string.empty': 'User Name không được bỏ trống',
    'any.required': 'User Name là trường bắt buộc',
  }),
  UserAddress: Joi.string().required().messages({
    'string.empty': 'User Address không được bỏ trống',
    'any.required': 'User Address là trường bắt buộc',
  }),
  UserEmail: Joi.string().email().required().messages({
    'string.empty': 'User Email không được bỏ trống',
    'string.email': 'User Email phải là định dạng email hợp lệ',
    'any.required': 'User Email là trường bắt buộc',
  }),
  UserPhone: Joi.number().required().messages({
    'number.base': 'User Phone phải là số',
    'any.required': 'User Phone là trường bắt buộc',
  }),
});

const orderSchema = Joi.object({
  OrderItems: Joi.array()
    .items(orderItemSchema)
    .min(1)
    .required()
    .messages({
      'array.base': 'Order Items phải là mảng',
      'array.min': 'Phải có ít nhất một Order Item',
      'any.required': 'Order Items là trường bắt buộc',
    }),
  shippingAddress: shippingAddressSchema.required(),
}).options({ abortEarly: false });

const validateOrder = (data) => {
  const { error } = orderSchema.validate(data, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return errorMessages;
  }

  return [];
};

export default validateOrder;
