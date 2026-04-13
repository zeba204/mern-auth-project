const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
});

const db = pool.promise();

db.getConnection()
  .then(connection => {
    console.log("MySQL Connected");
    connection.release();
  })
  .catch(err => {
    console.error("MySQL Connection Failed:", err);
  });

module.exports = db;