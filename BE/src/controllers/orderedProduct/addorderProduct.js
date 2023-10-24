function generateOrderCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let orderCode = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    orderCode += characters.charAt(randomIndex);
  }
  return orderCode;
}

import OrderedProduct from "../../models/orderedProduct.js";
import validateOrderedProduct from "../../schemas/orderedProduct.js";

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
    result.message.push("Thêm OrderedProduct thành công");
    result.data = orderedProduct;
    res.json(result);
  } catch (err) {
    result.success = false;
    result.message.push("Lỗi khi thêm OrderedProduct");
    res.status(500).json(result);
  }
};

export default addOrderedProduct;
