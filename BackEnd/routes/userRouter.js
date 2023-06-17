const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/addUser', userController.handleNewUser);
router.post('/forgotPassword', userController.forgotPassword);
router.post('/sendEmail', userController.sendEmailFromUR);
router.post('/resetPassword/:resetToken', userController.resetPassword);

module.exports = router;