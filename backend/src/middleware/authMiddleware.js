// File: src/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../app/models/user.modals.js'; 

export const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Cắt lấy đoạn mã Token nằm sau chữ 'Bearer '
            token = req.headers.authorization.split(' ')[1];

            // Dùng JWT_SECRET trong .env để giải mã
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Tìm user trong DB dựa vào cái ID vừa giải mã được, và gán vào req.user
            req.user = await User.findById(decoded.id).select('-otp -otpExpires'); // Dùng .select('-otp -otpExpires') để bảo mật, không trả về các trường chứa mã OTP

            next(); // cotinue controller
        } catch (error) {
            res.status(401).json({ message: 'Invalid or expired token, please log in again!' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Access denied, token not found!' });
    }
};