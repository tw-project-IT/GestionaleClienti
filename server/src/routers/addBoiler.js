const router = require('express').Router();

const { dbConnection } = require ('../../server');
const verifyToken = require("./verifyToken");

router.post('/api/addBoiler', verifyToken, async (req, res) => {

    try {
        const customer = req.body.customer;
        const model = req.body.model;
        const registryCode = req.body.registryCode;
        const installationDate = req.body.installationDate;

        if (!customer || !model || !registryCode || !installationDate) {
            return res.send({ error: 'invalid_parameter' });
        }

        let query = `INSERT INTO boiler (customer, model, registry_code, installation_date) VALUES (?, ?, ?, ?);`;

        const [result] = await dbConnection.promise().query(query, [customer, model, registryCode, installationDate]);

        res.send(result);
    } catch (error) {
        console.error("Unable to execute addBoiler query!", error);
        return res.status(400);
    }

});

module.exports = router;