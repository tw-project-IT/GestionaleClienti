const router = require('express').Router();

const { dbConnection } = require ('../../server');

router.post('/api/getCustomers', async (req, res) => {

    try {
        const query = `SELECT * FROM customer`;

        const [result] = await dbConnection.promise().query(query);

        res.send(result);
    } catch (error) {
        console.error("Unable to execute getCustomers query!", error);
        return res.send({ error: 'query_error' });
    }

});

module.exports = router;