const router = require('express').Router();

const adminControler = require('../../controller/admin/index');
const companyController = require('../../controller/admin/company.controller');

const verifyToken = require('../../middleware/authMiddleware');


// get all Company
router.get('/companies', companyController.getAllCompanies);

// Company Store
router.post('/company/store', companyController.createCompany);

// View Company
router.get('/company/:id', companyController.getCompanyById);

// Company Delete
router.delete('/company/delete/:id', companyController.deleteCompany);

// Admin dashboard
router.get('/admin-dashboard', adminControler.homePage);


module.exports = router;