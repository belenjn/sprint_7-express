const mysql = require("mysql");
const { user_mysql, password_mysql, db_mysql } = require("./env");

const connection = mysql.createConnection({
  host: "localhost",
  user: user_mysql,
  password: password_mysql,
  database: db_mysql,
});

module.exports = {connection}

