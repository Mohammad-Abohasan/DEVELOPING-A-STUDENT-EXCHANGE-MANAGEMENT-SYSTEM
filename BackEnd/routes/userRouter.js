const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/addUser', userController.handleNewUser);
router.get('/forgetPassword', userController.forgetPassword);

module.exports = router;