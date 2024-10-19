const router = require('express').Router();

const { dbConnection } = require ('../../server');
const verifyToken = require("./verifyToken");

router.post('/api/getCustomers', verifyToken, async (req, res) => {

    try {
        const query = `SELECT * FROM customer`;

        const [result] = await dbConnection.promise().query(query);

        res.send(result);
    } catch (error) {
        console.error("Unable to execute getCustomers query!", error);
        return res.status(400);
    }

});

module.exports = router;