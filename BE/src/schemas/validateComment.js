import Joi from 'joi';

const commentSchema = Joi.object({
  UserEmail: Joi.string().email().required().regex(/^\S+@\S+.\S+$/).messages({
    'string.empty': 'User Email không được bỏ trống',
    'string.email': 'User Email phải là định dạng email hợp lệ',
    'any.required': 'User Email là trường bắt buộc',
  'string.pattern.base': 'User Email không được có dấu cách'
  }),
  UserName: Joi.string().required().regex(/^\S+$/).messages({
    'string.empty': 'User Name không được bỏ trống',
    'any.required': 'User Name là trường bắt buộc',
    'string.pattern.base': 'User Name không được có dấu cách',
  }),
  CommentContent: Joi.string().required().min(30) 
  .regex(/^[^\s]*(\s[^\s]*){0,7}$/).messages({
    'string.empty': 'Comment Content không được bỏ trống',
    'any.required': 'Comment Content là trường bắt buộc',
    'string.min': 'Comment Content phải có ít nhất 30 ký tự',
    'string.pattern.base': 'Comment Content không được có quá 7 dấu cách',
  }),
}).options({ abortEarly: false });
// const result = commentSchema.validate({ CommentContent: 'Đây là bình luận của tôi' });
// if (result.error) {
//   // console.error(result.error.details);
// } else {
//   console.log('Hợp lệ');
// }
export default commentSchema;
