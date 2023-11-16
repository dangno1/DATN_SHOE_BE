import qs from "qs";
import crypto from "crypto";
import moment from "moment";

const checkout = async (req, res) => {
  let products = req.body.products;
  let totalValue = 0;
  for (let product of products) {
    totalValue += product.productPrice;
  }
  console.log(products);

  process.env.TZ = "Asia/Ho_Chi_Minh";
  let tmnCode = "FDJYV5RZ";
  let secretKey = "JOKURZGARYTLRNJNCGBAZTEMYWPDQMWG";
  let vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
  let returnUrl = encodeURIComponent("http://localhost:5173/oder&history");

  let date = new Date();
  let createDate = moment(date).format("YYYYMMDDHHmmss");

  let orderId = moment(date).format("DDHHmmss");
  let amount = totalValue;
  let bankCode = "NCB";

  let locale = req.body.language;
  if (locale === null || locale === "") {
    locale = "vn";
  }
  let currCode = "VND";
  let vnp_Params = {};
  vnp_Params["vnp_Amount"] = amount * 100;
  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_CreateDate"] = +createDate;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_IpAddr"] = "127.0.0.1";
  vnp_Params["vnp_Locale"] = "vn";
  vnp_Params["vnp_OrderInfo"] = "thanhtoandonhang";
  vnp_Params["vnp_OrderType"] = "other";
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_TmnCode"] = tmnCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_Version"] = "2.1.0";

  let querystring = qs;
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

  console.log(vnpUrl);
  return res.status(200).json({
    success: true,
    data: vnpUrl,
  });
};

export default checkout;
