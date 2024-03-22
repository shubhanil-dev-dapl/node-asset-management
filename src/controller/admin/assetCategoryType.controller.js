
// Model
const { Op } = require('sequelize');
const { AssetCategoryType } = require('../../../models/AssetCategoryType');

// Common Response
const { response } = require('../../config/response');

// Validator
const { Validator } = require('node-input-validator');

// Helper
const { generateSlugToString } = require('../../helpers/helper');

// Get all Asset Types
const getAllAssetTypes = async (req, res) => {
    try {

        const assetTypes = await AssetCategoryType.findAll();
        if (assetTypes.length > 0) {
            res.status(200).json({ message: 'Asset Types lists fetched successfully', data: assetTypes });
        } else {
            res.status(200).json({ message: 'Asset Types lists fetched successfully', data: 'No data found.' });
        }
    } catch (error) {
        console.error('Error fetching Asset Types:', error);
        res.status(500).json({ message: 'An error occurred while fetching Asset Types lists', error: error.message });
    }
}

// Asset Types create
const storeAssetType = async (req, res) => {
    try {
        const { name } = req.body;

        const validator = new Validator(req.body, {
            name: 'required',
        });

        const matched = await validator.check();
        if (!matched) {
            return response(res, validator.errors, 'validation', 422);
        }

        let errors = {};

        const slug = generateSlugToString(name);

        const nameCount = await AssetCategoryType.count({
            where: {
                [Op.and]: [
                    { slug: { [Op.eq]: slug } }
                ]
            }
        });

        if (nameCount > 0) {
            errors['name'] = {
                message: `The ${name} already exits!.`,
            };
        }

        if (Object.keys(errors).length > 0) {
            return response(res, errors, 'validation', 422);
        }

        const assetType = new AssetCategoryType();
        assetType.name = name;
        assetType.slug = slug;
        assetType.save();

        res.status(201).json({ message: 'Asset type created successfully.', data: assetType });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred during asset allocation', error: error });
    }
}


// Get Asset Types by ID
const getAssetTypeById = async (req, res) => {
    try {
        const assetTypeId = req.params.id;

        const assetType = await AssetCategoryType.findOne({ where: { id: assetTypeId } });

        if (!assetType) {
            return res.status(404).json({ message: 'Asset Types not found.' });
        }

        res.status(200).json({ message: 'Asset type found successfully.', data: assetType });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching Asset Types', error: error.message });
    }
}


// Update Asset Type by ID
const updateCompanyById = async (req, res) => {
    try {
        let errors = {};
        const { id } = req.params;
        const { name } = req.body;

        // Check if the assetType with the given ID exists
        const assetType = await AssetCategoryType.findOne({ where: { id: id } });

        const slug = generateSlugToString(name);

        const nameCount = await AssetCategoryType.count({
            where: {
                [Op.and]: [
                    { slug: { [Op.eq]: slug } }
                ]
            }
        });

        if (nameCount > 0) {
            errors['name'] = {
                message: `The ${name} already exits!.`,
            };
        }

        if (Object.keys(errors).length) {
            return response(res, errors, 'validation', 422);
        }

        if (!assetType) {
            return response(res, { message: `Asset type not found with this id : ${id}` }, 'error', 404);
        }

        // Update asset type data
        assetType.name = name || assetType.name;
        assetType.slug = slug || assetType.slug;
        await assetType.save();

        res.status(200).json({ message: 'asset type updated successfully', data: assetType });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred during asset type update', error: error.message });
    }
};


// Delete a Asset Type
const deleteAssetType = async (req, res) => {
    try {
        const assetTypeId = req.params.id;

        const deletedAssetType = await AssetCategoryType.destroy({
            where: {
                id: assetTypeId
            },
        });

        if (!deletedAssetType) {
            return res.status(404).json({ message: `Asset type not found with this id : ${assetTypeId}` });
        }

        res.json({ message: 'Asset type deleted successfully', data: deletedAssetType });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred during asset type deletion', error: error.message });
    }
}


module.exports = {
    getAllAssetTypes, storeAssetType, getAssetTypeById, updateCompanyById, deleteAssetType
}