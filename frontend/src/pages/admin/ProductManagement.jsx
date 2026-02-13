// src/pages/admin/ProductManagement.jsx
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser, faCartShopping  } from '@fortawesome/free-solid-svg-icons';
import ProductService from "../../service/ProductService.js"; 
import AdminProductForm from "../../components/admin/AdminProductForm.jsx";
import product_mgmt from './productmanagement.module.scss'

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [sortOrder, setSortOrder] = useState("default");
  
  // State: Find key word
  const [searchTerm, setSearchTerm] = useState("");
  // State: Loại lọc (Mặc định là 'all')
  const [filterType, setFilterType] = useState("all");

  // Danh sách các bộ lọc
  const filters = [
    { id: 'all', label: 'ALL' },
    { id: 'machine', label: 'ESSPRESSO MACHINE' },
    { id: 'grinder', label: 'GRINDER MACHINE' },
    { id: 'beans', label: 'COFFEE BEANS' },
    { id: 'accessories', label: 'ACCESSORIES' },
  ];

  // Hàm tải dữ liệu
  const fetchProducts = async () => {
    try {
      // Gọi API với cả từ khóa và loại lọc
      const data = await ProductService.getAll(searchTerm, filterType, sortOrder);
      setProducts(data);
    } catch (err) {
      console.error("Lỗi tải dữ liệu:", err);
    }
  };

  // Tự động gọi lại API khi đổi bộ lọc hoặc nhập tìm kiếm
  useEffect(() => {
    fetchProducts();
  }, [filterType, searchTerm, sortOrder]);

  // Hàm xóa
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa?")) {
      try {
        await ProductService.remove(id);
        fetchProducts();
      } catch (err) {
        alert("Xóa thất bại!");
      }
    }
  };

  return (
    <div className={product_mgmt.container}>
        <h1>Inventory Management</h1>
        <div className={product_mgmt.form}>
         <AdminProductForm 
            productId={editingId} 
            key={editingId || 'create'} 
            onSuccess={() => { setEditingId(null); fetchProducts(); }}
         />
         {editingId && (
             <button onClick={() => setEditingId(null)} className={product_mgmt.btn_edit} >
                 Cancel Editing
             </button>
         )}
      </div>
      

      
      <div className={product_mgmt.table}>
        <h3>PRODUCTS LIST </h3> 
        <div className={product_mgmt.line}></div>

         {/* TAB */}
      <div className={product_mgmt.tab} >
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilterType(f.id)}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: '0.3s',
              backgroundColor: filterType === f.id ? '#555555' : '#ecf0f1', 
              color: filterType === f.id ? '#fff' : '#555555',
              boxShadow: filterType === f.id ? '0 4px 6px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

        {/* SEARCH */}
      <div className={product_mgmt.srcbar}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className={product_mgmt.icon} />
          <input 
              type="text" 
              placeholder="Search by product name or SKU..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: '12px', width: '500px', border: '1px solid #ccc', borderRadius: '5px' }}
          />
      </div>

      <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px' }}>
          <label style={{fontWeight: 'bold'}}>Sort By:</label>
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

 
      


      <table border="1" style={{ width: '100%', borderCollapse: 'collapse', borderColor: '#ddd' }}>
        <thead style={{ background: '#f8f9fa' }}>
          <tr>
            <th style={{padding: '12px'}}>No</th>
            <th style={{padding: '12px'}}>Image</th>
            <th style={{padding: '12px'}}>Product Name</th>
            <th style={{padding: '12px'}}>Category</th>
            <th style={{padding: '12px'}}>Price</th>
            <th style={{padding: '12px'}}>Quantity</th>
            <th style={{padding: '12px'}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
             <tr><td colSpan="5" style={{padding: '20px', textAlign: 'center'}}>No products found.</td></tr>
          ) : (
            products.map((p, index) => (
                <tr key={p._id} style={{ borderBottom: '1px solid #eee' }}>
                    {/* [No] */}
                    <td style={{padding: '10px', textAlign: 'center'}}>
                      {index + 1}
                    </td>

                    {/* [Image] */}
                    <td style={{padding: '10px', textAlign: 'center'}}>
                        <img src={p.mainImage} width="60" height="60" style={{objectFit: 'cover', borderRadius: '4px'}} alt="" />
                    </td>

                    {/* [ProductName] */}
                    <td style={{padding: '10px'}}>
                        <b>{p.name}</b><br/>
                        <small style={{color: '#7f8c8d'}}>SKU: {p.sku}</small>
                    </td>

                     {/* [Category] */}
                    <td style={{padding: '10px', textAlign: 'center'}}>
                        <span style={{
                            padding: '6px 12px',
                            borderRadius: '15px',
                            fontSize: '12px',
                            fontWeight: 'bold', 
                            color: '#333'
                        }}>
                            {p.category ? p.category.toUpperCase() : 'KHÁC'}
                        </span>
                    </td>

                     {/* [Price] */}
                    <td style={{padding: '10px', fontWeight:'bold', textAlign: 'center'}}>{p.price?.toLocaleString()} VND</td>

                     {/* [Quantity] */}
                    <td style={{textAlign:'center'}}>
                      {p.quantity > 0 ? (
                          <span style={{color: 'green',background: '#ddeedf', padding: '4px 8px',borderRadius: '4px', fontWeight: 'bold'}}>
                              {p.quantity} 
                          </span>
                      ) : (
                          <span style={{color: 'red', fontWeight: 'bold', background: '#ffe6e6', padding: '4px 8px', borderRadius: '4px'}}>
                              Out of stock
                          </span>
                      )}
                    </td>

                     {/* [Action] */}
                    <td style={{padding: '10px', textAlign: 'center'}}>
                        <button onClick={() => setEditingId(p._id)} style={{marginRight: '8px', cursor:'pointer', padding:'5px'}}>Edit</button>
                        <button onClick={() => handleDelete(p._id)} style={{color: 'red', cursor:'pointer', padding:'5px'}}>Delete</button>
                    </td>
                </tr>
            ))
          )}
        </tbody>
      </table>
      </div>
      
    </div>
  );
}

export default ProductManagement;