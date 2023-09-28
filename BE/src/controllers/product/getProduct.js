import Product from "../../models/product.js";

export const getAll = async (req, res) => {
  const {
    _page = 1,
    _limit = 10,
    _dateSort = "createAt",
    _dateOrder = "asc",
    _priceSort = "price",
    _priceOrder = "asc",
    _amountSoldSort = "amountSold",
    _amountSoldOrder = "asc",
  } = req.query;
  const options = {
    page: _page,
    limit: _limit,
    sort: {
      [_dateSort]: _dateOrder === "desc" ? -1 : 1,
      [_priceSort]: _priceOrder === "desc" ? -1 : 1,
      [_amountSoldSort]: _amountSoldOrder === "desc" ? -1 : 1,
    },
  };
  try {
    const { docs: products } = await Product.paginate({}, options);
    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Không có sản phẩm nào!",
      });
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const get = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Không có sản phẩm nào!",
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
