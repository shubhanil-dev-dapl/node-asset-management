const sequelize = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Mail = require('../helpers/emailHelper');

// Model
const { Op } = require('sequelize');
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

        const {
            firstName, lastName, email, mobile, role, password, dateOfBirth, gender, address, city, country, postalCode, emergencyContactName, emergencyContactPhone
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const fullName = `${firstName.toLowerCase()}-${lastName.toLowerCase()}`;
        const username = await generateUniqueSlug(fullName);

        const user = await User.create({
            firstName, username, lastName, email, fullName, mobile, role, password: hashedPassword, dateOfBirth, gender, address, city, country, postalCode, emergencyContactName, emergencyContactPhone
        });
        if(user) {
            Mail.sendEmail(email, 'Registration Successful', 'Registration Successful', 'Hello, ' + firstName + ' ' + lastName + '<br> Your username is ' + user.username + ' and password is ' + password);
        }
        res.status(201).json({ message: 'User registered successfully', data: user });
    } catch (error) {
        console.error('An error occurred during registration:', error);
        res.status(500).json({ message: 'An error occurred during registration', error: error.message });
    }
}

// Function to generate unique slug name
async function generateUniqueSlug(name) {
    let username = name;
    let counter = (Math.random() + 1).toString(36).substring(7);
    while (true) {
        const existingUser = await User.findOne({ where: { username } });
        if (!existingUser) {
            break;
        }
        username = `${name}-${counter}`;
        counter++;
    }
    return username;
}

// Forgot Password
const forgotPassword = async (req, res) => {
    try {
        const validator = new Validator(req.body, {
            email: 'required|email'
        });
        const matched = await validator.check();
        if (!matched) {
            return response(res, validator.errors, 'validation', 422);
        }

        let errors = {};
        const { email } = req.body;

        const user = await User.findOne({
            where: {
                [Op.and]: [
                    { status: { [Op.eq]: 'active' } },
                    { email: { [Op.eq]: email } }
                ]
            }
        });
        if (!user) {
            errors['email'] = {
                message: 'The email doesn\'t exists.',
                rule: 'same'
            };
        }

        if (Object.keys(errors).length) {
            return response(res, errors, 'validation', 422);
        }

        user.resetCode = (Math.random() + 1).toString(36).substring(7);
        user.resetExpiries = new Date(Date.now() + (1 * 60 * 60 * 1000)); // Expired in 1 hour;
        await user.save();

        // Mail

        return response(res, user, 'Reset password mail has been sent.', 200);
    } catch (error) {
        return response(res, req.body, error.message, 500);
    }
}

// User login
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username: username } });
        if (!user) {
            return res.status(401).json({ error: 'User not found with this username' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        // date time format
        let current = new Date();
        let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
        let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
        let dateTime = cDate + ' ' + cTime;

        // save otp and otp created at
        user.otp = Math.floor(100000 + Math.random() * 900000);
        user.otpCreatedAt = dateTime;
        await user.save();

        // send otp in email
        Mail.sendEmail(user.email, 'Login OTP', 'Login OTP', 'Hello, ' + user.firstName + ' ' + user.lastName + '<br> Your login OTP is ' + user.otp + '.<br> OTP will expire in 1 minute.');
        res.status(200).json({ message: 'OTP sent successfully to ' + user.email + '.'});
    } catch (error) {
        res.status(500).json({ error: 'Login failed! ' + error });
    }
}
const otpCheck = async (req, res) => {
    try {
        const { otp } = req.body;
        const user = await User.findOne({where: {otp: otp}});
        if (!user) {
            return res.status(401).json({ error: 'Invalid OTP' });
        }
        // Check if OTP is still valid (within 1 minutes)
        const min = 1 ; // 1 minute
        const otpCreationTime = user.otpCreatedAt; 
        const otpExpirationTime = new Date(otpCreationTime.getTime() + min * 60000); 
        const currentTime = new Date();

        // Check if OTP has expired
        if (currentTime > otpExpirationTime) {
            return res.status(401).json({ error: 'OTP expired' });
        }
        // otp null after login
        user.otp = null;
        user.otpCreatedAt = null;
        await user.save();

        // generate token after login
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.setHeader('Authorization', `Bearer ${token}`);
        
        res.status(200).json({ message: 'Login successfully.', token });
        Mail.sendEmail(user.email, 'Login Successful', 'Login Successful', 'Hello, ' + user.firstName + ' ' + user.lastName + '<br> Your login has been successful.');
    } catch (error) {
        res.status(500).json({ error: 'OTP verification failed! ' + error });
    }
}

const dashboard = async (req, res) => {
    const token = req.headers['authorization'];
    console.log(token)
    try {
        res.json({ message: 'Dashboard', token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    register, login, forgotPassword,otpCheck, dashboard
}