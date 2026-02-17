import React, { useState, useEffect, useRef } from "react";
import ProductService from "../../service/productService.js";
import UploadService from "../../service/uploadService.js"; 
import form from './adminproductform.module.scss'

const DEFAULT_TECH_SPECS = {
    origin: '',
    dimensions: '',
    weight: '',
    material: '',
    voltage: '',
    wattage: '',
    
    // Espresso
    amperage: '',
    coffeeBoiler: '',
    steamBoiler: '',

    // Grinder
    burrs: '',
    hopperCapacity: "", 
    productivity: "", 
    grindAdjustment: "", 
    grindingSpeed: "", 
    programmableDose: false // Checkbox
};

function AdminProductForm({ productId, onSuccess, onCancel }) {
  const [product, setProduct] = useState({
    name: "", 
    price: "", 
    sku: "", 
    brand: "",
    category: "",
    quantity: "",
    mainImage: "", 
    detailImages: [],
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const mainImageInputRef = useRef(null);
  const detailImageInputRef = useRef(null);

  // Kiểm tra đang ở chế độ chỉnh sửa 
  const isEdit = !!productId;

  // Load dữ liệu sản phẩm khi vào trang chỉnh sửa
  useEffect(() => {
    if (isEdit) {
      ProductService.get(productId)
        .then(data => setProduct({
                ...data,
                techSpecs: {
                    ...DEFAULT_TECH_SPECS,
                    ...(data.techSpecs || {}) 
                }
            }))
        .catch(err => console.error(err));
    }
  }, [productId, isEdit]);

  // cập nhật state khi người dùng nhập dữ liệu vào form
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setProduct({ ...product, [name]: val });
    if (value.trim() !== "") {
        setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // cập nhật các thông số kỹ thuật trong state product khi user nhập form.
  const handleTechSpec = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setProduct((prev) => ({
      ...prev,
      techSpecs: {
        ...prev.techSpecs,
        [name]: val
      }
    }));

  }

  // Upload ảnh lên server và lưu URL ảnh vào state product
  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      setLoading(true);
      try {
        // Call API upload ảnh
        const response = await UploadService.uploadImage(reader.result, type);
        // Lấy URL ảnh trả về
        const imageUrl = response.url || response.data?.url; 
        if (type === 'main') {
          setProduct(prev => ({ ...prev, mainImage: imageUrl }));
          setErrors(prev => ({ ...prev, mainImage: null }));
        } else {
          setProduct(prev => ({ 
            ...prev, 
            detailImages: [...prev.detailImages, imageUrl] 
          }));
          if (detailImageInputRef.current) detailImageInputRef.current.value = "";
        }
      } catch (err) {
          alert("Upload failed !!!");
        } finally {
            setLoading(false);
          }
    };
  };

  // Xóa ảnh chính của sản phẩm
  const handleRemoveMainImage = () => {
      setProduct(prev => ({ ...prev, mainImage: "" }));
      if (mainImageInputRef.current) mainImageInputRef.current.value = "";
  };
  // Xóa ảnh phụ/ chi tiết của sản phẩm
  const handleRemoveDetailImage = (indexToRemove) => {
      setProduct(prev => ({
          ...prev,
          detailImages: prev.detailImages.filter((_, index) => index !== indexToRemove)
      }));
  };

  // gửi dữ liệu sản phẩm lên server
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.mainImage) {
        alert("Please wait until the upload completes or choose a main image");
        return;
    }
    setLoading(true);
    try {
      if (isEdit) {
        await ProductService.update(productId, product);
        alert("Update successful!");
      } else {
        await ProductService.create(product);
        alert("Created successfully!");
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      alert("Error occurred while saving the product!");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Form thông tin của sản phẩm 
    <div className={form.container}>
      <h2>{isEdit ? "Edit Product" : "Add New Product"}</h2>
      <div className={form.line}></div>
      <h3>Product Information: </h3>
      <form onSubmit={handleSubmit}>
        <div className={form.adProductform}>

          {/* Tên sản phẩm */}
          <div className={form.form1}>
              <label>Product Name:</label>
              <input name="name" value={product.name} onChange={handleInputChange} className={form.input} />
          </div>

          {/* Giá sản phẩm */}
          <div className={form.form1}>
              <label>Price:</label>
              <input name="price" type="number" value={product.price} onChange={handleInputChange} className={form.input} />
          </div>

          {/* Phân loại sản phẩm */}
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

          {/* Mã SKU */}
          <div className={form.form1}>
              <label>SKU Code:</label>
              <input name="sku" value={product.sku} onChange={handleInputChange} className={form.input} />
          </div>

          {/* Số lượng tồn kho */}
          <div className={form.form1}>
              <label>Stock Quantity:</label>
              <input name="quantity" type="number" value={product.quantity} onChange={handleInputChange} className={form.input} />
          </div>
       </div>

       {/* Upload ảnh */}
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

      {/* Thông tin kỹ thuật của sản phẩm */}
      <h3 style={{marginTop: '50px'}}>Technical Specifications: </h3> 
      <div className={form.adProductform}>

        {/* Xuất xứ */}
        <div className={form.form1}>
            <label>Origin:</label>
            <input name="origin" value={product.techSpecs?.origin} onChange={handleTechSpec} className={form.input} placeholder="Ex: Italia" />
        </div>

        {/* Kích thước  */}
        <div className={form.form1}>
              <label>Dimensions (H-W-D):</label>
              <input name="dimensions" value={product.techSpecs?.dimensions} onChange={handleTechSpec} className={form.input} placeholder="Ex: 340 - 290 - 390 mm" />
        </div>

        {/* Vật liêuk */}
        <div className={form.form1}>
            <label>Material:</label>
            <input name="material" value={product.techSpecs?.material} onChange={handleTechSpec} className={form.input} placeholder="Ex: Stainless Steel" />
        </div>

        {/* Cân nặng */}
        <div className={form.form1}>
            <label>Weight (kg):</label>
            <input name="weight" type="number" value={product.techSpecs?.weight} onChange={handleTechSpec} className={form.input} placeholder="Ex: 19" />
        </div>

        {/* Điện áp của thiết bị */}
        <div className={form.form1}>
              <label>Voltage:</label>
              <input name="voltage" value={product.techSpecs?.voltage} onChange={handleTechSpec} className={form.input} placeholder="Ex: 220V" />
        </div>

        {/* Công suất tiêu thụ của thiết bị */}
        <div className={form.form1}>
            <label>Wattage:</label>
            <input name="wattage" value={product.techSpecs?.wattage} onChange={handleTechSpec} className={form.input} placeholder="Ex: 1850W" />
        </div>
          
       </div>
       
        {/*  Hiển thị dành cho Grinder Machine */}  
       {product.category === 'grinder-machine' && (
            <div className={form.adProductform}>

              {/* Lưỡi xay */}
              <div className={form.form1}>
                  <label>Burrs:</label>
                  <input name="burrs" value={product.techSpecs?.burrs} onChange={handleTechSpec} className={form.input} placeholder="Ex: Conical, 83mm" />
              </div>

              {/* Phễu hạt */}
              <div className={form.form1}>
                  <label>Hopper Capacity:</label>
                  <input name="hopperCapacity" value={product.techSpecs?.hopperCapacity} onChange={handleTechSpec} className={form.input} placeholder="Ex: 1.7 kg" />
              </div>

              {/* Năng suất */}
              <div className={form.form1}>
                    <label>Productivity:</label>
                    <input name="productivity" value={product.techSpecs?.productivity} onChange={handleTechSpec} className={form.input} placeholder="Ex: 2.5 - 4 g/s" />
              </div>

              {/* Tốc độ xay */}
              <div className={form.form1}>
                    <label>Grinding Speed:</label>
                    <input name="grindingSpeed" value={product.techSpecs?.grindingSpeed} onChange={handleTechSpec} className={form.input} placeholder="Ex: 100, 150 rpm" />
              </div>

              {/* Điều chỉnh độ xay */}
              <div className={form.form1}>
                    <label>Grind Adjustment:</label>
                    <input name="grindAdjustment" value={product.techSpecs?.grindAdjustment} onChange={handleTechSpec} className={form.input} placeholder="Ex: Stepless" />
              </div>

              {/* Set định lượng  */}
              <div className={form.form1}>
                    <label style={{display:'inline-flex', gap: '10px'}}>Programmable Dose:
                      <input type="checkbox" name="programmableDose" checked={product.techSpecs?.programmableDose || false} onChange={handleTechSpec} style={{width: '20px', height: '20px', marginTop: '5px'}}/>
                    </label>
              </div>
            </div>
        )}

        {/*  Hiển thị dành cho Espresso Machine */}  
       {product.category === 'espresso-machine' && (
            <div className={form.adProductform}>  

                {/* Dung tích nồi hơi pha cà phê */}
                <div className={form.form1}>
                    <label>Coffee Boiler:</label>
                    <input name="coffeeBoiler" value={product.techSpecs?.coffeeBoiler} onChange={handleTechSpec} className={form.input} placeholder="Ex: 1.6 liters" />
                </div>

                {/* Dung tích nồi hơi hơi nước */}
                <div className={form.form1}>
                    <label>Steam Boiler:</label>
                    <input name="steamBoiler" value={product.techSpecs?.steamBoiler} onChange={handleTechSpec} className={form.input} placeholder="Ex: 0.25 liters" />
                </div>

                {/* Cường độ dòng điện */}
                <div className={form.form1}>
                    <label>Amperage:</label>
                    <input name="amperage" value={product.techSpecs?.amperage} onChange={handleTechSpec} className={form.input} placeholder="Ex: 9A" />
                </div></div>    
          )}
        <button type="submit" disabled={loading} className={form.submit}>
            {loading ? "Đang xử lý..." : (isEdit ? "Lưu thay đổi" : "Hoàn tất") }
        </button>          
      </form>
    </div>
  );
}

export default AdminProductForm;