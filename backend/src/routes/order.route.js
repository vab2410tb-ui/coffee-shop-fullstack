import express from 'express';
import { createOrder, getOrderByOrderId, getUserOrders } from '../app/controllers/order.controller.js';

const router = express.Router();

// Route tạo đơn hàng 

// Route lấy 1 đơn hàng theo mã 
// (/api/v1/orders/:id/:email)
router.get('/user/:userId', getUserOrders);
router.get('/:id/:email', getOrderByOrderId);
router.post('/', createOrder);

// Route lấy danh sách đơn hàng của User 

export default router;