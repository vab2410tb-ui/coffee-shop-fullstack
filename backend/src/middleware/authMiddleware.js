import jwt from 'jsonwebtoken';
import User from '../app/models/user.modal.js'; 

export const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Cắt lấy đoạn mã Token nằm sau chữ 'Bearer '
            token = req.headers.authorization.split(' ')[1];

            // Dùng JWT_SECRET trong .env để giải mã
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-otp -otpExpires');

            next(); // cotinue controller
        } catch (error) {
            res.status(401).json({ message: 'Invalid or expired token, please log in again!' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Access denied, token not found!' });
    }
};