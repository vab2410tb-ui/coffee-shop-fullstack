// src/services/productService.js
import axiosClient from './ClientService.js';

const ProductService = {
    // 1. Lấy sản phẩm theo danh mục (Dành cho khách hàng)
    // URL đúng: http://localhost:8000/api/v1/products/category/:slug
    getProductsByCategory: async (slug) => {
        // shopRouter được gắn vào /api/v1/products
        const url = `/products/category/${slug}`; 
        return axiosClient.get(url);
    },

    // 2. Lấy chi tiết 1 sản phẩm (Dùng trong Admin Form)
    // URL đúng: http://localhost:8000/api/v1/admin/products/:id
    get: async (id) => {
        // productAdminRouter được gắn vào /api/v1/admin/products
        const url = `/admin/products/${id}`; 
        return axiosClient.get(url);
    },

    // --- DÀNH CHO ADMIN (QUẢN LÝ) ---
    getAll: async (searchTerm, filterType, sortOrder) => {
        const url = '/admin/products';
        return axiosClient.get(url, { 
            params: {
            name: searchTerm,    
            category: filterType, 
            sort: sortOrder
            }
         });
    },
    
    create: async (data) => {
        const url = '/admin/products';
        return axiosClient.post(url, data);
    },

    update: async (id, data) => {
        const url = `/admin/products/${id}`;
        return axiosClient.put(url, data);
    },

    remove: async (id) => {
        const url = `/admin/products/${id}`;
        return axiosClient.delete(url);
    },
};

export default ProductService;