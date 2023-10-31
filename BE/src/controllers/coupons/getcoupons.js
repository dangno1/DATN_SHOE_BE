import { Coupons } from '../../schemas/coupons'; // Đảm bảo bạn đã đúng đường dẫn tới file couponsModel

export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupons.find().populate('products.product');
    res.json(coupons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Không thể truy xuất phiếu giảm giá' });
  }
};

export const getCouponById = async (req, res) => {
  try {
    // Kiểm tra tính hợp lệ của couponId
    const { error, value } = Joi.object({
      couponId: Joi.string().alphanum().length(24).required(),
    }).validate({ couponId: req.params.id });

    if (error) {
      return res.status(400).json({ error: 'Coupon ID không hợp lệ' });
    }
    const couponId = value.couponId;
    const coupon = await Coupons.findById(couponId).populate('products.product');

    if (!coupon) {
      return res.status(404).json({ error: 'Không tìm thấy phiếu giảm giá' });
    }
    
    res.json(coupon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Không thể truy xuất phiếu giảm giá theo ID' });
  }
};
