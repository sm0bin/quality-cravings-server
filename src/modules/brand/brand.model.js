const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: String,
    imageUrl: String,
    advertisementImages: [String]
});

module.exports = mongoose.model('Brand', brandSchema);
