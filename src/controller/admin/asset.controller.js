const { Asset } = require('../../../models/Asset');
const { Validator } = require('node-input-validator');
// Common Response
const { response } = require('../../config/response');
// Helper
const { generateSlugToString, generateAssetCode } = require('../../helpers/helper');

const storeAsset = async (req, res) => {
    try {
        const { name, category_type_id, purchase_date, purchase_from, warrenty_till_date, status } = req.body;
        const { images, invoice_copy } = req.file;
        console.log(req.file);
        const validator = new Validator(req.body, {
            name: 'required',
            category_type_id: 'required',
            purchase_date: 'required',
            purchase_from: 'required',
            warrenty_till_date: 'required',
            // asset_code: 'required',
            // invoice_copy: 'required',
            // status: 'required',
        });

        const matched = await validator.check();
        if (!matched) {
            return response(res, validator.errors, 'validation', 422);
        }

        const slug = generateSlugToString(name);
        const assetCode = generateAssetCode(slug, category_type_id,);

        const asset = new Asset();
        asset.name = name;
        asset.slug = slug;
        asset.category_type_id = category_type_id;
        asset.purchase_date = purchase_date;
        asset.purchase_from = purchase_from;
        asset.warrenty_till_date = warrenty_till_date;
        asset.asset_code = assetCode;
        asset.invoice_copy = req.file.filename;
        asset.images = req.file.filename;
        asset.status = status;
        await asset.save();

        return res.status(200).json({ message: 'Asset created successfully', data: asset });
    }
    catch (error) {
        return res.status(500).json({ message: 'An error occurred during asset creation', error: error.message });
    }
}

const getAllAssets = async (req, res) => {
    try {
        const assets = await Asset.findAll();
        console.log('assets are ', assets);
        if (assets.length > 0) {
            res.status(200).json({ message: 'Asset lists fetched successfully', data: assets });
        } else {
            res.status(200).json({ message: 'Asset fetched successfully', data: 'No data found.' });
        }
    } catch (error) {
        console.error('Error fetching assets:', error);
        res.status(500).json({ message: 'An error occurred while fetching asset lists', error: error.message });
    }
}

module.exports = { storeAsset, getAllAssets }