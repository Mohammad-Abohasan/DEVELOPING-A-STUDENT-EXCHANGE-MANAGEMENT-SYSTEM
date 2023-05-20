const User = require('../model/User');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            'message': 'Username and password are required.'
        });
    }
    const foundUser = await User.findOne({
        where: {
            username: username
        }
    });
    if (!foundUser) {
        return res.sendStatus(401); // Unauthorized
    }
    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        const role = foundUser.role;
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
        res.json({ accessToken });
        //     httpOnly: true,
        //     sameSite: 'None',
        //     maxAge: 24 * 60 * 60 * 1000
        // });
        // return res.status(201).json({
        //     'success': `${username} Logged in successfully 😊👌.`
        // });
    } else {
        res.sendStatus(401);
    }
}

const handleLogout = async (req, res) => {
    return res.status(201).json({
        'success': 'Successfully logged out 😏🍀.'
    });
}


module.exports = { handleLogin, handleLogout };