const Asset = require('../../../models/Asset');
const { Validator } = require('node-input-validator');
// Helper
const { generateSlugToString } = require('../../helpers/helper');

const storeAsset = async (req, res) => {
    try {
        const { name, category_type_id,purchase_date,purchase_from,warrenty_till_date,asset_code,status } = req.body;
        const validator = new Validator(req.body, {
            name: 'required',   
            category_type_id: 'required',
            purchase_date: 'required',
            purchase_from: 'required',
            warrenty_till_date: 'required',
            asset_code: 'required',
            invoice_copy: 'required',
            images: 'required',
            status: 'required',
        });
        const matched = await validator.check();
        if (!matched) {
            return res.status(422).json(validator.errors);
        }

        const slug = generateSlugToString(name);
        
        const asset = new Asset();

        asset.name = name;
        asset.slug = slug;
        asset.category_type_id = category_type_id;
        asset.purchase_date = purchase_date;
        asset.purchase_from = purchase_from;
        asset.warrenty_till_date = warrenty_till_date;
        asset.asset_code = asset_code;
        asset.invoice_copy = req.files.invoice_copy;
        asset.images = req.files.images;
        asset.status = status;
        await asset.save();

        return res.status(200).json({ message: 'Asset created successfully', data: asset });
    }
    catch (error) {
        return res.status(500).json({ message: 'An error occurred during asset creation', error: error.message });
    }
}
module.exports = { storeAsset }