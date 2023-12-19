import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentProduct = new Schema({
    ProductID: {
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    },
    UserID: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    CommentContent: { type: String, required: true },
    DatePosted: { type: Date, default: Date.now },
});
export default mongoose.model('comment', commentProduct)