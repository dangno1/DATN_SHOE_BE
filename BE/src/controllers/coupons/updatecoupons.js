import { Coupons, couponSchema } from '../../schemas/coupons'; // Đảm bảo bạn đã đúng đường dẫn tới file couponsModel

export const updateCoupon = async (req, res) => {
  try {
    // Kiểm tra tính hợp lệ của dữ liệu đầu vào với schema sử dụng Joi
    const { error, value } = couponSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updatedCouponData = value;
    const couponId = req.params.id;

    // Tìm và cập nhật phiếu giảm giá bằng ID
    const updatedCoupon = await Coupons.findByIdAndUpdate(couponId, updatedCouponData, { new: true });

    if (!updatedCoupon) {
      return res.status(404).json({ error: 'Không tìm thấy phiếu giảm giá' });
    }

    res.json(updatedCoupon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Không thể cập nhật phiếu giảm giá' });
  }
};
