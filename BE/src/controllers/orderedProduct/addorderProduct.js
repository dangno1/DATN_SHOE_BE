import OrderedProduct from "../../models/orderedProduct.js";
import validateOrderedProduct from "../../schemas/orderedProduct.js";
import nodemailer from "nodemailer";

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
    html: `      <div className="flex justify-center">
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
        Hi ${email}!!!
      </h2>
      <div className="pt-6">
        <h3 className="text-xl font-normal"> Chúng tôi đã nhận được yêu cầu đặt hàng của bạn, cảm ơn bạn đã tin tưởng và sử dụng dịch vụ.</h3>
        <br />
        <div className="text-lg">Mã OTP của bạn là : <span className="text-xl font-medium font-sans">${confirmationCode}</span></div>
        <br />
        <div className="text-lg"> Lưu ý: Mã OTP sẽ bị mất sau 5 phút.</div>
        <br />
        <h3 className="text-2xl mt-10 font-medium font-sans leading-10">Cảm ơn bạn đã đặt hàng của chúng tôi &#10084; &#10084; &#10084;</h3>
      </div>
    </div>
  </div>`,
  });
}

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
    };

    const orderedProduct = await OrderedProduct.create(orderedProductData);

    const confirmationCode = generateConfirmationCode();

    await sendConfirmationEmail(req.body.userEmail, confirmationCode);
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
