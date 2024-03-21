const router = require('express').Router();

const companyController = require('../../controller/admin/company.controller');

const verifyToken = require('../../middleware/authMiddleware');

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
router.get('/companies', companyController.getAllCompanies);

// get all Company
// router.get('/companies', companyController.getAllCompanies);

// Company Store
router.post('/company/store', companyController.createCompany);

// View Company
router.get('/company/:id', companyController.getCompanyById);

// Company Delete
router.delete('/company/delete/:id', companyController.deleteCompany);


module.exports = router;