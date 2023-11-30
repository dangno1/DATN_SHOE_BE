import Joi from 'joi';

// Định nghĩa schema validate cho đánh giá sản phẩm
const ratingSchema = Joi.object({
  stars: Joi.number().min(1).max(5).required(),
  productID: Joi.string().required(), // Định nghĩa kiểu dữ liệu cho ProductId, có thể là ObjectId trong MongoDB
  UserId: Joi.string().required(), // Định nghĩa kiểu dữ liệu cho UserId, có thể là ObjectId trong MongoDB
});

export default ratingSchema;
