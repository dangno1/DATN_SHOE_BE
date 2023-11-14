import comment from "../../models/comment";
export const getcommentID = async (req, res) => {
    try {
        const commentID = await comment.findById(req.params.id).populate("ProductID").populate("UserID");
        if (!commentID) {
            return res.status(404).json({
                error: true,
                message: "Không có dữ liệu!",
            });
        }

        return res.status(200).json({
            data: commentID,
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message,
        });
    }
};