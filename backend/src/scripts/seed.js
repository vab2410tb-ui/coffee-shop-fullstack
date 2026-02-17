import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../app/models/products.models.js'; // Nhớ có đuôi .js
import products from '../data/products.js'; // Nhớ có đuôi .js

// 1. Load biến môi trường
dotenv.config();

const seedData = async () => {
  try {
    // 2. Kiểm tra kết nối
    const dbUri = process.env.MONGO_URI;
    if (!dbUri) {
      throw new Error("Không tìm thấy MONGODB_URI trong file .env");
    }

    console.log("Đang kết nối MongoDB...");
    await mongoose.connect(dbUri);
    console.log("Kết nối thành công!");

    // 3. Xóa dữ liệu cũ (để tránh trùng lặp)
    console.log("Đang xóa dữ liệu cũ");
    await Product.deleteMany({});
    
    // 4. Thêm dữ liệu mới
    console.log(`Đang chuẩn bị thêm ${products.length} sản phẩm...`);
    
    // Dùng create() thay vì insertMany() để kích hoạt hook tạo slug
 
    await Product.create(products);

    console.log("------------------------------------------------");
    console.log(` THÀNH CÔNG! Đã thêm ${products.length} sản phẩm.`);
    console.log("------------------------------------------------");

  } catch (error) {
    console.error(" LỖI:", error.message);
  } finally {
    // 5. Ngắt kết nối
    await mongoose.disconnect();
    console.log(" Đã đóng kết nối.");
    process.exit();
  }
};

seedData();