import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import productService from "../../service/productService";
import category from './categorypage.module.scss'
import {CartContext} from '../../features/ContextProvider.jsx'

// 1. Banner và Label cho từng danh mục
const categoryConfig = {
  "espresso-machine": {
    label: "Espresso Machine",
    banner:
      "https://res.cloudinary.com/drrao1nzd/image/upload/v1771074757/BannerShopEM_eexbd2.jpg", 
    description: "Máy pha cà phê chuyên nghiệp.",
  },
  "coffee-beans": {
    label: "Beans Coffee", 
    banner: "https://res.cloudinary.com/drrao1nzd/image/upload/v1771076026/BannerShopCB_kpmqzx.jpg",
    description: "Hạt cà phê rang xay thượng hạng.",
  },
  accessories: {
    label: "Accessories",
    banner:
      "https://res.cloudinary.com/drrao1nzd/image/upload/v1771075516/BannerShopACC_d25xkd.jpg",
    description: "Dụng cụ pha chế đi kèm.",
  },
  "grinder-machine": {
    label: "Grinder Machine",
    banner: "https://res.cloudinary.com/drrao1nzd/image/upload/v1771076023/BannerShopGM_e0ypkt.jpg",
    description: "Máy xay cà phê độ chính xác cao.",
  },
};

const MenuPage = () => {
  const { slug } = useParams();
  const {dispatch} = useContext(CartContext)
  const [sortOrder, setSortOrder] = useState("default");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await productService.getProductsByCategory(slug, sortOrder);
        setProducts(res.data);
      } catch (error) {
        console.error("Eror loading product:", error);
      }
      setLoading(false);
    };

    if (slug) fetchProducts();
  }, [slug, sortOrder] );

  return (
    <div className={category.container} >
      {/*  DYNAMIC BANNER  */}
      <div className={category.banner}>
          <img
            src={categoryConfig[slug].banner}
            alt={categoryConfig[slug].label}
          />
          <h1>{categoryConfig[slug].label}</h1>
      </div>
      <div className={category.path}>
        <Link to="/">HOME</Link> / <Link to="/shop">SHOP</Link> / <p>{categoryConfig[slug].label}</p>
      </div>
      {/* Sort */}
      <div className={category.sort} >
          <label style={{fontWeight: 'bold', fontSize: '24px', marginRight: '10px'}}>Sort by:</label>
          <select 
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
              <option value="default">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
          </select>
      </div>
      {/*  PRODUCT LIST  */}
      <div className={category.productslist}>
        {loading ? (
          <p>Loading...</p>
        ) : products?.length > 0 ? (
          products.map((product) => (
            <div key={product._id}>
              <div className={category.wrapper}>
                <button 
                  className={category.btn} 
                  onClick={() => dispatch({type: "Add", product})}
                  >ADD TO CART</button>
                <img src={product.mainImage} alt={product.name} />
              </div>
              <h3>{product.name}</h3>
              <p>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                  currencyDisplay: "code"
                }).format(product.price)}
              </p>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
