import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/admin/uploads";

const axiosUpload = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const UploadService = {
  // Upload ảnh lên Cloudinary qua Backend
  uploadImage: async (base64Image, type) => {
    const response = await axiosUpload.post('/upload', {
      image: base64Image,
      type: type
    });
    return response.data;
  },
};

export default UploadService;