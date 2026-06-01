const router = require('express').Router();

const { dbConnection } = require ('../../server');
const verifyToken = require("../utils/verifyToken");

router.post('/api/deleteCustomer', verifyToken, async (req, res) => {

    try {
        const id = req.body.id;
        if (!id) return res.send({ error: 'invalid_parameter' });

        let query = `DELETE FROM customer WHERE id = ?;`;

        const [result] = await dbConnection.promise().query(query, [id]);

        res.send(result);
    } catch (error) {
        console.error("Unable to execute deleteCustomer query!", error);
        return res.status(400);
    }

});

module.exports = router;
