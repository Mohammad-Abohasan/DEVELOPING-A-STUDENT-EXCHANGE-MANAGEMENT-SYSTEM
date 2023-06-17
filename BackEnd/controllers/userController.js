const User = require('../model/User');
const Student = require('../model/Student');
const University = require('../model/University');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const axios = require("axios");
const Offer = require('../model/Offer');

const handleNewUser = async (req, res) => {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
        return res.status(400).json({
            'message': 'Username, password, and role are required.'
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
            role,
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
    const resetToken = req.params.resetToken;
    const { newPassword, confirmPassword } = req.body;
    // const foundUser = await User.findOne({
    //     where: {
    //         username: username
    //     }
    // });
    // const isPasswordMatch = await bcrypt.compare(oldPassword, foundUser.password);
    // if (!isPasswordMatch) {
    //     return res.status(401).json({ "message": 'Incorrect old password' });
    // }
    jwt.verify(
        resetToken,
        process.env.RESET_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = decoded.username;
            const username = req.user;
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
    )
}

const sendEmailFromUR = async (req, res) => {
    try {
        const offerID = req.body.offer_id;
        const studentID = req.body.student_id;
        const text = req.body.msg;
        // console.log(offerID, studentID, text)
        const offer = await Offer.findOne({
            where: { 
                id: offerID 
            },
            include: [
                {
                    model: University,
                    as: 'university_src',
                    attributes: ['name']
                }
            ]
        });
        const student = await Student.findByPk(studentID);
        const msg = `<p>Dear ${student.name},</p> 
            <p>${text}</p>
            <p>Regards,</p>`;
        sendEmail(student.email, `${offerID} ${offer.university_src.name}`, msg);
        await res.status(200).json({
            'message': 'Done',
        });
    } catch (err) {
        res.status(500).json({
            'message': err.message
        });
    }
}
const sendEmail = (email, subject, text) => {

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
        subject: subject,
        text: text,
        html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>NodeMailer Email Template</title>
            <style>
              .container {
                width: 100%;
                height: 100%;
                padding: 20px;
                background-color: #f4f4f4;
              }
              .email {
                width: 80%;
                margin: 0 auto;
                background-color: #fff;
                padding: 20px;
              }
              .email-header {
                background-color: #333;
                color: #fff;
                padding: 20px;
                text-align: center;
              }
              .email-body {
                padding: 20px;
              }
              .email-footer {
                background-color: #333;
                color: #fff;
                padding: 20px;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="email">
                <div class="email-header">
                  <h1>AArU</h1>
                </div>
                <div class="email-body">
                  <p>${text}</p>
                </div>
                <div class="email-footer">
                  <p>Mohammad Abohasan</p>
                </div>
              </div>
            </div>
          </body>
        </html>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error occurred while sending email:', error.message);
        } else {
            console.log('Email sent successfully:', info.response);
        }
    });
}

const forgotPassword = async (req, res) => {
    const { username, recaptchaResponse } = req.body;
    try {
        const verificationResponse = await axios.post(
            "https://www.google.com/recaptcha/api/siteverify",
            null,
            {
                params: {
                    secret: `${process.env.REACT_APP_SECRET_KEY}`,
                    response: recaptchaResponse,
                },
            }
        );

        console.log(verificationResponse.data)

        if (verificationResponse.data.success) {
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
                    "username": foundUser.username
                },
                process.env.RESET_TOKEN_SECRET,
                { expiresIn: '15m' }
            );
            const link = `http://localhost:3000/resetPassword/${resetToken}`;
            const msg = `<p>Hello!</p> 
            <p>You have requested to reset your password.</p>
            <p>Click the link below to proceed with the password reset process (valid 15 mins):</p>
            <a href="${link}">Reset password</a>
            <p>If you didn't request this password reset, please ignore this email.</p>
            <p>Thank you!</p>`;
            sendEmail(email, 'Reset Password', msg);
            return res.status(200).json({ "message": 'Password reset link has been sent to your email' });
        } else {
            return res.status(403).json({ error: "Invalid reCAPTCHA response" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error verifying reCAPTCHA");
    }
}

module.exports = { handleNewUser, resetPassword, sendEmail, sendEmailFromUR, forgotPassword };