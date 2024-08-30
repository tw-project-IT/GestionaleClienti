const router = require('express').Router();

const { dbConnection } = require ('../../server');

router.post('/api/getBoilers', async (req, res) => {

    try {
        const query = `
            SELECT boiler.*, CONCAT(customer.firstname, " ", customer.lastname) AS customer
            FROM boiler
            JOIN customer ON boiler.customer = customer.id
        `;

        const [result] = await dbConnection.promise().query(query);

        res.send(result);
    } catch (error) {
        console.error("Unable to execute getBoilers query!", error);
        return res.send({ error: 'query_error' });
    }

});

module.exports = router;