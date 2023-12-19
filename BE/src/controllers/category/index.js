// import tất cả các hàm vào 1 file
import { getAll, get } from "./getCategory.js";
import { create } from "./addCategory.js";
import { update } from "./updateCategory.js";
import { remove } from "./deleteCategory.js";

export { get, getAll, create, remove, update }; // export ra tất cả các hàm để dùng
