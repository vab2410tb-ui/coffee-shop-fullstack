import Product from '../../models/products.model.js';

const adminProductController = {

    // [GET] /admin/products
    index: async (req, res) => {
        const { name, category, sort } = req.query;
        let condition = {};

        // search theo name hoặc sku
        if (name) {
            condition.$or = [
                { name: { $regex: new RegExp(name), $options: "i" } },
                { sku: { $regex: new RegExp(name), $options: "i" } }
            ];
        }

        // filter category
        if (category && category !== 'all') {
            condition.category = category;
        }

        // sort
        let sortCondition = {};
        if (sort === 'price_asc') sortCondition.price = 1;
        else if (sort === 'price_desc') sortCondition.price = -1;
        else sortCondition.createdAt = -1;

        try {
            const data = await Product.find(condition).sort(sortCondition);
            res.send(data);
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    },

    // [GET] /admin/product/:id
    show: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);

            if (!product) {
                return res.status(404).json({ message: "Not Found" });
            }

            res.json(product);

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // [POST] /admin/product/store
    store: async (req, res) => {
        try {
            const newProduct = new Product(req.body);
            await newProduct.save();

            res.status(201).json(newProduct);

        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // [PUT] /admin/product/update/:id
    update: async (req, res) => {
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
    },

    // [DELETE] /admin/product/delete/:id
    delete: async (req, res) => {
        try {
            await Product.findByIdAndDelete(req.params.id);

            res.json({ message: "Deleted successfully!" });

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

};

export default adminProductController;