const router = require('express').Router();

const adminControler = require('../../controller/admin/index');
const companyController = require('../../controller/admin/company.controller');

const verifyToken = require('../middleware/authMiddleware');


// get all Company
router.get('/api/companies', companyController.getAllCompanies);

// Company Store
router.post('/api/company/store', companyController.createCompany);

// View Company
router.get('/api/company/:id', companyController.getCompanyById);

// Company Delete
router.delete('/api/company/delete/:id', companyController.deleteCompany);

// Admin dashboard
router.get('/api/admin-dashboard', adminControler.homePage);


module.exports = router;