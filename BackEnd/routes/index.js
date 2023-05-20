const express = require('express');
const router = express.Router();
const authRouter = require("./authRouter");
const studentRouter = require("./studentRouter");
const userRouter = require("./userRouter");
const offerRouter = require('./offerRouter');
const verifyJWT = require('../middleware/verifyJWT');

router.use('/auth', authRouter);
router.use('/student', studentRouter);
router.use('/offer', offerRouter);
// router.use(verifyJWT);
router.use('/user', userRouter);

module.exports = router;