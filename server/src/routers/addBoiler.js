const router = require('express').Router();

const { dbConnection } = require ('../../server');
const verifyToken = require("../utils/verifyToken");

router.post('/api/addBoiler', verifyToken, async (req, res) => {

    try {
        const customer = req.body.customer;
        const model = req.body.model;
        const registryCode = req.body.registryCode;
        const installationDate = req.body.installationDate;
        const other = req.body.other;

        if (!customer || !model || !registryCode || !installationDate) {
            return res.send({ error: 'invalid_parameter' });
        }

        let query = `INSERT INTO boiler (customer, model, registry_code, installation_date, other) VALUES (?, ?, ?, ?, ?);`;

        const [result] = await dbConnection.promise().query(query, [customer, model, registryCode, installationDate, other]);

        res.send(result);
    } catch (error) {
        console.error("Unable to execute addBoiler query!", error);
        return res.status(400);
    }

});

module.exports = router;