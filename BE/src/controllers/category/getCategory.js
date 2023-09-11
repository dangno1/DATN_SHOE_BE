import Category from "../../models/category.js";

export const getAll = async (req, res) => {
  const {
    _page = 1,
    _limit = 10,
    _sort = "createAt",
    _order = "asc",
  } = req.query;
  const options = {
    page: _page,
    limit: _limit,
    sort: {
      [_sort]: _order === "desc" ? -1 : 1,
    },
  };
  try {
    const { docs: categoryes } = await Category.paginate({}, options);
    if (categoryes.length === 0) {
      return res.status(404).json({
        message: "Danh mục sản phẩm không tồn tại",
      });
    }
    return res.status(201).json(categoryes);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
export const get = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      "products"
    );
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
