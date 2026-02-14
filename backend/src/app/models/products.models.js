import mongoose from 'mongoose';
import slugify from 'slugify';

const productSchema = new mongoose.Schema({
  // --- THÔNG TIN CHUNG (Cái nào cũng có) ---
  sku: { 
    type: String, 
    required: true, 
    unique: true, // Không được trùng nhau
    trim: true,
    uppercase: true // Tự động viết hoa (ví dụ: mp-01 -> MP-01)
  },

  slug: { 
    type: String, 
    unique: true, // Không trùng lặp đường dẫn
    index: true   // Giúp tìm kiếm nhanh hơn
  },

  name: { type: String, required: true, trim: true },

  price: { type: Number, required: true },

  quantity: { type: Number, default: 0},

  category: { 
    type: String, 
    required: true, 
     enum: ['espresso-machine', 'grinder-machine', 'coffee-beans', 'accessories']  // Chỉ chấp nhận 3 loại này
  },

  brand: { type: String, default: "La Marzocco" },

  mainImage: { type: String },

  detailImages: [{ type: String }],

  description: { type: String },

  inStock: { type: Boolean, default: true },

  // --- THÔNG TIN RIÊNG (Không bắt buộc - required: false) ---
  
  // Dành cho MÁY PHA
  groups: { type: Number }, // Số họng (1, 2, 3)
  boilerType: { type: String }, // Nồi hơi (Kép/Đơn)

  // Dành cho MÁY XAY
  bladeType: { type: String }, // Lưỡi dao (Phẳng/Nón)
  hopperCapacity: { type: String }, // Dung tích phễu (1kg, 1.5kg)

  // Dành cho HẠT CÀ PHÊ
  weight: { type: Number }, // Trọng lượng gói (gram)
  roastLevel: { type: String }, // Độ rang (Light, Medium, Dark)
  flavorProfile: { type: String } // Hương vị (Chocolata, Fruity...)

}, { timestamps: true });

productSchema.pre('save', async function() {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { 
      lower: true, 
      strict: true, 
      locale: 'vi' 
    });
  }
  // Không cần gọi next(), Mongoose tự xử lý xong.
});

export default mongoose.model('Product', productSchema);
