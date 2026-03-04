import Order from '../models/order.modal.js'; // Kiểm tra lại tên file là model hay modal nhé
import generateOrderId from '../../utils/generateOrderId.js';

export const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingInfo, paymentMethod, totalPrice, userId } = req.body;

    //  Kiểm tra giỏ hàng
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'Giỏ hàng đang trống, không thể tạo đơn hàng' });
    }

    //  Kiểm tra thông tin giao hàng 
    const { fullName, email, phone, address } = shippingInfo || {};
    if (!fullName || !email || !phone || !address) {
      return res.status(400).json({ 
        message: 'Vui lòng cung cấp đầy đủ thông tin giao hàng (Tên, Email, SĐT, Địa chỉ)' 
      });
    }

    //  Tạo instance mới từ Model
    const order = new Order({
      orderId: generateOrderId(), 
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

    // 4. Lưu vào Database
    const createdOrder = await order.save();

    // 5. Trả về kết quả thành công
    res.status(201).json({
      success: true,
      message: 'Đơn hàng đã được tạo thành công',
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

//  lấy đơn hàng dựa vào Mã đơn (Cho trang Track Order của Guest)
export const getOrderByOrderId = async (req, res) => {
  try {
    const { id } = req.params; 
    
    // Tìm đơn hàng theo orderId và populate thông tin sản phẩm
    const order = await Order.findOne({ orderId: id }).populate('orderItems.product', 'name image price');
    if (!order) {
      return res.status(404).json({ success: false, message: 'No order found with this ID.' });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

//  lấy DANH SÁCH đơn hàng của 1 User (Cho trang Profile của Member)
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params; 

    // Tìm tất cả đơn hàng có trường user khớp với userId này, sắp xếp ngày mới nhất lên đầu
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};