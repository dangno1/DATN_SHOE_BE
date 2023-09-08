import Comment from '../../models/comment';
const deleteComment = async (req, res) => {
    try {
      const commentId = req.params.id;
  
      if (!commentId) {
        return res.status(400).json({ error: 'Thiếu thông tin bình luận để xóa' });
      }
  
      const deletedComment = await Comment.findByIdAndDelete(commentId);
  
      if (!deletedComment) {
        return res.status(404).json({ error: 'Bình luận không tồn tại' });
      }
  
      return res.status(200).json({ message: 'Bình luận đã bị xóa' });
    } catch (err) {
      return res.status(500).json({ error: 'Hệ thống bị lỗi !!' });
    }
  };
  
  export { deleteComment };
  