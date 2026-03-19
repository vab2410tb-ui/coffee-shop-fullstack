import express from 'express';

import { requestOTP, verifyOTP, updateUserProfile, getUserProfile } from '../app/controllers/auth.controller.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/request-otp', requestOTP);
router.post('/verify-otp', verifyOTP);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

export default router;
