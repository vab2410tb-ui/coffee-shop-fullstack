import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },

  shippingInfo: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    note: { type: String, default: "" } 
  },

  orderItems: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      color: { type: String  },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    }
  ],

  paymentMethod: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  
  status: { type: String, default: 'Pending' } // Pending, Processing, Shipped, Delivered
}, { 
  timestamps: true 
});

const Order = mongoose.model('Order', orderSchema);
export default Order;