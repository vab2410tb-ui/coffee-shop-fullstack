import Order from '../models/order.modal.js'; 
import generateOrderId from '../../utils/generateOrderId.js';
import mongoose from 'mongoose';
import Product from '../models/products.model.js';

export const sendMailInternal = async (userEmail, orderInfo) => {
  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_PUBLIC_KEY,
        accessToken: process.env.EMAILJS_PRIVATE_KEY,
        template_params: {
          to_email: userEmail,
          full_name: orderInfo.fullName,
          order_id: orderInfo.orderId,
          total_price: Number(orderInfo.totalPrice).toLocaleString(),
          address: orderInfo.address
        }
      })
    });

    if (response.ok) {
      console.log(`EmailJS sent successfully to: ${userEmail}`);
    } else {
      const errorText = await response.text();
      console.error("EMAILJS API ERROR: ", errorText);
    }
  } catch (error) {
    console.error("EMAIL SENDING ERROR: ", error.message);
  }
};

// ------------- [TẠO ĐƠN HÀNG] ------------- 
export const createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { orderItems, shippingInfo, paymentMethod, totalPrice, userId } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'Your cart is empty. Unable to create the order.' });
    }

    const { fullName, email, phone, address } = shippingInfo || {};
    if (!fullName || !email || !phone || !address) {
      return res.status(400).json({ 
        message: 'Please provide complete shipping information (Full Name, Email, Phone Number, Address).' 
      });
    }

    for (const item of orderItems) {
      const product = await Product.findById(item.product).session(session);

      if (!product) {
        throw new Error(`Product not found. (ID: ${item.product})`);
      }

      if (!product.variants || product.variants.length === 0) {
        throw new Error(`Product "${product.name}" is misconfigured: no inventory data found (variants are empty).`);
      }

      let variantIndex = -1;

      if (item.color) {
        variantIndex = product.variants.findIndex(v => v.color === item.color);
        if (variantIndex === -1) {
          throw new Error(`Product "${product.name}" has no color variants..`);
        }
      } 
      else {
        if (product.variants.length === 1) {
          variantIndex = 0;
        } else {
          throw new Error(`Product "${product.name}" has multiple color options. Please select a color.`);
        }
      }

      const selectedVariant = product.variants[variantIndex];
      
      if (selectedVariant.stock < item.quantity) {
        return res.status(400).json({
          message: "Quantity exceeds available stock.",
          maxAllowed: selectedVariant.stock
        });
      }

      await Product.updateOne(
        { _id: product._id },
        { $inc: { [`variants.${variantIndex}.stock`]: -item.quantity } },
        { session }
      );
    }
    
    const orderId = generateOrderId();
    
    const order = new Order({
      orderId: orderId, 
      user: userId || null,       
      shippingInfo: {
        fullName,
        email,
        phone,
        address,
        note: shippingInfo.note || "" 
      },
      orderItems,
      paymentMethod,
      totalPrice: Number(totalPrice),
    }); 

    const createdOrder = await order.save({ session });

    await session.commitTransaction();
    session.endSession();

    // Gửi mail xác nhận
    await sendMailInternal(email, {
      orderId: orderId, 
      fullName: fullName,
      totalPrice: totalPrice,
      address: address
    });

    return res.status(201).json({
      success: true,
      message: 'Your order has been placed successfully!',
      order: createdOrder
    });

  } catch (error) {
    console.error("Failed to create order.", error); 
    res.status(500).json({
      success: false,
      message: 'A server error occurred while creating the order.',
      error: error.message,
    });
  }
};

// ------------- [LẤY ĐƠN HÀNG TỪ MÃ ĐƠN ĐẶT HÀNG VÀ EMAIL ] ------------- 
export const getOrderByOrderId = async (req, res) => {
  try {
    const { id } = req.params; 
    const { email } = req.params;
    
    const order = await Order.findOne({ orderId: id, 'shippingInfo.email': email }).populate('orderItems.product', 'name image price');
    if (!order) {
      return res.status(404).json({ success: false, message: 'No order found with this ID or email.' });
    }
    
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// ------------- [LẤY DANH SÁCH ĐƠN HÀNG CỦA 1 USER] ------------- 
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params; 
    // Thêm .populate() để lấy name, image, price từ Collection Product
    const orders = await Order.find({ user: userId })
                              .populate('orderItems.product', 'name image price') 
                              .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};