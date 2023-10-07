import Category from "../../models/category.js";

export const getAll = async (req, res) => {
  // Khai báo các biến từ req.query với các giá trị mặc định
  const {
    _page = 1, // Số trang hiển thị, mặc định là 1
    _limit = 10, // Số sản phẩm trên một trang, mặc định là 10
    _sort = "createAt", // Tiêu chí sắp xếp theo ngày tạo, mặc định là createAt
    _order = "asc", // Thứ tự sắp xếp theo ngày tạo, mặc định là tăng dần (asc)
  } = req.query;

  // Khai báo các tùy chọn cho phân trang và sắp xếp sản phẩm
  const options = {
    page: _page, // Sử dụng biến _page làm số trang hiển thị
    limit: _limit,
    sort: {
      // Sử dụng biến _dateSort và _dateOrder để sắp xếp theo ngày tạo. Nếu _dateOrder là desc thì sử dụng -1 (giảm dần), nếu không thì sử dụng 1 (tăng dần)
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
