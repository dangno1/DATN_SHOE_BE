import Joi from "joi";

const userSchema = Joi.object({
    username:Joi.string().required().min(5).regex(/^[a-zA-Z]+$/).messages({
            "string.empty": "username không được để trống",
            "any.required": "username là trường bắt buộc",
            "string.min": "username phải có ít nhất 5 ký tự",
            'string.pattern.base': 'UserName chỉ được chứa các ký tự chữ cái Và viết liền không dấu',
    }),
    fullname: Joi.string().required().min(5).messages({
        "string.empty": "Fullname không được để trống",
        "any.required": "Fullname là trường bắt buộc",
        "string.min": "Fullname phải có ít nhất 5 ký tự",
       
    }),
    phone: Joi.string().required().pattern(new RegExp(/^[0-9]{10}$/)).messages({
        'string.empty': 'Số điện thoại không được để trống',
        'string.pattern.base': 'Số điện thoại phải có đúng 10 chữ số',
        'any.required': 'Số điện thoại là trường bắt buộc',
    }),
    email: Joi.string().email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email không được để trống',
      'any.required': 'Email là trường bắt buộc',
      'string.email': 'Email không hợp lệ, email phải có @ và . ',
    }),
    address: Joi.string().required().min(5).messages({
        "string.empty": "address không được để trống",
        "any.required": "address là trường bắt buộc",
        "string.min": "address phải có ít nhất 5 ký tự",

    }),
    password:Joi.number().required().min(5).messages({
        "string.empty": "password không được để trống",
        "string.min": "password phải có ít nhất 5 ký tự",
        "any.required": "password là trường bắt buộc",
    })
    
});

export default userSchema