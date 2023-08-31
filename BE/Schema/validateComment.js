import Joi from 'joi';

const commentSchema = Joi.object({
  UserEmail: Joi.string().email().required().messages({
    'string.empty': 'User Email không được bỏ trống',
    'string.email': 'User Email phải là định dạng email hợp lệ',
    'any.required': 'User Email là trường bắt buộc',
  }),
  UserName: Joi.string().required().messages({
    'string.empty': 'User Name không được bỏ trống',
    'any.required': 'User Name là trường bắt buộc',
  }),
  CommentContent: Joi.string().required().messages({
    'string.empty': 'Comment Content không được bỏ trống',
    'any.required': 'Comment Content là trường bắt buộc',
  }),
}).options({ abortEarly: false });

export default commentSchema;
