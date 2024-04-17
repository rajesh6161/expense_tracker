// create a function to connect to mysql using the mysql2 package

import mysql from "mysql2";

export const connectSQL = () => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "expense_tracker",
  });

  connection.connect((err) => {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });
};
