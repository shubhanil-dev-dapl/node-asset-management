const router = require('express').Router();
const fs = require("fs");
const { uploadImg, uploadPdf, compressProcess } = require('../../helpers/imageUpload')
const verifyToken = require('../../middleware/authMiddleware');

// Controllers
const adminControler = require('../../controller/admin/index');
const companyController = require('../../controller/admin/company.controller');
const assetAllocationController = require('../../controller/admin/assetAllocation.controller');
const assetController = require('../../controller/admin/asset.controller');
const assetTypesController = require('../../controller/admin/assetCategoryType.controller')


//store asset
router.post('/asset/store', uploadPdf.single('invoice_copy'), assetController.storeAsset);
// router.post('/asset/store', uploadImg.single('invoice_copy'), uploadPdf, async (req, res) => {
//     // Call compressProcess after file upload
//     const filePath = `./public/uploads/files/${req.file.filename}`;
//     const existingPdfBytes = fs.readFileSync(filePath);
//     await compressProcess(existingPdfBytes, filePath);

//     // Now you can continue with your assetController logic
//     assetController.storeAsset(req, res);
// });
// get all asset list
router.get('/asset/lists', assetController.getAllAssets);


// get all Company
router.get('/companies', companyController.getAllCompanies);
// Company Store with Single Image
router.post('/company/store', uploadImg.single('logo'), companyController.createCompany);
// with Multple image
// router.post('/company/store', uploads.array('logo', 4), verifyToken, companyController.createCompany);
// View Company
router.get('/company/show/:id', verifyToken, companyController.getCompanyById);
// PUT - Update Company by ID
router.put('/company/update/:id', uploadImg.single('logo'), verifyToken, companyController.updateCompanyById);
// Company Delete
router.delete('/company/delete/:id', verifyToken, companyController.deleteCompany);


// get all asset Types
router.get('/asset-type/list', assetTypesController.getAllAssetTypes);
// asset Types
router.post('/asset-type/store', assetTypesController.storeAssetType);
// View asset Types
router.get('/asset-type/show/:id', assetTypesController.getAssetTypeById);
// update asset types
router.put('/asset-type/update/:id', assetTypesController.updateCompanyById);
// asset Types Delete
router.delete('/asset-type/delete/:id', assetTypesController.deleteAssetType);


// get all asset allocation
router.get('/asset-allocation/list', assetAllocationController.getAllotedAssets);
// asset allocation
router.post('/asset-allocation/store', assetAllocationController.assetAllocation);
// View asset allocation
router.get('/asset-allocation/show/:id', assetAllocationController.getAllotedAssetById);
// update asset allocation
router.put('/asset-allocation/update/:id', assetAllocationController.updateAllotedAssetById);
// asset allocation Delete
router.delete('/asset-allocation/delete/:id', assetAllocationController.deleteAllotedAssetById);


// Admin dashboard
router.get('/admin-dashboard', adminControler.homePage);


module.exports = router;