import ratingSchema from '../../schemas/rating.js';
import Rating from '../../models/rating.js';

const createRating = async (req, res) => {
  try {
    const { stars, productID, UserId } = req.body;
    
    // Kiểm tra dữ liệu đầu vào bằng ratingSchema
    const { error } = ratingSchema.validate({ stars, productID, UserId }, { abortEarly: false });
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessages });
    }

    const newRating = new Rating({ stars, productID, UserId });
    const savedRating = await newRating.save();
    
    return res.status(201).json(savedRating);
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { createRating };
