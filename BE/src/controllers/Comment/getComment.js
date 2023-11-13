import Comment from '../../models/comment';
const getComments = async (req, res) => {
    try {
      const comments = await Comment.find().populate("ProductID").populate("UserID");;
      return res.status(200).json(comments);
    } catch (err) {
      return res.status(500).json({ error: 'Hệ thống bị lỗi !!' });
    }
  };
  
  export { getComments };
  