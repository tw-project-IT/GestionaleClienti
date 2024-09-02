const router = require('express').Router();

const { dbConnection } = require ('../../server');

router.post('/api/addMaintenance', async (req, res) => {

    try {
        const boiler = req.body.boiler;
        const date = req.body.date;
        const notes = req.body.notes;

        let query = `INSERT INTO maintenance (boiler, date, notes) VALUES (?, ?, ?);`;

        const [result] = await dbConnection.promise().query(query, [boiler, date, notes]);

        res.send(result);
    } catch (error) {
        console.error("Unable to execute addMaintenance query!", error);
        return res.send({ error: 'query_error' });
    }

});

module.exports = router;