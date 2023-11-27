import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ratingproduct = new Schema({
    stars: Number,
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  });
  
  export default mongoose.model('Rating', ratingproduct)