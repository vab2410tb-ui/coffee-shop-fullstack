import express from 'express';
const router = express.Router();
import shopController from '../app/controllers/shop.controller.js';

router.get('/', shopController.shop);
router.get('/:slug', shopController.getDetail);
// router.get('/:sku', shopController.getProductBySku);

export default router;