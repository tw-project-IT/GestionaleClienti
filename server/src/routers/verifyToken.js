const jwt = require('jsonwebtoken');
const { secret } = require("../../server");

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.send({ error: 'invalid_token' })
    }

    jwt.verify(token, secret, function(err, decoded) {
        if (err) {
            console.log(err)
            if (err.name === 'TokenExpiredError') {
                return res.send({ error: 'token_expired' });
            } else if (err.name === 'JsonWebTokenError') {
                return res.send({ error: 'invalid_token' });
            } else {
                return res.send({ error: 'internal_server_error' });
            }
        }

        req.decoded = decoded;

        next();
    });
}

module.exports = verifyToken;
