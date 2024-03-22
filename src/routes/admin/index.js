const router = require('express').Router();
const { uploadImg } = require('../../helpers/imageUpload')
const verifyToken = require('../../middleware/authMiddleware');

const adminControler = require('../../controller/admin/index');
const companyController = require('../../controller/admin/company.controller');
const assetAllocationController = require('../../controller/admin/assetAllocation.controller');

// get all Company
router.get('/companies', companyController.getAllCompanies);
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


// get all asset allocation
router.get('/asset-allocation/list', assetAllocationController.getAllAllotedAssets);
// asset allocation
router.post('/asset-allocation', assetAllocationController.assetAllocation);


// Admin dashboard
router.get('/admin-dashboard', adminControler.homePage);


module.exports = router;