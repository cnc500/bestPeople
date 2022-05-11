const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  // username
  user: "root",
  // password
  password: "sql1",
  database: "bestpeople_db"
});

module.exports = connection;
