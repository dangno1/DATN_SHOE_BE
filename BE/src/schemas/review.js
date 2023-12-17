import Joi from "joi";

const reviewSchema = Joi.object({
  stars: Joi.number().min(1).max(5).required(),
  content: Joi.string().required().min(3),
  productId: Joi.string().required(),
  UserId: Joi.string().required(),
});

export default reviewSchema;
