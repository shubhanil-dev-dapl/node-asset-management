const sequelize = require('../../config/database');

const fs = require("fs");


// Model
const { Op } = require('sequelize');
// const { Company } = require('../../model/company');
const { Company } = require('../../../models/Company');

// Common Response
const { response } = require('../../config/response');

// Validator
const { Validator } = require('node-input-validator');

// company registration
const createCompany = async (req, res) => {
    try {
        // console.log(req.file.filename);
        const { name, email, phone, logo, address, city, country, postalCode } = req.body;

        const validator = new Validator(req.body, {
            name: 'required',
            phone: 'required|digits:10',
            email: 'required|email',
        });

        const matched = await validator.check();
        if (!matched) {
            return response(res, validator.errors, 'validation', 422);
        }

        let errors = {};

        const emailCount = await Company.count({
            where: {
                [Op.and]: [
                    { status: { [Op.eq]: 'active' } },
                    { email: { [Op.eq]: email } }
                ]
            }
        });

        if (emailCount > 0) {
            errors['email'] = {
                message: 'The email already exists.',
                rule: 'unique'
            };
        }

        const userMobileCount = await Company.count({
            where: {
                [Op.and]: [
                    { status: { [Op.eq]: 'active' } },
                    { phone: { [Op.eq]: phone } }
                ]
            }
        });

        if (userMobileCount > 0) {
            errors['mobile'] = {
                message: 'The phone number already exists.',
                rule: 'unique'
            };
        }

        if (Object.keys(errors).length > 0) {
            return response(res, errors, 'validation', 422);
        }

        const company = new Company();

        company.name = name;
        company.email = email;
        company.phone = phone;
        company.logo = req.file.filename;
        company.address = address;
        company.city = city;
        company.country = country;
        company.postalCode = postalCode;
        company.save();

        res.status(201).json({ message: 'Company created successfully', data: company });

    } catch (error) {
        res.status(500).json({ message: 'An error occurred during company registration', error: error.message });
    }
}

// Get all companies
const getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.findAll();
        if (companies.length > 0) {
            res.status(201).json({ message: 'Companies are : ', data: companies });
        } else {
            res.status(201).json({ message: 'Now, there have no company.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching companies', error: error.message });
    }
}

// Get company by ID
const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;

        const company = await Company.findOne({ where: { id: companyId } });

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        res.json({ data: company });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching company', error: error.message });
    }
}

// Update company by ID
const updateCompanyById = async (req, res) => {
    try {
        let errors = {};
        const { id } = req.params;
        const { name, email, phone, logo, address, city, country, postalCode } = req.body;

        // Check if the company with the given ID exists
        const company = await Company.findOne({ where: { id: id } });

        const emailCount = await Company.count({
            where: {
                [Op.and]: [
                    { email: { [Op.eq]: email } },
                    { id: { [Op.ne]: id } }
                ]
            }
        });
        if (emailCount > 0) {
            errors['email'] = {
                message: 'The email already exists.',
                rule: 'unique'
            };
        }

        if (Object.keys(errors).length) {
            return response(res, errors, 'validation', 422);
        }

        if (!company) {
            return response(res, { message: 'Company not found' }, 'error', 404);
        }

        // Update company data
        company.name = name || company.name;
        company.email = email || company.email;
        company.phone = phone || company.phone;
        company.logo = logo ? req.file.filename : company.logo;
        company.address = address || company.address;
        company.city = city || company.city;
        company.country = country || company.country;
        company.postalCode = postalCode || company.postalCode;
        await company.save();

        res.status(200).json({ message: 'Company updated successfully', data: company });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred during company update', error: error.message });
    }
};

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
    createCompany, getAllCompanies, getCompanyById, updateCompanyById, deleteCompany
}