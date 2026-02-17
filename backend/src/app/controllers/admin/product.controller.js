import Product from '../../models/products.models.js';

class ProductController {
    // [GET] /admin/product?q=keyword&category=machine
    async index(req, res) {
        const { name, category, sort } = req.query; 

        let condition = {};

        // tìm theo tên hoặc theo mã sku
        if (name) {
            condition.$or = [
                { name: { $regex: new RegExp(name), $options: "i" } },
                { sku: { $regex: new RegExp(name), $options: "i" } }
            ];
        }

        // Lọc theo loại
        if (category && category !== 'all') {
            condition.category = category;
        }

        // Sắp xếp 
        let sortCondition = {};
        if (sort === 'price_asc') {
            sortCondition.price = 1; 
        } else if (sort === 'price_desc') {
            sortCondition.price = -1; 
        } else {
            sortCondition.createdAt = -1; 
        }

        try {
            const data = await Product.find(condition).sort(sortCondition);
            res.send(data);
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    }
    // [GET] /admin/product/:id
    async show(req, res) {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) return res.status(404).json({ message: "Not Found" });
            res.json(product);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // [POST] /admin/product/store
    async store(req, res) {
        try {
            const newProduct = new Product(req.body);
            await newProduct.save();
            res.status(201).json(newProduct);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // [PUT] /admin/product/update/:id
    async update(req, res) {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id, 
                req.body, 
                { new: true }
            );
            res.json(updatedProduct);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // [DELETE] /admin/product/delete/:id
    async delete(req, res) {
        try {
            await Product.findByIdAndDelete(req.params.id);
            res.json({ message: "Xóa thành công!" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

export default new ProductController();