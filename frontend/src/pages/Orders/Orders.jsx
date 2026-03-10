import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import orderService from '../../service/orderService.js';
import SubNavbar from '../../components/Navbar/SubNavbar.jsx';
import SubFooter from '../../components/Footer/SubFooter.jsx';

const Order = () => {
  // 1. SỬA: Khởi tạo bằng mảng rỗng []
  const [products, setProducts] = useState([]);
  const { userId } = useParams();
  
  // 2. SỬA: Thêm khai báo navigate
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const isAuthenticated = localStorage.getItem('userInfo');
        if (!isAuthenticated) {
          navigate('/');
          return;
        }
        
        if (!isAuthenticated) return; // Đảm bảo có userId mới gọi API
        
        const res = await orderService.getUserOrders(userId);
        if(res.success) {
          setProducts(res.orders);
        }
      } catch(error) {
        console.log("Lỗi fetch data:", error);
      }
    };
    
    fetchOrderData();
  }, [userId, navigate]); // Thêm navigate vào mảng dependency


  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <SubNavbar />
      
      <div style={{ padding: '20px' }}>
        {/* 3. SỬA: Chỉ cần kiểm tra mảng products có phần tử hay không */}
        {products && products.length > 0 ? (
          products.map((item, index) => (
            <div key={index} style={{ borderBottom: '1px solid #000', marginBottom: '10px' }}>
              <h1>Mã đơn hàng: {item.orderId}</h1>
            </div>
          ))
        ) : (
          <p>Đang tải dữ liệu hoặc bạn chưa có đơn hàng nào...</p>
        )}  
      </div>
    
      <SubFooter />
    </div>
  );
};

export default Order;