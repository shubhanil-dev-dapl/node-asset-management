const router = require('express').Router();
const userController = require('../controller/user.controller');

const verifyToken = require('../middleware/authMiddleware');

// User login
router.get('/login', verifyToken, userController.login);

// User registration
router.post('/register', userController.register);

module.exports = router;