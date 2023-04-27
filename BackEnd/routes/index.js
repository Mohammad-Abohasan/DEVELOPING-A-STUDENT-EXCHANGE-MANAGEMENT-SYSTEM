const express = require('express');
const router = express.Router();
const userRouter = require("./userRouter");
const authRouter = require("./authRouter");
const verifyJWT = require('../middleware/verifyJWT');

router.use('/auth', authRouter);
router.use(verifyJWT);
router.use('/user', userRouter);

module.exports = router;