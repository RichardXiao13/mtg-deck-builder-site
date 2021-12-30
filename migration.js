const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./database/decks.sqlite");

db.run(
  "CREATE TABLE IF NOT EXISTS Users (" +
    "id INTEGER PRIMARY KEY, " +
    "email TEXT NOT NULL, " +
    "username TEXT NOT NULL, " +
    "password TEXT NOT NULL" +
    ")"
);

db.run(
  "CREATE TABLE IF NOT EXISTS Decks (" +
    "id INTEGER PRIMARY KEY, " +
    "name TEXT NOT NULL, " +
    "path TEXT NOT NULL, " +
    "user_id INTEGER NOT NULL, " +
    "FOREIGN KEY (user_id) REFERENCES Users(id)" +
    ")"
);
