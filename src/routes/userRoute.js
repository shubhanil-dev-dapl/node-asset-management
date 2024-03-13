const router = require('express').Router();
const userController = require('../controller/user.controller');

const verifyToken = require('../middleware/authMiddleware');

// welcome
router.get('/', (req, res) => {
    res.send('welcome')
})
// User login
router.post('/api/login', userController.login);

// User registration
router.post('/api/register', userController.register);

// Forgot Password & Send Reset Email
router.post('/api/forgotPassword', userController.forgotPassword);

// Dashboard
router.get('/api/home', userController.dashboard);

module.exports = router;