const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const brandRoutes = require('./modules/brand/brand.routes');
const productRoutes = require('./modules/product/product.routes');
const userRoutes = require('./modules/user/user.routes');
const testimonialRoutes = require('./modules/testimonial/testimonial.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Quality Cravings Server Running...'));

// Routes
app.use('/brands', brandRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/testimonials', testimonialRoutes);

module.exports = app;
