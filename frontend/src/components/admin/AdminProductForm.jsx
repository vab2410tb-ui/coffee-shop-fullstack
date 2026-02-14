// src/components/admin/AdminProductForm.jsx
import React, { useState, useEffect, useRef } from "react";
import ProductService from "../../service/ProductService.js";
import UploadService from "../../service/UploadService.js"; 
import form from './adminproductform.module.scss'

function AdminProductForm({ productId, onSuccess, onCancel }) {
  const [product, setProduct] = useState({
    name: "", 
    price: "", 
    sku: "", 
    brand: "",
    category: "",
    quantity: "",
    mainImage: "", 
    detailImages: []
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const mainImageInputRef = useRef(null);
  const detailImageInputRef = useRef(null);

  const isEdit = !!productId;

  useEffect(() => {
    if (isEdit) {
      // Đảm bảo ProductService có hàm 'get' hoặc đổi thành 'getAdminProduct' tùy backend
      ProductService.get(productId)
        .then(data => setProduct(data.data || data)) // Cần check cấu trúc trả về
        .catch(err => console.error(err));
    }
  }, [productId, isEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    if (value.trim() !== "") {
        setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      setLoading(true);
      try {
        const response = await UploadService.uploadImage(reader.result, type);
        // Kiểm tra cấu trúc: response.url hoặc response.data.url tùy backend
        const imageUrl = response.url || response.data?.url; 
        
        if (type === 'main') {
          setProduct(prev => ({ ...prev, mainImage: imageUrl }));
          setErrors(prev => ({ ...prev, mainImage: null }));
        } else {
          setProduct(prev => ({ ...prev, detailImages: [...prev.detailImages, imageUrl] }));
          if (detailImageInputRef.current) detailImageInputRef.current.value = "";
        }
      } catch (err) {
        alert("Lỗi upload ảnh!");
      } finally {
        setLoading(false);
      }
    };
  };

  const handleRemoveMainImage = () => {
      // KHÔNG set loading ở đây
      setProduct(prev => ({ ...prev, mainImage: "" }));
      if (mainImageInputRef.current) mainImageInputRef.current.value = "";
  };

  const handleRemoveDetailImage = (indexToRemove) => {
      // KHÔNG set loading ở đây
      setProduct(prev => ({
          ...prev,
          detailImages: prev.detailImages.filter((_, index) => index !== indexToRemove)
      }));
  };

  // ... (validateForm giữ nguyên nhưng hãy check mainImage) ...

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.mainImage) {
        alert("Vui lòng đợi ảnh upload xong hoặc chọn ảnh chính!");
        return;
    }

    setLoading(true);
    try {
      if (isEdit) {
        await ProductService.update(productId, product);
        alert("Cập nhật thành công!");
      } else {
        await ProductService.create(product);
        alert("Tạo mới thành công!");
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      alert("Có lỗi xảy ra khi lưu sản phẩm!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={form.container}>
      <h3>{isEdit ? "CHỈNH SỬA SẢN PHẨM" : "THÊM SẢN PHẨM MỚI"}</h3>
      <div className={form.line}></div>

      <form onSubmit={handleSubmit}>
        <div className={form.adProductform}>
         {/* Name & Price */}
         <div className={form.form1}>
             <label>Product Name:</label>
             <input name="name" value={product.name} onChange={handleInputChange} className={form.input} />
         </div>

         <div className={form.form1}>
             <label>Price:</label>
             <input name="price" type="number" value={product.price} onChange={handleInputChange} className={form.input} />
         </div>

         {/* SỬA CATEGORY Ở ĐÂY ĐỂ KHỚP VỚI DATABASE/SLUG */}
         <div className={form.form1}>
             <label>Product Category:</label>
             <select name="category" value={product.category} onChange={handleInputChange} className={form.input}>
                 <option value="">-- Select Category --</option>
                 <option value="espresso-machine"> Espresso Machine</option>
                 <option value="grinder-machine"> Grinder Machine</option>
                 <option value="coffee-beans">Coffee Beans</option>
                 <option value="accessories">Accessories</option>
             </select>
         </div>

         <div className={form.form1}>
             <label>SKU Code:</label>
             <input name="sku" value={product.sku} onChange={handleInputChange} className={form.input} />
         </div>

         <div className={form.form1}>
            <label>Stock Quantity:</label>
            <input name="quantity" type="number" value={product.quantity} onChange={handleInputChange} className={form.input} />
         </div>
       </div>

      <div className={form.update_img}>
          {/* Main Image Preview */}
          <div className={form.main_image}>
              <label>Main Image:</label><br/>
              <input type="file" onChange={(e) => handleFileUpload(e, 'main')} ref={mainImageInputRef}/>
          
          {product.mainImage && (
              <div className={form.upImg} >
                  <img src={product.mainImage} alt="Main Preview" width="200" />
                  <button type="button" onClick={handleRemoveMainImage}>✕</button>
              </div>
          )}
          </div>

          {/* Detail Images Preview */}
          <div className={form.details_image}>
              <label>Details image ({product.detailImages.length}):</label> <br/>
              <input type="file" onChange={(e) => handleFileUpload(e, 'detail')} ref={detailImageInputRef}/>
              <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {product.detailImages.map((url, index) => (
                <div key={index} className={form.upImg}>
                    <img src={url} width="120" alt={`Detail ${index}`} /> 
                    <button type="button" onClick={() => handleRemoveDetailImage(index)}>✕</button>
                </div>
                ))}
              </div>
          </div>
      </div>

        <button type="submit" disabled={loading} className={form.submit}>
          {loading ? "Đang xử lý..." : (isEdit ? "Lưu thay đổi" : "Hoàn tất") }
        </button>
      </form>
    </div>
  );
}

export default AdminProductForm;