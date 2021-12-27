const express = require("express");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt-nodejs");
const db = new sqlite3.Database("./database/decks.sqlite");

// eslint-disable-next-line new-cap
const loginRouter = express.Router();

loginRouter.post("/", (req, res, next) => {
  const { username, password } = req.body.user;

  db.get(
    "SELECT * FROM Users WHERE username=$username",
    { $username: username },
    (err, user) => {
      if (err) {
        next(err);
      } else if (user) {
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (isMatch) {
            res.send();
          } else {
            res.status(401).send({ message: "Password incorrect." });
          }
        });
      } else {
        res.status(404).send({ message: "Username not found." });
      }
    }
  );
});

module.exports = loginRouter;
