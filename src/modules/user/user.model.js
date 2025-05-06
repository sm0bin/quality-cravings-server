const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    photoUrl: String,
    email: String,
    cartItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

module.exports = mongoose.model('User', userSchema);
