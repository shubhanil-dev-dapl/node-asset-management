const router = require('express').Router();
const userController = require('../controller/user.controller');

const verifyToken = require('../middleware/authMiddleware');

// User login
router.post('/login',userController.login);

// User registration
router.post('/register', userController.register);

router.get('/home', verifyToken, userController.dashboard);

module.exports = router;