import Review from "../../models/review.js";

export const getAllReview = async (req, res) => {
  const options = {
    limit: 1000000000000,
    sort: {
      updatedAt: -1,
    },
  };
  try {
    const { docs: reviews } = await Review.paginate({}, options);
    if (reviews.length === 0) {
      return res.status(200).json(reviews);
    }
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export default getAllReview;
