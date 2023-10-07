import Coupons from "../../models/coupons.js";

export const getAll = async (req, res) => {
  const {
    _page = 1,
    _limit = 10,
    _dateSort = "createAt",
    _dateOrder = "asc",
    _couponsSort = "value",
    _couponsOrder = "asc",
  } = req.query;
  const options = {
    page: _page,
    limit: _limit,
    sort: {
      [_dateSort]: _dateOrder === "desc" ? -1 : 1,
      [_couponsSort]: _couponsOrder === "desc" ? -1 : 1,
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
