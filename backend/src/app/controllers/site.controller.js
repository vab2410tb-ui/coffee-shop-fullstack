import Product from '../models/products.models.js'; 

class SiteController {
    async home(req, res) {
        try {
            // Lấy SKU từ query string hoặc params (ví dụ: /?sku=EM-MICRA)
            const sku = req.query.sku;
            const product = await Product.findOne({ sku: sku });
            
            if (!product) {
                return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
            }
            res.json({
                name: product.name,
                price: product.price,
                image: product.mainImage

            });
        } catch (error) {
            res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
        }
    }

    // 2. hàm riêng biệt cho SKU (Khuyên dùng cách này)
    async getDetail(req, res) {
        try {
            const product = await Product.findOne({ sku: req.params.sku });
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: "Lỗi server" });
        }
    }
}

export default new SiteController();