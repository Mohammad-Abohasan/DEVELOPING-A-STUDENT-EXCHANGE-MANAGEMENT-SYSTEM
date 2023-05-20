const User = require('../model/User');
const Student = require('../model/Student');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { Model } = require('sequelize');
require('dotenv').config();

const handleNewUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            'message': 'Username and password are required.'
        });
    }
    // check for duplicate usernames in the database
    const duplicate = await User.findOne({
        where: {
            username: username
        }
    });
    if (duplicate) {
        return res.sendStatus(409); // Conflict
    }
    try {
        // encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // store the new user
        User.create({
            username,
            role: "Student",
            password: hashedPassword
        });
        res.status(201).json({
            'success': `New user ${username} created!`
        });
    } catch (err) {
        res.status(500).json({
            'message': err.message
        });
    }
}

const resetPassword = async (req, res) => {
    const username = req.user;
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const foundUser = await User.findOne({
        where: {
            username: username
        }
    });
    const isPasswordMatch = await bcrypt.compare(oldPassword, foundUser.password);
    if (!isPasswordMatch) {
        return res.status(401).json({ "message": 'Incorrect old password' });
    }
    if (newPassword !== confirmPassword) {
        return res.status(401).json({ "message": 'Please confirm new password' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.update({ password: hashedPassword }, {
        where: {
            username
        }
    });
    return res.status(200).json({ "message": 'Password changed successfully!' });
}

const sendEmail = (email, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mohammadExchStudents@gmail.com',
            pass: 'fngefozjczeldfck'
        }
    });

    const mailOptions = {
        from: 'mohammadExchStudents@gmail.com',
        to: email,
        subject: 'Password Reset',
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error occurred while sending email:', error.message);
        } else {
            console.log('Email sent successfully:', info.response);
        }
    });
}

const forgetPassword = async (req, res) => {
    const username = req.body.username;
    const foundUser = await User.findOne({
        where: {
            username: username
        },
        include: [
            {
                model: Student,
                attributes: ['email']
            }
        ]
    });
    if (!foundUser) {
        return res.status(401).json({ "message": 'username does not exist' });
    }
    email = foundUser.student.email;
    const resetToken = jwt.sign(
        {
            "UserInfo": {
                "username": foundUser.username,
                "role": foundUser.role
            }
        },
        process.env.RESET_TOKEN_SECRET,
        { expiresIn: '15m' }
    );
    const link = `http://localhost:3000/reset-password/${foundUser.username}/${resetToken}`
    sendEmail(email, link);
    return res.status(200).json({ "message": 'Password reset link has been sent to your email' });
}

module.exports = { handleNewUser, resetPassword, sendEmail, forgetPassword };