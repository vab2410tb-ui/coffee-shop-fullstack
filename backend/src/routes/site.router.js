import express from 'express';
import siteController from '../app/controllers/site.controller.js';

const router = express.Router();


router.get('/api/products', siteController.home)

export default router;