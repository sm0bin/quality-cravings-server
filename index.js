const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5500;
const mongoose = require('mongoose');

// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Quality Cravings Server Running...')
})


// Connect 
mongoose.connect(process.env.DB_URI)
    .then(() => { console.log("Connection successful.") })
    .catch((err) => { console.log(err.message) })


// Schemas
const brandSchema = new mongoose.Schema({
    name: String,
    imageUrl: String,
    advertisementImages: [String]
});

const productSchema = new mongoose.Schema({
    name: String,
    imageUrl: String,
    brandId: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
    brandName: String,
    type: String,
    price: Number,
    rating: Number,
    shortDescription: String,
    imageUrl: String,
});

const userSchema = new mongoose.Schema({
    photoUrl: String,
    email: String,
    cartItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

const testimonialSchema = new mongoose.Schema({
    author: String,
    testimonial: String,
    authorImg: String,
    authorMetadata: String,
});


// Models
const Brand = mongoose.model('Brand', brandSchema);
const Product = mongoose.model('Product', productSchema);
const User = mongoose.model('User', userSchema);
const Testimonial = mongoose.model('Testimonial', testimonialSchema);


// Brand CRUD
app.get('/brands', async (req, res) => {
    const brands = await Brand.find();
    res.send(brands);
});

app.get('/brands/:brandId', async (req, res) => {
    const id = req.params.brandId;
    const brand = await Brand.findById(id);
    res.send(brand);
});

app.get('/brands/:brandId/products', async (req, res) => {
    const brandId = req.params.brandId;
    const products = await Product.find({ brandId });
    res.send(products);
});

// Product CRUD
app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

app.post('/products', async (req, res) => {
    const newProduct = req.body;
    const product = await Product.create(newProduct);
    res.json(product);
});

app.get('/products/:productId', async (req, res) => {
    const id = req.params.productId;
    const product = await Product.findById(id);
    res.send(product);
});

app.put('/products/:productId', async (req, res) => {
    const id = req.params.productId;
    const updateProduct = req.body;
    const product = await Product.findByIdAndUpdate(id, updateProduct, { new: true });
    res.send(product);
});

// User CRUD
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

app.get('/users/:userEmail', async (req, res) => {
    const userEmail = req.params.userEmail;
    const user = await User.findOne({ email: userEmail });
    res.send(user);
});

app.post('/users', async (req, res) => {
    const newUser = req.body;
    const user = await User.create(newUser);
    res.json(user);
});

app.put('/users/:userEmail', async (req, res) => {
    const userEmail = req.params.userEmail;
    const { cartItems } = req.body;
    const user = await User.findOneAndUpdate({ email: userEmail }, { cartItems }, { new: true });
    res.send(user);
});

// Testimonial CRUD
app.get('/testimonials', async (req, res) => {
    const testimonials = await Testimonial.find();
    res.send(testimonials);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


