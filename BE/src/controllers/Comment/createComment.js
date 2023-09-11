import commentSchema from '../../schemas/validateComment.js'; 
import Comment from '../../models/comment.js';

const createComment = async (req, res) => {
  try {
    const { UserEmail, UserName, CommentContent } = req.body;


    const { error } = commentSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessages });
    }


    const newComment = new Comment({ UserEmail, UserName, CommentContent });
    const savedComment = await newComment.save();

    return res.status(201).json(savedComment);
  } catch (err) {
    return res.status(500).json({ error: 'Hệ thống bị lỗi !!' });
  }
};

export { createComment };
