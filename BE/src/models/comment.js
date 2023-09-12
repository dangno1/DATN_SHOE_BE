import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentProduct = new Schema({

    userEmail: {type: String, require: true},
    userName: {type: String, require: true},
    commentContent: {type: String, require: true}
});

export default mongoose.model('comment', commentProduct)