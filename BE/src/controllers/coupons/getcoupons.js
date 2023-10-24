import Coupons from "../../models/coupons.js";

export const getAll = async (req, res) => {
  const options = {
    limit: 1000000000000,
    sort: {
      updatedAt: -1,
      createdAt: -1,
    },
  };
  try {
    const { docs: coupons } = await Coupons.paginate({}, options);
    if (coupons.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Không có mã giảm giá nào!",
      });
    }
    return res.status(200).json(coupons);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const get = async (req, res) => {
  try {
    const coupons = await Coupons.findById(req.params.id).populate("products");

    if (!coupons) {
      return res.status(404).json({
        success: false,
        message: "Không có mã giảm giá nào!",
      });
    }

    return res.status(201).json(coupons);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
