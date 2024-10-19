const router = require('express').Router();

const { dbConnection } = require ('../../server');
const verifyToken = require("./verifyToken");

router.post('/api/getBoilers', verifyToken, async (req, res) => {

    try {
        const query = `
           SELECT
                boiler.*,
                CONCAT(customer.firstname, " ", customer.lastname) AS customer,
                maintenance.date as last_maintenance_date,
                maintenance.notes
           FROM boiler
           JOIN customer ON boiler.customer = customer.id
           LEFT JOIN maintenance ON boiler.id = maintenance.boiler
           WHERE maintenance.date =
           (
                SELECT MAX(max_maintenance.date)
                FROM maintenance max_maintenance
                WHERE max_maintenance.boiler = boiler.id
            ) OR maintenance.date IS NULL
            GROUP BY boiler.id
        `;

        const [result] = await dbConnection.promise().query(query);

        res.send(result);
    } catch (error) {
        console.error("Unable to execute getBoilers query!", error);
        return res.status(400);
    }

});

module.exports = router;