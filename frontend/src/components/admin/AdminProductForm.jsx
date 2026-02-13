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
  const mainImageInputRef = useRef(null);
  const detailImageInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const isEdit = !!productId;

  useEffect(() => {
    if (isEdit) {
      ProductService.get(productId)
        .then(data => setProduct(data))
        .catch(err => console.error(err));
    } else {
      setProduct({ name: "", price: "", sku: "", brand: "", category: "",quantity: "", mainImage: "", detailImages: [] });
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
        const data = await UploadService.uploadImage(reader.result, type);
        
        if (type === 'main') {
          setProduct(prev => ({ ...prev, mainImage: data.url }));
          setErrors(prev => ({ ...prev, mainImage: null }));
        } else {
            setProduct(prev => ({ ...prev, detailImages: [...prev.detailImages, data.url] }));
          if (detailImageInputRef.current) detailImageInputRef.current.value = "";
        }
      } catch (err) {
        alert("Lỗi upload ảnh!");
      } finally {
        setLoading(false);
      }
    };
  };

  const handleRemoveDetailImage = (indexToRemove) => {
      setLoading(true);
      setProduct(prev => ({
          ...prev,
          detailImages: prev.detailImages.filter((_, index) => index !== indexToRemove)
      }));
  };

  const handleRemoveMainImage = () => {
      setLoading(true);
      setProduct(prev => ({ ...prev, mainImage: "" }));
      if (mainImageInputRef.current) {
          mainImageInputRef.current.value = "";
      }
      
  };

  const validateForm = () => {
      let newErrors = {};
      let isValid = true;

      if (!product.name.trim()) {
          newErrors.name = 'Please enter a product name'; 
          isValid = false;
      }
      
      if (product.price === "" || product.price <= 0) {
          newErrors.price = 'Please enter a valid price';
          isValid = false;
      }

       if (!product.sku.trim()) {
          newErrors.sku = 'Please enter a SKU code';
          isValid = false;
      }

      if (!product.mainImage) {
          newErrors.mainImage = 'Please upload a main image';
          isValid = false;
      }

      if (product.quantity === "" || product.quantity < 0) {
          newErrors.quantity = 'Please enter valid quantity';
          isValid = false;
      }

      setErrors(newErrors); // Cập nhật state lỗi để giao diện render lại màu đỏ
      return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
        return; // Nếu có lỗi thì dừng ngay, không hiện alert nữa
    }

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
      alert("Có lỗi xảy ra!");
    } 
    
  };

  return (
    <div className={form.container}>
      <h3>{isEdit ? "CHỈNH SỬA" : "ADD NEW PRODUCT"}</h3>
      <div className={form.line}></div>

      <form onSubmit={handleSubmit} >
        {/* FILL INFORMATION */}
        <div className={form.adProductform}>
         <div className={form.form1}>
             <label>Product Name:</label>
             <input  name="name" value={product.name} onChange={handleInputChange} 
             className={`${form.input} ${errors.name ? form.errorInput : ''}`} 
            />
            {errors.name && <span className={form.errorText}>{errors.name}</span>}
         </div>

         <div className={form.form1}>
             <label>Price:</label>
             <input  name="price" type="number" value={product.price} onChange={handleInputChange} 
             className={`${form.input} ${errors.price ? form.errorInput : ''}`} 
            />
            {errors.price && <span className={form.errorText}>{errors.price}</span>}
         </div>

         <div className={form.form1}>
             <label>Product Category:</label>
             <select name="category" value={product.category} onChange={handleInputChange} className={form.input}>
                 <option value="machine"> Espresso Machine</option>
                 <option value="grinder"> Grinder Machine</option>
                 <option value="beans">Coffee Beans</option>
                 <option value="accessories">Accessories</option>
             </select>
         </div>

         <div className={form.form1}>
             <label>SKU Code:</label>
             <input  name="sku" value={product.sku} onChange={handleInputChange} 
             className={`${form.input} ${errors.sku ? form.errorInput : ''}`} 
            />
            {errors.sku && <span className={form.errorText}>{errors.sku}</span>}
         </div>

        <div className={form.form1}>
            <label>Stock Quantity:</label>
            <input name="quantity" type="number" value={product.quantity} onChange={handleInputChange} 
            className={`${form.input} ${errors.quantity ? form.errorInput : ''}`} placeholder="0"
            />
            {errors.quantity && <span className={form.errorText}>{errors.quantity}</span>}
        </div>
       </div>

        {/* UPDATE IMG */}
      <div className={form.update_img}>

          {/* Main-IMG */}
          <div className={form.main_image}>
              <label>Main Image:</label><br/>
              <input name="mainImage" type="file" onChange={(e) => handleFileUpload(e, 'main')} ref={mainImageInputRef}/>
          
          {product.mainImage && (
              <div className={form.upImg} >
                  <img src={product.mainImage} alt="Main" width="200" style={{borderRadius: '4px', border: '1px solid #ddd'}}/>
                  <button type="button" onClick={handleRemoveMainImage}>✕</button>
              </div>
          )}
          </div>
          {/* Details-IMG */}
          <div className={form.details_image}>
              <label>Details image ({product.detailImages.length}):</label> <br/>
              <input type="file" onChange={(e) => handleFileUpload(e, 'detail')} ref={detailImageInputRef}/>
              <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {product.detailImages.map((url, index) => (
                <div key={index} className={form.upImg}>
                    <img src={url} width="120"  alt="Detail" style={{marginRight: '50px'}}/> 
                    <button 
                        type="button"
                        onClick={() => handleRemoveDetailImage(index)}
                    >✕</button>
                </div>
                ))}
              </div>
          </div>
      </div>

        <button type="submit" disabled={loading} className={form.submit}>
          {loading ? "Loading..." : (isEdit ? "Save changes" : "Finish") }
        </button>


      </form>
    </div>
  
  );
}

export default AdminProductForm;