import { Coupons, couponSchema } from '../../schemas/coupons'; // Đảm bảo bạn đã đúng đường dẫn tới file couponsModel

export const createCoupon = async (req, res) => {
  try {
    // Kiểm tra dữ liệu đầu vào với schema sử dụng Joi
    const { error, value } = couponSchema.validate(req.body);
    
    if (error) {
      // Trả về lỗi nếu dữ liệu không hợp lệ
      return res.status(400).json({ error: error.details[0].message });
    }

    // Nếu dữ liệu hợp lệ, tiếp tục tạo phiếu giảm giá
    const { code, quantity, products } = value;
    const coupon = new Coupons({ code, quantity, products });
    const savedCoupon = await coupon.save();
    res.status(201).json({ message: 'Phiếu giảm giá đã được tạo thành công', coupon: savedCoupon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Tạo phiếu giảm giá không thành công' });
  }
};
