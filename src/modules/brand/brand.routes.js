const express = require('express');
const router = express.Router();
const controller = require('./brand.controller');

router.get('/', controller.getAllBrands);
router.get('/:brandId', controller.getBrandById);
router.get('/:brandId/products', controller.getProductsByBrand);

module.exports = router;
