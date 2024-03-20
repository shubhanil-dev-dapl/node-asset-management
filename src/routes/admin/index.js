const router = require('express').Router();

const adminControler = require('../../controller/admin/index');
const companyController = require('../../controller/admin/company.controller');
const { uploadImg } = require('../../helpers/imageUpload')

const verifyToken = require('../../middleware/authMiddleware');


// get all Company
router.get('/companies', verifyToken, companyController.getAllCompanies);

// Company Store with Single Image
router.post('/company/store', uploadImg.single('logo'), verifyToken, companyController.createCompany);

// with Multple image
// router.post('/company/store', uploads.array('logo', 4), verifyToken, companyController.createCompany);

// View Company
router.get('/company/:id', companyController.getCompanyById);

// Company Delete
router.delete('/company/delete/:id', companyController.deleteCompany);

// Admin dashboard
router.get('/admin-dashboard', adminControler.homePage);


module.exports = router;