const {allowedEmails} = require("../../server");
const verifyGoogleToken = require("../utils/googleutils");

async function verifyToken(req, res, next) {

    const token = req.cookies.token;

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
        console.log("error: " + error);
        return res.status(403).json({ message: 'Token not valid!' });
    }
}

module.exports = verifyToken;