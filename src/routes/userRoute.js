const router = require('express').Router();
const userController = require('../controller/user.controller');

const verifyToken = require('../middleware/authMiddleware');

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
router.post('/login', userController.login);

// User registration
router.post('/register', userController.register);

// Forgot Password & Send Reset Email
router.post('/forgotPassword', userController.forgotPassword);

// Dashboard
router.get('/home', userController.dashboard);

module.exports = router;