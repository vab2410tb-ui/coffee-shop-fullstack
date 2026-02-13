import React, { useState } from "react";
import axios from 'axios';

function UploadImg() {
  const [image, setImage] = useState(""); // Để trống thay vì "null" chuỗi
  const [uploadType, setUploadType] = useState("main"); // Mặc định là ảnh chính
  const [loading, setLoading] = useState(false);

  // Xử lý xem trước ảnh (Preview)
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      previewFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Vui lòng chọn ảnh!");

    setLoading(true);
    try {
      // Gửi kèm 'type' để Backend biết là main hay detail
      const result = await axios.post("http://localhost:8000/admin/upload", {
        image: image,
        type: uploadType 
      });

      console.log("Kết quả từ Cloudinary:", result.data);
      alert(`Upload ${uploadType} thành công!`);
      
      // Xóa preview sau khi thành công (tùy chọn)
      // setImage(""); 
    } catch (err) {
      console.error("Lỗi Network hoặc Server:", err.response?.data || err.message);
      alert("Upload thất bại, kiểm tra lại console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <form onSubmit={handleSubmit}>
        <h3>Tải lên hình ảnh sản phẩm</h3>
        
        {/* Lựa chọn loại ảnh */}
        <div style={{ marginBottom: "15px" }}>
          <label>Phân loại: </label>
          <select 
            value={uploadType} 
            onChange={(e) => setUploadType(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px" }}
          >
            <option value="main">Ảnh chính (Main)</option>
            <option value="detail">Ảnh chi tiết (Detail)</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="fileInput" style={{ display: "block", marginBottom: "5px" }}>
            Chọn file từ máy tính:
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={handleChange}
            accept="image/png, image/jpeg, image/jpg, image/webp"
            required
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={loading}
        >
          {loading ? "Đang tải lên..." : "Bắt đầu Upload"}
        </button>
      </form>

      <hr />

      {/* Khu vực xem trước ảnh */}
      {image && (
        <div>
          <h4>Xem trước ({uploadType}):</h4>
          <img 
            src={image} 
            alt="preview" 
            style={{ 
              maxWidth: "300px", 
              border: uploadType === "main" ? "4px solid gold" : "2px dashed gray",
              borderRadius: "8px" 
            }} 
          />
        </div>
      )}
    </div>
  );
}

export default UploadImg;