import Size from "../../models/size.js";

export const getAll = async (req, res) => {
  const {
    _page = 1,
    _limit = 10,
    _dateSort = "createAt",
    _dateOrder = "asc",
    _sizeSort = "value",
    _sizeOrder = "asc",
  } = req.query;
  const options = {
    page: _page,
    limit: _limit,
    sort: {
      [_dateSort]: _dateOrder === "desc" ? -1 : 1,
      [_sizeSort]: _sizeOrder === "desc" ? -1 : 1,
    },
  };
  try {
    const { docs: sizes } = await Size.paginate({}, options);
    if (sizes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Không có size nào!",
      });
    }
    return res.status(200).json(sizes);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const get = async (req, res) => {
  try {
    const size = await Size.findById(req.params.id).populate("products");

    if (!size) {
      return res.status(404).json({
        success: false,
        message: "Không có size nào!",
      });
    }

    return res.status(201).json(size);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
