import express from 'express';
import { createOrder, getOrderByOrderId, getUserOrders } from '../app/controllers/order.controller.js';

const router = express.Router();

// Route tạo đơn hàng 
router.post('/', createOrder);

// Route lấy 1 đơn hàng theo mã 
// (/api/v1/orders/:id/:email)
router.get('/:id/:email', getOrderByOrderId);

// Route lấy danh sách đơn hàng của User 
router.get('/user/:userId', getUserOrders);

export default router;