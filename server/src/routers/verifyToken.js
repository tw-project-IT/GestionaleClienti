const jwt = require('jsonwebtoken');
const { secret } = require("../../server");

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    jwt.verify(token, secret, { algorithms: ['RS256'] }, function(err) {
        if (err) {
            console.log(err)
            console.log(token)

            return res.status(403).json({ message: 'Invalid token' });
        }

        next();
    });
}

module.exports = verifyToken;
