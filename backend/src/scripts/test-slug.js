import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../app/models/products.models.js'; 

dotenv.config();

const checkData = async () => {
  try {
    // 1. Kết nối DB
    const dbUri = process.env.MONGO_URI ;
    await mongoose.connect(dbUri);
    console.log(" Đã kết nối DB thành công!");

    // 2. Đếm tổng số sản phẩm
    const count = await Product.countDocuments();
    console.log(` TỔNG CỘNG: Đang có ${count} sản phẩm trong kho.`);

    if (count === 0) {
      console.log(" Cảnh báo: Kho đang rỗng! Bạn đã chạy file seed.js chưa?");
      return;
    }

    // 3. Lấy thử 3 sản phẩm bất kỳ ra xem
    const samples = await Product.find().limit(3);

    console.log("------------------------------------------------");
    console.log("📝 DANH SÁCH MẪU (3 SẢN PHẨM ĐẦU TIÊN):");
    console.log("------------------------------------------------");
    
    samples.forEach(p => {
      console.log(` SKU:   ${p.sku}`);
      console.log(` Tên:   ${p.name}`);
      console.log(` Slug:  ${p.slug}`); // Kiểm tra xem slug có tự tạo ra không
      console.log(` Giá:   ${p.price.toLocaleString('vi-VN')} VND`);
      console.log(` Loại:  ${p.category}`);
      console.log("- - - - - - - - - - - - - - - - - - - -");
    });

  } catch (error) {
    console.error("❌ Lỗi:", error.message);
  } finally {
    // 4. Ngắt kết nối
    await mongoose.disconnect();
    console.log(" Đã đóng kết nối.");
  }
};

checkData();