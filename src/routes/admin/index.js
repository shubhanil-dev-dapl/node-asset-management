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
router.get('/company/:id', verifyToken, companyController.getCompanyById);

// PUT /api/company/update/:id - Update Company by ID
router.put('/company/update/:id', uploadImg.single('logo'), verifyToken, companyController.updateCompanyById);

// Company Delete
router.delete('/company/delete/:id', verifyToken, companyController.deleteCompany);

// Admin dashboard
router.get('/admin-dashboard', adminControler.homePage);


module.exports = router;