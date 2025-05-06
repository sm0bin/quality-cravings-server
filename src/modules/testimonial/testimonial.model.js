const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    author: String,
    testimonial: String,
    authorImg: String,
    authorMetadata: String,
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
