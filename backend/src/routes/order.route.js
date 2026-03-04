import express from 'express';
import { createOrder, getOrderByOrderId, getUserOrders } from '../app/controllers/order.controller.js';

const router = express.Router();

// Route tạo đơn hàng (Bạn đã làm xong)
router.post('/', createOrder);

// Route lấy 1 đơn hàng theo mã NAB-... (VD: /api/v1/orders/NAB-20240522-A1B2C)
router.get('/:id', getOrderByOrderId);

// Route lấy danh sách đơn hàng của User (VD: /api/v1/orders/user/64a7b...)
router.get('/user/:userId', getUserOrders);

export default router;