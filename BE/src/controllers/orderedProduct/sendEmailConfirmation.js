import nodemailer from "nodemailer";

const sendEmailConfirmation = async (req, res) => {
  const { userEmail, status } = req.body; 

  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "octobers966@gmail.com",
      pass: "cxryqviwkhsiehwu",
    },
  });

  const mailOptions = {
    from: 'dangne2310@gmail.com',
    to: userEmail,
    subject: 'Xác nhận đơn hàng',
    html: `<div style="display: flex; justify-content: center; margin-top: 150px; margin-left: 30%; margin-bottom: 150px">
    <div style="    padding: 1.5rem;
    border-width: 1px;
    width: 40%;
    background-color: whitesmoke;
    border-radius: 19px;">
      <div style="display: flex;align-items: center; gap: 9rem;">
        <img src="https://cdn-icons-png.flaticon.com/256/731/731962.png" alt="" style="width: 100px; height: 100px;" />
        <h2 style="font-size: 30px;
        letter-spacing: 3px;
        font-weight: 900;">
          ADIDAS STORE
        </h2>
      </div>
      <hr />
      <div>
        <h3> Chúng tôi đã nhận được yêu cầu đặt hàng của bạn, cảm ơn bạn đã tin tưởng và sử
          dụng dịch vụ.</h3>
        <br />
        <div>Trạng Thái </div>
        <div style="display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 70px;
        font-size: 25px;
        font-weight: 600;">${status}</div>
        <br />
        <div style="margin-top: 70px;"> Lưu ý: Không Trả Lời Mail Này.</div>
        <br />
        <h3>Cảm ơn bạn đã đặt hàng của chúng tôi &#10084;
          &#10084; &#10084;</h3>
      </div>
    </div>
  </div>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('successfully');
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default sendEmailConfirmation;