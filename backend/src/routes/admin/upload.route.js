import express from 'express';
import uploadController from '../../app/controllers/admin/upload.controller.js'

const router = express.Router();
router.post ('/upload', uploadController.Upload)

export default router