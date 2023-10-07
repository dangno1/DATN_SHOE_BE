// import tất cả các hàm vào 1 file
import { getAll, get } from "./getProduct.js";
import { create } from "./addProduct.js";
import { update } from "./updateProduct.js";
import { remove } from "./deleteProduct.js";

export { get, getAll, create, remove, update }; // export ra tất cả các hàm để dùng
