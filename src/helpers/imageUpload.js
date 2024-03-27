const multer = require("multer");
const path = require('path')
const PDFDocument = require("pdf-lib").PDFDocument;
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + process.env.PROJECT_FOLDER_NAME + '-' + uniqueSuffix + path.extname(file.originalname))
    }
});

const maxSize = 10 * 1024 * 1024;

const uploadImg = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
            cb(new Error('only jpg, jpeg, png are allowed'));
        }
    },
    limits: { fileSize: maxSize }
});

const pdfStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/files/')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + process.env.PROJECT_FOLDER_NAME + '-' + uniqueSuffix + path.extname(file.originalname))
    }
});

const pdfMaxSize = 10 * 1024 * 1024; // 10 megabytes in bytes

const uploadPdf = multer({
    storage: pdfStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(null, false);
            cb(new Error('Only PDF files are allowed.'));
        }
    },
    limits: { fileSize: pdfMaxSize }
});

const compressProcess = async (existingPdfBytes, originalName) => {
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const compressedPdfBytes = await pdfDoc.save();
    fs.writeFileSync(`${originalName}`, compressedPdfBytes);
};

module.exports = { uploadImg, uploadPdf, compressProcess }