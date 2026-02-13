// src/services/productService.js
import axios from 'axios';

const API_URL = "http://localhost:8000/api/v1/admin/products";


const axiosClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const ProductService = {
    // 1. Lấy tất cả sản phẩm
    getAll: async (keyword = "", category = "all", sort = "") => {
    const response = await axiosClient.get('/', {
        params: {
            name: keyword,
            category,
            sort
        }
    });
    return response.data;
},


    // 2. Lấy chi tiết 1 sản phẩm
    get: async (id) => {
        const response = await axiosClient.get(`/${id}`);
        return response.data;
    },

    // 3. Tạo mới sản phẩm
    create: async (data) => {
        const response = await axiosClient.post('/', data);
        return response.data;
    },

    // 4. Cập nhật sản phẩm
    update: async (id, data) => {
        const response = await axiosClient.put(`/${id}`, data);
        return response.data;
    },

    // 5. Xóa sản phẩm
    remove: async (id) => {
        const response = await axiosClient.delete(`/${id}`);
        return response.data;
    },

};

export default ProductService;