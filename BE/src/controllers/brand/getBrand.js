import Brand from "../../models/brand.js";

export const getAll = async (req, res) => {
  const options = {
    limit: 1000000000000,
    sort: {
      updatedAt: -1,
    },
  };
  try {
    const { docs: brand } = await Brand.paginate({}, options);
    if (brand.length === 0) {
      return res.status(200).json(brand);
    }

    return res.status(200).json(brand);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const get = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({
        message: "Thương hiệu không tồn tại",
      });
    }

    return res.status(201).json(brand);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
