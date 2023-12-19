import Color from "../../models/color.js";

export const getAll = async (req, res) => {
  const options = {
    limit: 1000000000000,
    sort: {
      updatedAt: -1,
      createdAt: -1,
    },
  };
  try {
    const { docs: colors } = await Color.paginate({}, options);
    if (colors.length === 0) {
      return res.status(200).json(colors);
    }
    return res.status(201).json(colors);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
export const get = async (req, res) => {
  try {
    const color = await Color.findById(req.params.id).populate("products");

    if (!color) {
      return res.status(404).json({
        success: false,
        message: "Không có color nào!",
      });
    }

    return res.status(200).json(color);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
