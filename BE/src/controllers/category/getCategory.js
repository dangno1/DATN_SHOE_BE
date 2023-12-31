import Category from "../../models/category.js";

export const getAll = async (req, res) => {
  const options = {
    limit: 1000000000000,
    sort: {
      updatedAt: -1,
    },
  };
  try {
    const { docs: categoryes } = await Category.paginate({}, options);
    if (categoryes.length === 0) {
      return res.status(200).json(categoryes);
    }
    return res.status(200).json(categoryes);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const get = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate({
      path: "products",
      match: { isDelete: { $eq: false } },
    });
    if (!category) {
      return res.status(404).json({
        message: "Danh mục sản phẩm không tồn tại",
      });
    }
    return res.status(201).json(category);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
