// src/app/routes/admin/product.route.js
import express from 'express';
const router = express.Router();
import productController from '../../app/controllers/admin/product.controller.js';

router.get('/', productController.index);
router.get('/:id', productController.show);
router.post('/', productController.store);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);

export default router;