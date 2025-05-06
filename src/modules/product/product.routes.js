const express = require('express');
const router = express.Router();
const controller = require('./product.controller');

router.get('/', controller.getAllProducts);
router.get('/:productId', controller.getProductById);
router.post('/', controller.createProduct);
router.put('/:productId', controller.updateProduct);

module.exports = router;
