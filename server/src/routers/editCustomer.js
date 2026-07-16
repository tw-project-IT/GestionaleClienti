const router = require('express').Router();

const { dbConnection } = require ('../../server');
const verifyToken = require("../utils/verifyToken");

router.post('/api/editCustomer', verifyToken, async (req, res) => {

    try {
        const id = req.body.id;
        const firstname = req.body.firstName;
        const lastname = req.body.lastName;

        if (!id || !firstname || !lastname) {
            return res.send({ error: 'invalid_parameter' });
        }

        const telephone = req.body.telephone;
        const email = req.body.email;
        const address = req.body.address;

        let query = `UPDATE customer SET firstname = ?, lastname = ?, telephone = ?, email = ?, address = ? WHERE id = ?;`;

        const [result] = await dbConnection.promise().query(query, [firstname, lastname, telephone, email, address, id]);

        res.send(result);
    } catch (error) {
        console.error("Unable to execute editCustomer query!", error);
        return res.status(400);
    }

});

module.exports = router;
