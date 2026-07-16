const router = require('express').Router();

const { dbConnection } = require ('../../server');
const verifyToken = require("../utils/verifyToken");

router.post('/api/editBoiler', verifyToken, async (req, res) => {

    try {
        const id = req.body.id;
        const customer = req.body.customer;
        const model = req.body.model;
        const registryCode = req.body.registryCode;
        const installationDate = req.body.installationDate;
        const other = req.body.other;

        if (!id || !customer || !model || !registryCode || !installationDate) {
            return res.send({ error: 'invalid_parameter' });
        }

        let query = `UPDATE boiler SET customer = ?, model = ?, registry_code = ?, installation_date = ?, other = ? WHERE id = ?;`;

        const [result] = await dbConnection.promise().query(query, [customer, model, registryCode, installationDate, other, id]);

        res.send(result);
    } catch (error) {
        console.error("Unable to execute editBoiler query!", error);
        return res.status(400);
    }

});

module.exports = router;
