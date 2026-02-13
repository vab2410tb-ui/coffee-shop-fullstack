import Products from "../models/products.models.js";

class ShopController {
    
   async shop(req, res) {
        try {
            // Lấy tất cả sản phẩm
            const products = await Products.find({}); 
            res.json(products); 
            
        } catch (error) {
            // return Lỗi
            res.status(500).json({ 
                message: "Lỗi khi lấy dữ liệu sản phẩm",
                error: error.message 
            });
        }
    }

    //[GET] /shop/:slug
    async getDetail(req, res) {
        try {
            const slug = req.params.slug; 
            const product = await Products.findOne({ slug: slug });
            if (!product) {
                return res.status(404).json({ message: "Không tìm thấy sản phẩm này!" });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    //[GET] /shop/:sku
    async getProductBySku(req, res) {
        try {
            // Lấy sku từ URL
            const { sku } = req.params; 

            // Tìm sản phẩm có trường sku khớp với giá trị truyền vào
            const product = await Products.findOne({ sku: sku });

            if (!product) {
                return res.status(404).json({ message: "Không tìm thấy sản phẩm với mã SKU này" });
            }
            res.json(product);

        } catch (error) {
            res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
        }
    }
}

export default new ShopController();