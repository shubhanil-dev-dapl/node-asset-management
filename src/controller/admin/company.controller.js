const sequelize = require('../../config/database');

// Model
const { Op } = require('sequelize');
const { Company } = require('../../model/company');

// Common Response
const { response } = require('../../config/response');

// Validator
const { Validator } = require('node-input-validator');

// company registration
const createCompany = async (req, res) => {
    try {
        const validator = new Validator(req.body, {
            name: 'required',
            phone: 'required|digits:10',
            email: 'required|email',
        });

        const matched = await validator.check();
        if (!matched) {
            return response(res, validator.errors, 'validation', 422);
        }

        const { name, email, phone, logo, address, city, country, postalCode } = req.body;

        const company = await Company.create({
            name, email, phone, logo, address, city, country, postalCode
        });

        res.status(201).json({ message: 'Company created successfully', data: company });
    } catch (error) {
        console.error('An error occurred during company registration:', error);
        res.status(500).json({ message: 'An error occurred during company registration', error: error.message });
    }
}

// Delete a company
const deleteCompany = async (req, res) => {
    try {
        const companyId = req.params.id;

        const deletedCompany = await Company.findByIdAndDelete(companyId);

        if (!deletedCompany) {
            return res.status(404).json({ message: 'Company not found' });
        }

        res.json({ message: 'Company deleted successfully', data: deletedCompany });
    } catch (error) {
        console.error('An error occurred during company deletion:', error);
        res.status(500).json({ message: 'An error occurred during company deletion', error: error.message });
    }
}

// Get all companies
const getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        res.json({ data: companies });
    } catch (error) {
        console.error('An error occurred while fetching companies:', error);
        res.status(500).json({ message: 'An error occurred while fetching companies', error: error.message });
    }
}

// Get company by ID
const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;

        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        res.json({ data: company });
    } catch (error) {
        console.error('An error occurred while fetching company:', error);
        res.status(500).json({ message: 'An error occurred while fetching company', error: error.message });
    }
}


module.exports = {
    createCompany, getAllCompanies, getCompanyById, deleteCompany
}