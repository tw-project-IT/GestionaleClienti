const {allowedEmails} = require("../../server");
const verifyGoogleToken = require("../utils/googleutils");
const router = require('express').Router();

router.post('/api/login', async (req, res) => {

    const { token } = req.body;

    try {
        const decoded = await verifyGoogleToken(token);
        const email = decoded["email"];

        if (!allowedEmails.includes(email)) {
            return res.status(403).json({ message: 'You are not authorized to join!' });
        }

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 604800000,
            sameSite: 'strict'
        });

        return res.status(200).json({ message: 'Login success' });
    } catch (error) {
        return res.status(403).json({ message: 'Token not valid!' });
    }
});

module.exports = router;