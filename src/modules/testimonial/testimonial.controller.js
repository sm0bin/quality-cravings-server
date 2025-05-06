const Testimonial = require('./testimonial.model');

exports.getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.send(testimonials);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
