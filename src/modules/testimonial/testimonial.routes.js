const express = require('express');
const router = express.Router();
const controller = require('./testimonial.controller');

router.get('/', controller.getAllTestimonials);

module.exports = router;
