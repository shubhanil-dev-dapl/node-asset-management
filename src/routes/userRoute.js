const router = require('express').Router();
const userController = require('../controller/user.controller');

const verifyToken = require('../middleware/authMiddleware');

// welcome
router.get('/', (req, res) => {
    res.send('welcome')
})
// User login
/**
 * @swagger
 * /api/companies:
 *   get:
 *     summary: Get all companies
 *     description: Retrieve a list of all companies.
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
 */
router.post('/api/login', userController.login);
router.post('/api/otpCheck', userController.otpCheck);

// User registration
router.post('/api/register', userController.register);

// Forgot Password & Send Reset Email
router.post('/api/forgotPassword', userController.forgotPassword);

// Dashboard
router.get('/api/home', userController.dashboard);

module.exports = router;