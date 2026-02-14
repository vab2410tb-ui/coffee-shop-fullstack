import Products from "../models/products.models.js";

const shopController = {
    
    // [GET] /api/v1/products/category/:slug
    getProductsByCategory: async (req, res) => {
        try {
            const { slug } = req.params;

            // Tìm sản phẩm có category trùng với slug
            const products = await Products.find({ category: slug });

            return res.status(200).json({
                success: true,
                count: products.length,
                data: products
            });
        } catch (error) {
            console.error("Error fetching category:", error);
            return res.status(500).json({
                success: false,
                message: "Lỗi Server khi lấy danh mục sản phẩm"
            });
        }
    },

    // [GET] /api/v1/products
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find({});
            return res.status(200).json({
                success: true,
                data: products
            });
        } catch (error) {
            return res.status(500).json({ 
                success: false, 
                message: error.message 
            });
        }
    },

    // [GET] /api/v1/products/detail/:id
    getProductDetail: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            
            if (!product) {
                return res.status(404).json({ 
                    success: false, 
                    message: "Không tìm thấy sản phẩm" 
                });
            }

            return res.status(200).json({ 
                success: true, 
                data: product 
            });
        } catch (error) {
            return res.status(500).json({ 
                success: false, 
                message: error.message 
            });
        }
    }
};

export default shopController;