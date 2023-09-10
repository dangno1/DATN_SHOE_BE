import express from 'express';
import {createOrder} from '../controllers/Order/createOrder'
import {getOrderDetails} from '../controllers/Order/orderDetails'
import {cancelOrder} from '../controllers/Order/cancelOrder'
import {getAllOrders} from '../controllers/Order/allOrder'
const router = express.Router();

// Định nghĩa các tuyến cho đối tượng đơn hàng
router.post('/orders', createOrder);
router.get('/orders/:id', getOrderDetails);
router.delete('/orders/cancel/:orderId', cancelOrder);
router.get('/orders', getAllOrders);

export default router;
