import express from 'express';
import multer from 'multer';

const router = express.Router();


import uploadController from '../../app/controllers/admin/upload.controller.js'

router.post ('/upload', uploadController.Upload)

export default router