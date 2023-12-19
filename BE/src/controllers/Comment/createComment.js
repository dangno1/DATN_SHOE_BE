import commentSchema from '../../schemas/validateComment.js';
import Comment from '../../models/comment.js';

const createComment = async (req, res) => {
  try {
    const { ProductID, UserID, CommentContent } = req.body;
    
    // Kiểm tra dữ liệu đầu vào bằng commentSchema
    const { error } = commentSchema.validate({ ProductID, UserID, CommentContent }, { abortEarly: false });
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessages });
    }

    const newComment = new Comment({ ProductID, UserID, CommentContent });
    const savedComment = await newComment.save();
    
    return res.status(201).json(savedComment);
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { createComment };
