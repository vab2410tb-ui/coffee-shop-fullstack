import express from 'express';
const router = express.Router();
import siteController from '../app/controllers/site.controller.js';


router.get('/api/products', siteController.home)

export default router;