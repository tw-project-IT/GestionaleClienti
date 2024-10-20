const { OAuth2Client } = require('google-auth-library');
const {allowedEmails} = require("../../server");

const CLIENT_ID = "1056041880555-v4bc1nqh1dn2gmt21hk3tp98uffcpuv2.apps.googleusercontent.com";

const client = new OAuth2Client(CLIENT_ID);

async function verifyGoogleToken(token) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        return ticket.getPayload();
    } catch (error) {
        console.error('Token non valido: ', error);
        throw new Error('Token not valid');
    }
}

async function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    try {
        const decoded = await verifyGoogleToken(token);

        const email = decoded["email"];

        if (!allowedEmails.includes(email)) {
            return res.status(403).json({ message: 'You are not authorized to join!' });
        }

        // req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token not valid!' });
    }
}

module.exports = verifyToken;
