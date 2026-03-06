import User from '../models/user.modal.js';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Cấu hình Nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    family: 4 
  });

    //Yêu cầu gửi mã OTP
export const requestOTP = async (req, res) => {
    try {
        const { email } = req.body;

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // hash OTP
        const salt = await bcrypt.genSalt(10);
        const hashedOTP = await bcrypt.hash(otp, salt);

        const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

        let user = await User.findOne({ email });

        if (!user) {
            user = new User({ email, otp: hashedOTP, otpExpires });
        } else {
            user.otp = hashedOTP;
            user.otpExpires = otpExpires;
        }

        await user.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Login verification code',
            html: `<h3>Your OTP code is: <b>${otp}</b></h3><p>This code will expire in 5 minutes.</p>`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'The OTP has been sent to your email!' });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Xác thực mã OTP và cấp Token
export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email: email });

        // Kiểm tra user có tồn tại và mã OTP có khớp không
        if (!user || user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP code' });
        }

        // Kiểm tra thời gian hết hạn
        if (user.otpExpires < new Date()) {
            return res.status(400).json({ message: 'The OTP has expired, please request a new code' });
        }

        // Xác thực thành công: Xóa mã OTP đi để bảo mật
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        // Tạo JWT Token cho user
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            address: user.address,
            phone: user.phone,
            isAdmin: user.isAdmin,
            token
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            res.status(200).json({
                _id: user._id,
                name: user.name,       
                email: user.email,     
                phone: user.phone,     
                address: user.address, 
                role: user.role,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            // Cập nhật Tên, SĐT, Địa chỉ 
            user.name = req.body.name || user.name;
            user.phone = req.body.phone || user.phone;
            user.address = req.body.address || user.address;
            
            // Xử lý riêng cho Email (tránh trùng lặp email với người khác)
            if (req.body.email && req.body.email !== user.email) {
                const emailExists = await User.findOne({ email: req.body.email });
                if (emailExists) {
                    return res.status(400).json({ message: 'This email is already used by another account!' });
                }
                user.email = req.body.email;
            }

            // Lưu thông tin mới vào DB
            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                address: updatedUser.address,
                role: updatedUser.role,
                token: req.headers.authorization.split(' ')[1], 
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};