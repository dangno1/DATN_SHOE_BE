import Joi from "joi";

const userSchema = Joi.object({
    username:Joi.string().required().min(5).regex(/^[a-zA-Z0-9]+$/).messages({
            "string.empty": "username không được để trống",
            "any.required": "username là trường bắt buộc",
            "string.min": "username phải có ít nhất 5 ký tự",
            'string.pattern.base': 'Username chỉ được chứa các ký tự chữ cái và số',
    }),
    fullname: Joi.string().required().min(5).messages({
        "string.empty": "Fullname không được để trống",
        "any.required": "Fullname là trường bắt buộc",
        "string.min": "Fullname phải có ít nhất 5 ký tự",
    }),
    phone: Joi.string().required().pattern(/^[0]{1}[0-9]{9}$/).messages({
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
    password:Joi.string().required().min(5).messages({
        "string.empty": "password không được để trống",
        "string.min": "password phải có ít nhất 5 ký tự",
        "any.required": "password là trường bắt buộc",
    }), 
    confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.only": "Mật khẩu bạn vừa nhập không trùng khớp hãy nhập lại",
    "any.required": "confirmPassword là trường bắt buộc",
  }),
});

const updateUserSchema = Joi.object({
    username:Joi.string().min(5).regex(/^[a-zA-Z0-9]+$/).messages({
        "string.empty": "username không được để trống",
        "string.min": "username phải có ít nhất 5 ký tự",
        'string.pattern.base': 'Username chỉ được chứa các ký tự chữ cái và số',
}),
    fullname: Joi.string().min(5).messages({
        "string.empty": "Fullname không được để trống",
        "any.required": "Fullname là trường bắt buộc",
        "string.min": "Fullname phải có ít nhất 5 ký tự",
       
    }),
    phone: Joi.string().pattern(/^[0]{1}[0-9]{9}$/).messages({
        'string.empty': 'Số điện thoại không được để trống',
        'string.pattern.base': 'Số điện thoại phải bắt đầu bằng số 0 và có đúng 10 chữ số',
        'any.required': 'Số điện thoại là trường bắt buộc',
    }),
    email: Joi.string().email({ tlds: { allow: false } })
    .messages({
      'string.empty': 'Email không được để trống',
      'any.required': 'Email là trường bắt buộc',
      'string.email': 'Email không hợp lệ, email phải có @ và . ',
    }),
    address: Joi.string().min(5).messages({
        "string.empty": "address không được để trống",
        "any.required": "address là trường bắt buộc",
        "string.min": "address phải có ít nhất 5 ký tự",

    }),
});

const changePasswordSchema = Joi.object({
    oldPassword: Joi.string().required().label('Mật khẩu cũ'),
    newPassword: Joi.string().min(5).required().label('Mật khẩu mới').messages({
        "string.empty": "newPassword không được để trống",
        "string.min": "newPassword phải có ít nhất 5 ký tự",
        "any.required": "newPassword là trường bắt buộc"
    }),
    confirmPassword: Joi.string().required().valid(Joi.ref("newPassword")).messages({
        "any.only": "Mật khẩu bạn vừa nhập không trùng khớp hãy nhập lại",
        "any.required": "confirmPassword là trường bắt buộc",
      }).options({ abortEarly: false }),
  });

export  {userSchema,updateUserSchema,changePasswordSchema};