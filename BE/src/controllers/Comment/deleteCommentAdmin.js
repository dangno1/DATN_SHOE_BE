import Comment from "../../models/comment";
import mongoose from "mongoose";
// Thêm đoạn mã sau vào đầu file hoặc file khác để thiết lập nodemailer
import nodemailer from "nodemailer";
import User from "../../models/user";
import Product from "../../models/product";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "truongduy97a@gmail.com",
    pass: "qejcmqsanvaoircm",
  },
});

export const sendEmail = (to, subject, html) => {
  const mailOptions = {
    from: "octobers966@gmail.com",
    to,
    subject,
    html,
  };

  return transporter.sendMail(mailOptions);
};

export const deleteCommentAdmin = async (req, res) => {
  try {
    const commentID = req.params.id;

    const comment = await Comment.findById(commentID);

    console.log("Comment:", comment);

    // Kiểm tra xem comment có tồn tại hay không
    if (!comment) {
      return res.status(404).json({
        error: true,
        message: "Comment không tồn tại!",
      });
    }
    // Lấy thông tin người dùng
    const user = await User.findById(comment.UserID);
    console.log("User:", user);
    // Kiểm tra xem người dùng có tồn tại và có thuộc tính email hay không
    if (!user || !user.email) {
      console.error("Địa chỉ email không xác định:", user);
      return res.status(400).json({
        error: true,
        message: "Không thể xác định địa chỉ email người dùng!",
      });
    }
    // Lấy thông tin sản phẩm
    const product = await Product.findById(comment.ProductID);
    console.log("Product:", product);
    // Kiểm tra xem sản phẩm có tồn tại và có thuộc tính name hay không
    if (!product || !product.name) {
      console.error("Tên sản phẩm không xác định:", product);
      return res.status(400).json({
        error: true,
        message: "Không thể xác định tên sản phẩm!",
      });
    }
    const userEmail = user.email;
    const productName = product.name;
    const ProductComment = comment.CommentContent;

    await sendEmail(
      userEmail,
      "Thông báo: Bình luận của bạn đã bị xóa",
      `
    <div className="flex justify-center">
      <div style="padding: 1.5rem; border-width: 1px; width: 40%;">
        <div style="display: flex;align-items: center; gap: 11rem;">
          <img
            src="https://cdn-icons-png.flaticon.com/256/731/731962.png"
            alt=""
            className="w-16 h-16"
          />
          <h2 className="text-3xl font-semibold font-sans leading-10">
            ADIDAS STORE
          </h2>
        </div>
        <hr className="my-2" />
        <h2 className="text-2xl mt-10 font-medium font-sans leading-10">
          Hi ${userEmail}!!!
        </h2>
        <div className="pt-6">
          <h3 className="text-xl font-normal"> Chúng tôi đã thực hiện xóa bình luận của bạn đối với sản phẩm ${productName}</h3>
          <br />
          <div className="text-lg font-normal"">Nội dung bình luận của bạn: ${ProductComment}</div>
          <br />
          <div className="text-lg font-normal"">Vì nội dung bình luận của bạn vi phạm một số chính sách của bên tôi hoặc chứa nội dung không phù hợp </div>
          <br/>
          <div className="text-lg font-normal"">Cảm ơn bạn đã mua sản phẩm</div>
        </div>
      </div>
    </div>
  `
    );

    await Comment.findByIdAndDelete(commentID);

    return res.status(200).json({
      success: true,
      message: "Comment đã được xóa thành công và email thông báo đã được gửi!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

export const deleteCommentsAdmin = async (req, res) => {
  try {
    const commentIDs = req.body.commentIDs;

    if (!commentIDs || !Array.isArray(commentIDs) || commentIDs.length === 0) {
      return res.status(400).json({
        error: true,
        message: "Không có comment nào để xóa!",
      });
    }

    const isValidObjectIdArray = commentIDs.every((commentID) =>
      mongoose.Types.ObjectId.isValid(commentID)
    );

    if (!isValidObjectIdArray) {
      return res.status(400).json({
        error: true,
        message: "Một hoặc nhiều commentID không hợp lệ!",
      });
    }

    const existingComments = await Comment.find({ _id: { $in: commentIDs } });

    if (existingComments.length !== commentIDs.length) {
      return res.status(400).json({
        error: true,
        message: "Một hoặc nhiều commentID không tồn tại trong cơ sở dữ liệu!",
      });
    }

    // Xóa nhiều comments
    await Comment.deleteMany({ _id: { $in: commentIDs } });

    // Gửi email thông báo cho từng comment
    for (const comment of existingComments) {
      try {
        const user = await User.findById(comment.UserID);
        const product = await Product.findById(comment.ProductID);

        // Kiểm tra xem người dùng và sản phẩm có tồn tại và có thuộc tính email, name hay không
        if (!user || !user.email || !product || !product.name) {
          console.error("Dữ liệu không hợp lệ:", user, product);
          continue; // Bỏ qua nếu dữ liệu không hợp lệ
        }

        const userEmail = user.email;
        const productName = product.name;
        const ProductComment = comment.CommentContent;

        await sendEmail(
          userEmail,
          "Thông báo: Bình luận của bạn đã bị xóa",
          `
    <div className="flex justify-center">
      <div style="padding: 1.5rem; border-width: 1px; width: 40%;">
        <div style="display: flex;align-items: center; gap: 11rem;">
          <img
            src="https://cdn-icons-png.flaticon.com/256/731/731962.png"
            alt=""
            className="w-16 h-16"
          />
          <h2 className="text-3xl font-semibold font-sans leading-10">
            ADIDAS STORE
          </h2>
        </div>
        <hr className="my-2" />
        <h2 className="text-2xl mt-10 font-medium font-sans leading-10">
          Hi ${userEmail}!!!
        </h2>
        <div className="pt-6">
          <h3 className="text-xl font-normal"> Chúng tôi đã thực hiện xóa bình luận của bạn đối với sản phẩm ${productName}</h3>
          <br />
          <div className="text-lg font-normal"">Nội dung bình luận của bạn: ${ProductComment}</div>
          <br />
          <div className="text-lg font-normal"">Vì nội dung bình luận của bạn vi phạm một số chính sách của bên tôi hoặc chứa nội dung không phù hợp </div>
          <br/>
          <div className="text-lg font-normal"">Cảm ơn bạn đã mua sản phẩm</div>
        </div>
      </div>
    </div>
  `
        );
      } catch (emailError) {
        console.error("Lỗi khi gửi email:", emailError);
      }
    }

    return res.status(200).json({
      success: true,
      message:
        "Các comment đã được xóa thành công và email thông báo đã được gửi!",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};
