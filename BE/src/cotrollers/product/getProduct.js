import Product from "../../models/product.js";

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
    const { docs: products } = await Product.paginate({}, options);
    if (products.length === 0) {
      return res.status(404).json({
        message: "Không có sản phẩm nào",
      });
    }
    return res.status(201).json(products);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const get = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
