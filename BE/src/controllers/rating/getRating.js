import Rating from '../../models/rating.js';

const getRatings = async (req, res) => {
  try {
    const ratings = await Rating.find()
      .populate('productID')
      .populate('UserId');
    res.json(ratings);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export { getRatings };
