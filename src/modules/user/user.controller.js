const User = require('./user.model');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

exports.getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.userEmail });
        res.send(user);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

exports.updateUserCart = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { email: req.params.userEmail },
            { cartItems: req.body.cartItems },
            { new: true }
        );
        res.send(user);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};
