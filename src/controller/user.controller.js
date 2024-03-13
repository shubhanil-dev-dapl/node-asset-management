const sequelize = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../model/user');

// Validator
const { Validator } = require('node-input-validator');

// Common Response
const { response } = require('../config/response');

// User registration
const register = async (req, res) => {
    try {
        const validator = new Validator(req.body, {
            firstName: 'required',
            lastName: 'required',
            mobile: 'required|digits:10',
            email: 'required|email',
            password: 'required',
        });
        
        const matched = await validator.check();
        if (!matched) {
            return response(res, validator.errors, 'validation', 422);
        }

        let errors = {};
        const {
            firstName, lastName, email, mobile, role, password, dateOfBirth, gender, address, city, country, postalCode, emergencyContactName, emergencyContactPhone
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const fullName = firstName + ' ' + ' ' + lastName;
        const username = firstName + lastName.toLowerCase();

        const user = new User({
            firstName, username, lastName, email, fullName, mobile, role, password: hashedPassword, dateOfBirth, gender, address, city, country, postalCode, emergencyContactName, emergencyContactPhone
        });
        await user.save();

        res.status(201).json({ message: 'User registered successfully', data: user });
    } catch (error) {
        console.error('An error occurred during registration:', error);
        res.status(500).json({ message: 'An error occurred during registration', error: error.message });
    }
}

// User login
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.status(200).json({ message: 'Login successfully.', token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed!' });
    }
}

// Function to generate unique slug name
async function generateUniqueSlug(name, index = 0) {
    const slug = index === 0 ? name.toLowerCase().replace(/\s+/g, '-') : `${name.toLowerCase().replace(/\s+/g, '-')}-${index}`;
    const existingUser = await User.findOne({ where: { username: slug } });
    if (!existingUser) {
        return slug;
    }
    return generateUniqueSlug(name, index + 1);
}

async function dashboard(req, res) {
    try {
        res.json({ message: 'Dashboard' , 'data': req.userId});
    } catch (error) {
        throw error
    }
}

module.exports = {
    register, login , dashboard
}