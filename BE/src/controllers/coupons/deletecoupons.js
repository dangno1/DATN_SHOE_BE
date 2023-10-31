import { Coupons } from '../../schemas/coupons'; // Đảm bảo bạn đã đúng đường dẫn tới file couponsModel

export const deleteCoupon = async (req, res) => {
  try {
    // Kiểm tra tính hợp lệ của couponId
    const { error, value } = Joi.object({
      couponId: Joi.string().alphanum().length(24).required(),
    }).validate({ couponId: req.params.id });

    if (error) {
      return res.status(400).json({ error: 'Coupon ID không hợp lệ' });
    }
    const couponId = value.couponId;
    const result = await Coupons.findByIdAndDelete(couponId);

    if (!result) {
      return res.status(404).json({ error: 'Coupon not found' });
    }

    res.json({ message: 'Đã xóa phiếu giảm giá thành công' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Xóa phiếu giảm giá không thành công' });
  }
};
