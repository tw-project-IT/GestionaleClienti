const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 3301;
const server = require('http').Server(app);

// Configurazioni
const {
    debug,
    origin,
    allowedEmails,
    Database,
} = require("./config.json");

// Connessione al database
const dbConnection = mysql.createPool({
    host: Database.host,
    user: Database.user,
    password: Database.password,
    database: Database.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

server.listen(PORT, () => {
    console.log("\x1b[32m", "✔️", "\x1b[0m", "RUNNING ON PORT: " + PORT);
});

// Middleware di Logging per le Richieste
app.use((req, res, next) => {
    const newRequest = {
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url,
        params: req.params,
        query: req.query,
        body: req.body,
        user: req.user,
        userAgent: req.headers['user-agent'],
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    };

    console.log(`[${new Date().toISOString()}] NEW Request:`, newRequest);

    next();
});

// Esporta variabili e moduli rilevanti
module.exports = {
    server,
    debug,
    origin,
    allowedEmails,
    dbConnection
};

// Middleware per il parsing di URL e JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurazione CORS
app.use(cors({
    origin,
    methods: ["POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

// Collegamento dei moduli delle route API
app.use("/", require("./src/routers/getCustomers"));
app.use("/", require("./src/routers/addCustomer"));
app.use("/", require("./src/routers/getBoilers"));
app.use("/", require("./src/routers/addBoiler"));
app.use("/", require("./src/routers/addMaintenance"));