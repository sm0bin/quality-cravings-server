const express = require('express');
const router = express.Router();
const controller = require('./user.controller');

router.get('/', controller.getAllUsers);
router.get('/:userEmail', controller.getUserByEmail);
router.post('/', controller.createUser);
router.put('/:userEmail', controller.updateUserCart);

module.exports = router;
