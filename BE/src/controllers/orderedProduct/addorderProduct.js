import OrderedProduct from "../../models/orderedProduct.js";
import validateOrderedProduct from "../../schemas/orderedProduct.js";
import nodemailer from "nodemailer";
import moment from "moment";

function generateOrderCode(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let orderCode = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    orderCode += characters.charAt(randomIndex);
  }
  return orderCode;
}

function generateConfirmationCode() {
  const min = 10000;
  const max = 99999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "octobers966@gmail.com",
    pass: "cxryqviwkhsiehwu",
  },
});

async function sendConfirmationEmail(email, confirmationCode) {
  const emailOptions = await transporter.sendMail({
    from: "octobers966@gmail.com",
    to: email,
    subject: "Xác nhận đơn hàng của bạn",
    text: `Mã xác nhận đơn hàng của bạn: ${confirmationCode}`,
    html: `  <div style="display: flex; justify-content: center; margin-top: 150px; margin-left: 30%; margin-bottom: 150px">
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
        <div>Mã OTP của bạn là</div>
        <div style="display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 70px;
        font-size: 35px;
        letter-spacing: 31px;
        font-weight: 600;">${confirmationCode}</div>
        <br />
        <div style="margin-top: 70px;"> Lưu ý: Mã OTP sẽ bị mất sau 5 phút.</div>
        <br />
        <h3>Cảm ơn bạn đã đặt hàng của chúng tôi &#10084;
          &#10084; &#10084;</h3>
      </div>
    </div>
  </div>`,
  });
}
const confirmationCode = generateConfirmationCode();
const timer = moment().format("YYYYMMDDHHmmss");
const addOrderedProduct = async (req, res) => {
  const result = {
    success: true,
    message: [],
    data: null,
  };

  const validationErrors = validateOrderedProduct(req.body);

  if (validationErrors.length > 0) {
    result.success = false;
    result.message = validationErrors;
    return res.status(400).json(result);
  }

  try {
    let orderCode;
    let isDuplicate = true;

    while (isDuplicate) {
      orderCode = generateOrderCode(6);
      const existingProduct = await OrderedProduct.findOne({ orderCode });
      isDuplicate = existingProduct !== null;
    }

    const orderedProductData = {
      ...req.body,
      orderCode,
      otp: confirmationCode,
      timer,
    };

    const orderedProduct = await OrderedProduct.create(orderedProductData);

    await sendConfirmationEmail(req.body.userEmail, confirmationCode);
    console.log(confirmationCode);
    result.message.push("Thêm OrderedProduct thành công");
    result.data = orderedProduct;
    res.json(result);
  } catch (err) {
    console.log(err);
    result.success = false;
    result.message.push("Lỗi khi thêm OrderedProduct");
    res.status(500).json(result);
  }
};

export default addOrderedProduct;
