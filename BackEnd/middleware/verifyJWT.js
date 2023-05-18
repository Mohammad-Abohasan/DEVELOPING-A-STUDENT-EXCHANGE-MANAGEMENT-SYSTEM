const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    // console.log(authHeader);
    if (!authHeader?.startsWith('Bearer ')) {
        return res.sendStatus(401);
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.sendStatus(401);
    }
    // evaluate jwt
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                return res.sendStatus(403); // invalid token
            }
            req.user = decoded.UserInfo.username;
            req.role = decoded.UserInfo.role;
            next();
        }
    )
}

module.exports = verifyJWT;