// src/pages/shop/CategoryPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import productService from '../../service/ProductService.js'; // Import service vừa tạo
// import styles from './CategoryPage.module.scss';

const CategoryPage = () => {
    const { slug } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const formatTitle = (text) => text.replace(/-/g, ' ').toUpperCase();
    useEffect(() => {
        const fetchProducts = async () => {
    try {
        setLoading(true);
        const res = await productService.getProductsByCategory(slug); 
        
        // Log để kiểm tra chính xác cấu trúc
        console.log("Dữ liệu nhận từ API:", res);

        // Sửa lại dòng này: Nếu res là object chứa mảng data
        const actualData = res.data || res; 
        setProducts(actualData); 
        
        setLoading(false);
    } catch (error) {
        console.error("Lỗi fetch:", error);
        setLoading(false);
    }
};

        fetchProducts();
    }, [slug]);

   return (
        <div >
            <div style={{marginTop: '102px'}} >
                
                <Link to="/">HOME</Link> / <Link to="/shop">SHOP</Link> / <span>{formatTitle(slug)}</span>
            </div>
            <h1 >{formatTitle(slug)}</h1>

            {loading ? (
                <p>Đang tải dữ liệu...</p>
            ) : (
                <div >
                    {products.length > 0 ? (
                        products.map((item, index) => (
                            <div key={item._id}>
                                <img src={item.mainImage} alt={item.name} />
                                <h3>{item.name}</h3>
                                <p>{item.price.toLocaleString()} VND</p>
                                <button>Add to Cart</button>
                            </div>
                        ))
                    ) : (
                        <p>Chưa có sản phẩm nào trong mục này.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CategoryPage;