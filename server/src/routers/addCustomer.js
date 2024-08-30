const router = require('express').Router();

const { dbConnection } = require ('../../server');

router.post('/api/addCustomer', async (req, res) => {

    try {
        const firstname = req.body.firstName;
        const lastname = req.body.lastName;

        if (!firstname || !lastname) {
            console.error("First or last name not specified!");
            return res.send({ error: 'query_error' });
        }

        const telephone = req.body.telephone;
        const email = req.body.email;
        const address = req.body.address;

        let query = `INSERT INTO customer (firstname, lastname, telephone, email, address) VALUES (?, ?, ?, ?, ?);`;

        const [result] = await dbConnection.promise().query(query, [firstname, lastname, telephone, email, address]);

        res.send(result);
    } catch (error) {
        console.error("Unable to execute addCustomer query!", error);
        return res.send({ error: 'query_error' });
    }

});

module.exports = router;