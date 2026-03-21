import express from 'express';
import { createOrder, getOrderByOrderId, getUserOrders } from '../app/controllers/order.controller.js';

const router = express.Router();




// Route lấy 1 đơn hàng theo mã 
router.get('/user/:userId', getUserOrders);
// (/api/v1/orders/:id/:email)
router.get('/:id/:email', getOrderByOrderId);
// Route tạo đơn hàng 
router.post('/', createOrder);


export default router;