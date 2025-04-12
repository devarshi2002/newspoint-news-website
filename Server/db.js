// db.js
const mysql = require('mysql2/promise');

// Create a pool of connections
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "news_app",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
