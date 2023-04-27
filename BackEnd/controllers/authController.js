const User = require('../model/User');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    console.log(username)
    if (!username || !password) {
        return res.status(400).json({ 'message': 'Username and password are required.' });
    }
    const foundUser = await User.findOne({ where: { username: username } });
    if (!foundUser) {
        return res.sendStatus(401); // Unauthorized
    }
    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        const role = foundUser.role;
        console.log(process.env.ACCESS_TOKEN_SECRET);
        // create JWT
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "role": role
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        res.cookie('access_token', accessToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
        return res.status(201).json({ 'success': `${username} Logged in successfully 😊👌.` });
    } else {
        res.sendStatus(401);
    }
}

const handleLogout = async (req, res) => {
    res.clearCookie('access_token');
    return res.status(201).json({ 'success': 'Successfully logged out 😏🍀.' });
}


module.exports = { handleLogin, handleLogout };