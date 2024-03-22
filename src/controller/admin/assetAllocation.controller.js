
// Model
const { Op } = require('sequelize');
const { AssetAllocation } = require('../../../models/AssetAllocation');

// Common Response
const { response } = require('../../config/response');

// Validator
const { Validator } = require('node-input-validator');


// Get all alloted Assets
const getAllAllotedAssets = async (req, res) => {
    try {

        const allotedAssets = await AssetAllocation.findAll();

        res.status(200).json({ message: 'Alloted asset lists fetched successfully', data: allotedAssets });
    } catch (error) {
        console.error('Error fetching alloted assets:', error);
        res.status(500).json({ message: 'An error occurred while fetching alloted asset lists', error: error.message });
    }
}

// asset allocation
const assetAllocation = async (req, res) => {
    try {
        const { assetId, userId, allocationFromDate, allocationToDate, allocatedBy } = req.body;

        const validator = new Validator(req.body, {
            assetId: 'required',
            userId: 'required',
        });

        const matched = await validator.check();
        if (!matched) {
            return response(res, validator.errors, 'validation', 422);
        }

        let errors = {};

        const assetIdCount = await AssetAllocation.count({
            where: {
                [Op.and]: [
                    { assetId: { [Op.eq]: assetId } },
                    { userId: { [Op.eq]: userId } }
                ]
            }
        });

        if (assetIdCount > 0) {
            errors['assetId'] = {
                message: 'The asset_id already alloted to this user.',
            };
        }

        if (Object.keys(errors).length > 0) {
            return response(res, errors, 'validation', 422);
        }

        const allotedAsset = new AssetAllocation();
        allotedAsset.assetId = assetId;
        allotedAsset.userId = userId;
        // allotedAsset.allocationFromDate = allocationFromDate ?? '';
        // allotedAsset.allocationToDate = allocationToDate ?? '';
        allotedAsset.allocatedBy = allocatedBy;
        allotedAsset.save();

        res.status(201).json({ message: 'Asset alloted successfully', data: allotedAsset });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred during asset allocation', error: error });
    }
}


// Get alloted asset by ID
const getallotedAssetById = async (req, res) => {
    try {
        const assetId = req.params.id;

        const allotedAsset = await AssetAllocation.findOne({ where: { id: assetId } });

        if (!allotedAsset) {
            return res.status(404).json({ message: 'Alloted asset not found' });
        }

        res.json({ data: allotedAsset });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching alloted asset', error: error.message });
    }
}


// Delete a company
const deleteCompany = async (req, res) => {
    try {
        const companyId = req.params.id;

        const deletedCompany = await Company.destroy({
            where: {
                id: companyId
            },
        });

        if (!deletedCompany) {
            return res.status(404).json({ message: 'Company not found' });
        }

        res.json({ message: 'Company deleted successfully', data: deletedCompany });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred during company deletion', error: error.message });
    }
}


module.exports = {
    getAllAllotedAssets, assetAllocation, getallotedAssetById
}