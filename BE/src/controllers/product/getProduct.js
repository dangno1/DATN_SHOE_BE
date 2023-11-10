import Product from "../../models/product.js";

export const getAll = async (req, res) => {
  const { trashcan = false } = req.query;
  const options = {
    limit: 1000000000000,
    sort: {
      updatedAt: -1,
      createdAt: -1,
    },
  };

  try {
    const { docs: products } = await Product.paginate(
      { isDelete: trashcan },
      options
    );
    if (products.length === 0) {
      return res.status(200).json(products);
    }

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

export const get = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        error: true,
        message: "Không có dữ liệu!",
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};
