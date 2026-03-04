import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, default: '' },       
    phone: { type: String, default: '' },
    address: { type: String, default: '' },   
    otp: { type: String },
    otpExpires: { type: Date },
    isAdmin: { type: Boolean, default: false }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;