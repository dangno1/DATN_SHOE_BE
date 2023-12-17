import reviewSchema from "../../schemas/review.js";
import Review from "../../models/review.js";

const createReview = async (req, res) => {
  try {
    const { error } = reviewSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.json({
        error: true,
        messages: error.details.map((detail) => detail.message),
      });
    }

    const review = await Review.create(req.body);

    if (!review) {
      return res.status(400).json({
        success: false,
        message: "Không thể Thêm mới đánh giá!",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Thêm mới đánh giá thành công",
      data: review,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export default createReview;
