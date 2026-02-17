import mongoose from 'mongoose';
import slugify from 'slugify';

const productSchema = new mongoose.Schema({
  // Thông tin chung của sản phẩm
  sku: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true,
    uppercase: true 
  },

  slug: { 
    type: String, 
    unique: true, 
    index: true   
  },

  name: { type: String, required: true, trim: true },

  price: { type: Number, required: true },

  quantity: { type: Number, default: 0},

  category: { 
    type: String, 
    required: true, 
    enum: ['espresso-machine', 'grinder-machine', 'coffee-beans', 'accessories']  
  },

  brand: { type: String, default: "La Marzocco" },

  mainImage: { type: String },

  detailImages: [{ type: String }],

  description: { type: String },

  inStock: { type: Boolean, default: true },
  
  techSpecs: {
    // 1. Nhóm dùng chung
    origin: { type: String }, // Xuất xứ 
    dimensions: { type: String },// H-W-D 
    weight: { type: Number },// Trọng lượng 
    voltage: { type: String },// Electrical Specs 
    wattage: { type: String },// Wattage Elements 
    
    // 2. (Espresso Machine)
    material: { type: String },// Material
    amperage: { type: String },// Amperage
    coffeeBoiler: { type: String },// Coffee Boiler 
    steamBoiler: { type: String },// Steam Boiler 
    
    // 3. (Grinder)
    burrs: { type: String },// Burrs 
    hopperCapacity: { type: String },// Hopper Capacity
    productivity: { type: String },// Productivity (g/s)
    grindAdjustment: { type: String },// Grind Adjustment
    grindingSpeed: { type: String },// Grinding Speed
    programmableDose: { type: Boolean }// Programmable Dose (Yes -> true, No -> false)
  },

}, { timestamps: true });

productSchema.pre('save', async function() {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { 
      lower: true, 
      strict: true, 
      locale: 'vi' 
    });
  }
});

export default mongoose.model('Product', productSchema);
