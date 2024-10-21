const router = require('express').Router();

const { dbConnection } = require ('../../server');
const verifyToken = require("../utils/verifyToken");

router.post('/api/addMaintenance', verifyToken, async (req, res) => {

    try {
        const boiler = req.body.boiler;
        const date = req.body.date;
        const notes = req.body.notes;

        if (!boiler || !date) {
            return res.send({ error: 'invalid_parameter' });
        }

        let query = `INSERT INTO maintenance (boiler, date, notes) VALUES (?, ?, ?);`;

        const [result] = await dbConnection.promise().query(query, [boiler, date, notes]);

        res.send(result);
    } catch (error) {
        console.error("Unable to execute addMaintenance query!", error);
        return res.status(400);
    }

});

module.exports = router;