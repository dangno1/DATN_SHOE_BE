import Product from "../../models/product.js";

export const getAll = async (req, res) => {
  // Khai báo các biến từ req.query với các giá trị mặc định
  const {
    _page = 1, // Số trang hiển thị, mặc định là 1
    _limit = 10, // Số sản phẩm trên một trang, mặc định là 10
    _dateSort = "createAt", // Tiêu chí sắp xếp theo ngày tạo, mặc định là createAt
    _dateOrder = "asc", // Thứ tự sắp xếp theo ngày tạo, mặc định là tăng dần (asc)
    _priceSort = "price", // Tiêu chí sắp xếp theo giá, mặc định là price
    _priceOrder = "asc", // Thứ tự sắp xếp theo giá, mặc định là tăng dần (asc)
    _amountSoldSort = "amountSold", // Tiêu chí sắp xếp theo số lượng bán, mặc định là amountSold
    _amountSoldOrder = "asc", // Thứ tự sắp xếp theo số lượng bán, mặc định là tăng dần (asc)
  } = req.query;

  // Khai báo các tùy chọn cho phân trang và sắp xếp sản phẩm
  const options = {
    page: _page, // Sử dụng biến _page làm số trang hiển thị
    limit: _limit, 
    sort: {
      // Sử dụng biến _dateSort và _dateOrder để sắp xếp theo ngày tạo. Nếu _dateOrder là desc thì sử dụng -1 (giảm dần), nếu không thì sử dụng 1 (tăng dần)
      [_dateSort]: _dateOrder === "desc" ? -1 : 1,
      [_priceSort]: _priceOrder === "desc" ? -1 : 1,
      [_amountSoldSort]: _amountSoldOrder === "desc" ? -1 : 1,
    },
  };

  try {
    const { docs: products } = await Product.paginate({}, options); // Hiển thị tất cả product

    // Thông báo lỗi không tìm thấy product
    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Không có sản phẩm nào!",
      });
    }
    return res.status(200).json(products); // Trả về kết quả tất cả product
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const get = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Hiển thị 1 sản phẩm bằng id

    // Thông báo lỗi không tìm thấy product
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Không có sản phẩm nào!",
      });
    }

    return res.status(200).json(product); // Trả về kết quả 1 product
  } catch (error) {
    // Thông báo khi server lỗi
    return res.status(500).json({
      message: error,
    });
  }
};
