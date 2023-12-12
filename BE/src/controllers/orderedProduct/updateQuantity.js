import Product from "../../models/product.js";
import { Types } from 'mongoose';

const updateQuantity = async (req, res) => {
  const { productId, variantsId, newQuantity } = req.body;

  try {
    const { ObjectId } = Types;

    const filter = {
      _id: new ObjectId(productId),
      "variants._id": new ObjectId(variantsId),
    };

    const update = {
      $set: { "variants.$.quantity": newQuantity },
    };

    const result = await Product.updateOne(filter, update);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error updating quantity:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

export default updateQuantity;
