const router = require('express').Router();
const userController = require('../controller/user.controller');

const verifyToken = require('../middleware/authMiddleware');

// User login
router.post('/login',userController.login);

// User registration
router.post('/register', userController.register);

// Forgot Password & Send Reset Email
router.post('/forgotPassword', userController.forgotPassword);
router.get('/home', userController.dashboard);

module.exports = router;