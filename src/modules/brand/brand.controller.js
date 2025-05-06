const Brand = require('./brand.model');
const Product = require('../product/product.model');

exports.getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.find();
        res.send(brands);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

exports.getBrandById = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.brandId);
        res.send(brand);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

exports.getProductsByBrand = async (req, res) => {
    try {
        const products = await Product.find({ brandId: req.params.brandId });
        res.send(products);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
