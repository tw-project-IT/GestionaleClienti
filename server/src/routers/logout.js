const router = require('express').Router();

const verifyToken = require("../utils/verifyToken");

router.post('/api/logout', verifyToken, async (req, res) => {

    try {
        res.clearCookie('token');

        return res.status(200).json({ message: 'Logout success' });
    } catch (error) {
        console.error("Unable to logout!", error);
        return res.status(400);
    }

});

module.exports = router;