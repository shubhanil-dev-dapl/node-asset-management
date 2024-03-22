
// Model
const { Op } = require('sequelize');
const { AssetAllocation } = require('../../../models/AssetAllocation');

// Common Response
const { response } = require('../../config/response');

// Validator
const { Validator } = require('node-input-validator');


// Get all alloted Assets
const getAllotedAssets = async (req, res) => {
    try {

        const allotedAssets = await AssetAllocation.findAll();
        if (allotedAssets.length > 0) {
            res.status(200).json({ message: 'Alloted asset lists fetched successfully', data: allotedAssets });
        } else {
            res.status(200).json({ message: 'Alloted asset fetched successfully', data: 'No data found.' });
        }
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
const getAllotedAssetById = async (req, res) => {
    try {
        const assetId = req.params.id;

        const allotedAsset = await AssetAllocation.findOne({ where: { id: assetId } });

        if (!allotedAsset) {
            return res.status(404).json({ message: `Alloted asset not found with this id : ${assetId}` });
        }

        res.json({ data: allotedAsset });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching alloted asset', error: error.message });
    }
}


// Update Asset Type by ID
const updateAllotedAssetById = async (req, res) => {
    try {
        const { id } = req.params;

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

        const allotedAsset = await AssetAllocation.findOne({ where: { id: id } });

        const assetIdCount = await AssetAllocation.findOne({
            where: {
                [Op.and]: [
                    { assetId: { [Op.eq]: assetId } },
                ]
            }
        });

        if (assetIdCount.length > 0) {
            errors['assetId'] = {
                message: `The asset_id : ${assetIdCount.assetId} already alloted to this user, user_id : ${allotedAsset.userId}.`,
            };
        }

        if (Object.keys(errors).length > 0) {
            return response(res, errors, 'validation', 422);
        }

        // Update company data
        allotedAsset.assetId = assetId;
        allotedAsset.userId = userId;
        // allotedAsset.allocationFromDate = allocationFromDate ?? '';
        // allotedAsset.allocationToDate = allocationToDate ?? '';
        allotedAsset.allocatedBy = allocatedBy;
       await allotedAsset.save();

        res.status(200).json({ message: 'Asset alloted updated successfully. Need to change for validation', data: allotedAsset });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred during Asset allocation update', error: error.message });
    }
};

// Delete a alloted Asset
const deleteAllotedAssetById = async (req, res) => {
    try {
        const allotedAssetId = req.params.id;

        const allotedAsset = await AssetAllocation.destroy({
            where: {
                id: allotedAssetId
            },
        });

        if (!allotedAsset) {
            return res.status(404).json({ message: `alloted asset not found with this id : ${allotedAssetId}` });
        }

        res.json({ message: 'Alloted asset deleted successfully', data: allotedAsset });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred during alloted asset deletion', error: error.message });
    }
}


module.exports = {
    getAllotedAssets, assetAllocation, getAllotedAssetById, updateAllotedAssetById, deleteAllotedAssetById
}