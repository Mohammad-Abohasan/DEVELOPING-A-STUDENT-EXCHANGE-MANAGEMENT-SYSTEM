const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ 'message': 'Username and password are required.' });
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
        User.create({ username, role: "Student", password: hashedPassword });
        res.status(201).json({ 'success': `New user ${username} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };