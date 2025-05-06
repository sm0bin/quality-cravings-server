const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    imageUrl: String,
    brandId: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
    brandName: String,
    type: String,
    price: Number,
    rating: Number,
    shortDescription: String,
});

module.exports = mongoose.model('Product', productSchema);
