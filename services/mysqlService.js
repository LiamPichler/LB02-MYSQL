const mysql = require("mysql");
const dbConfig = require("../config/db.config");

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: dbConfig.PORT,
  insecureAuth: true,
});

connection.connect(function (error) {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

let sampleEntries = [];

module.exports.saveEntryToDatabase = function (
  text,
  date,
  email,
  priority,
  color,
  callback
) {
  const sqlQuery =
    "INSERT INTO todos (text, date, email, priority, color, isDone) VALUES (?, ?, ?, ?, ?, FALSE)";
  connection.query(
    sqlQuery,
    [text, date, email, priority, color],
    (err, result) => {
      if (err) {
        console.log("error: ", err);
        callback(err, null);
        return;
      }
      callback(null, {
        msg: "New todo has been created!",
        id: result.insertId,
        text,
        date,
        email,
        priority,
        color,
      });
    }
  );
};

module.exports.updateEntryInDatabase = function (id, isDone, callback) {
  const sqlQuery = "UPDATE todos SET isDone = ? WHERE id = ?";
  connection.query(sqlQuery, [isDone, id], (err, result) => {
    if (err) {
      console.log("error: ", err);
      callback(err, null);
      return;
    }
    callback(null, {
      msg: "Todo " + id + " has been updated!",
    });
  });
};

module.exports.deleteEntryFromDatabase = function (id, callback) {
  const sqlQuery = "DELETE FROM todos WHERE id = ?";
  connection.query(sqlQuery, [id], (err, result) => {
    if (err) {
      console.log("error: ", err);
      callback(err, null);
      return;
    }
    callback(null, {
      msg: "Todo " + id + " has been deleted!",
    });
  });
};

module.exports.getAllEntriesFromDatabase = function (callback) {
  const sqlQuery = "SELECT * FROM todos";
  connection.query(sqlQuery, (err, result) => {
    if (err) {
      console.log("error: ", err);
      callback(err, null);
      return;
    }
    callback(null, result);
  });
};
