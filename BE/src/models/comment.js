import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentProduct = new Schema({

    UserEmail: {type: String, require: true},
    UserName: {type: String, require: true},
    CommentContent: {type: String, require: true}
});

export default mongoose.model('comment', commentProduct)