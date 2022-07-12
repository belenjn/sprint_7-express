const mysql = require("mysql");
const { user_mysql, password_mysql, db_mysql } = require("./env");

const connection = mysql.createConnection({
  host: "localhost",
  user: user_mysql,
  password: password_mysql,
  database: db_mysql,
});

connection.connect();

connection.query("SELECT 1 + 1 AS solution", (err, rows, fields) => {
  if (err) throw err;

  console.log("The solution is: ", rows[0].solution);
});

connection.end();

