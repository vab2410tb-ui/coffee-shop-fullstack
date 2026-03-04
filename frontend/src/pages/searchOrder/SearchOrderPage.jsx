import React, { useState } from 'react';
import orderService from '../../service/orderService.js'

const SearchOrder = () => {
    const [orderCode, setOrderCode] = useState('');
    const [orderDetail, setOrderDetail] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');
        setOrderDetail(null);

        try {
            // Bạn cần một API: GET /api/orders/track/:id
           const response = await orderService.getOrderByID(orderCode);
        
        // Vì Service trả về response.data, và trong đó có trường 'order'
        if (response.success && response.order) {
            setOrderDetail(response.order); // Lưu object 'order' vào state
        } else {
            setError('Không tìm thấy đơn hàng với mã này.');
        }
    } catch (err) {
        setError(typeof err === 'string' ? err : (err.message || 'Có lỗi xảy ra'));
        }
    };

    return (
       <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
    <h2>Tra cứu đơn hàng của bạn</h2>
    <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
            type="text" 
            placeholder="Nhập mã NAB-..." 
            value={orderCode}
            onChange={(e) => setOrderCode(e.target.value)}
            style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#e44d26', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Tìm kiếm
        </button>
    </form>

    {error && <p style={{ color: 'red' }}>{error}</p>}

    {orderDetail && (
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
            <h3>Thông tin đơn hàng: {orderDetail.orderId}</h3>
            <p>Trạng thái: <strong>{orderDetail.status}</strong></p>
            <p>Tổng tiền: {orderDetail.totalPrice?.toLocaleString()}đ</p>
            <hr />
            <h4>Sản phẩm đã đặt:</h4>
            {/* Sửa từ .items thành .orderItems để khớp với Model order.modal.js */}
            {orderDetail.orderItems && orderDetail.orderItems.map((item, index) => (
                <div key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                    <span>{item.name} x <strong>{item.quantity}</strong></span>
                </div>
            ))}
        </div>
    )}
</div>
    );
};

export default SearchOrder;