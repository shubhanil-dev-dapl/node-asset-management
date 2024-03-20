const sequelize = require('../../config/database');

// Model
const { Op } = require('sequelize');
const { AssetAllocation } = require('../../../models/AssetAllocation');

// Common Response
const { response } = require('../../config/response');

// Validator
const { Validator } = require('node-input-validator');