/* eslint-disable no-invalid-this */
const express = require("express");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt-nodejs");
const db = new sqlite3.Database("./database/decks.sqlite");

// eslint-disable-next-line new-cap
const usersRouter = express.Router();

usersRouter.param("userId", (req, res, next, id) => {
  db.get("SELECT * FROM Users WHERE id=$id", { $id: id }, (err, user) => {
    if (err) {
      next(err);
    } else if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).send({ message: "User not found." });
    }
  });
});

usersRouter.get("/:userId", (req, res, next) => {
  res.send({ user: req.user });
});

usersRouter.post("/", (req, res, next) => {
  const { email, username, password } = req.body.user;

  if (!email || !username || !password) {
    res.status(400).send({ message: "Missing email, username, or password." });
  }

  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(password, salt, null, (err, hash) => {
      db.run(
        "INSERT INTO Users (email, username, password) VALUES ($email, $username, $password)",
        { $email: email, $username: username, $password: hash },
        function (err) {
          if (err) {
            next(err);
          } else {
            db.get(
              "SELECT * FROM Users WHERE id=$id",
              { $id: this.lastID },
              (err, user) => {
                if (err) {
                  next(err);
                } else {
                  res.status(201).send({ user: user });
                }
              }
            );
          }
        }
      );
    });
  });
});

usersRouter.put("/:userId", (req, res, next) => {
  const { username, password } = req.body.user;

  if (!username || !password) {
    res.status(400).send({ message: "Missing username or password." });
  }

  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, null, (err, hash) => {
    db.run(
      "UPDATE Users SET username=$username, password=$password WHERE id=$id",
      { $username: username, $password: hash, $id: req.params.userId },
      function (err) {
        if (err) {
          next(err);
        } else {
          db.get(
            "SELECT * FROM Users WHERE $id=id",
            { $id: this.lastID },
            (err, user) => {
              if (err) {
                next(err);
              } else {
                res.send({ user: user });
              }
            }
          );
        }
      }
    );
  });
});

usersRouter.delete("/:userId", (req, res, next) => {
  db.run(
    "DELETE FROM Users WHERE $id=id",
    { $id: req.params.userId },
    (err) => {
      if (err) {
        next(err);
      } else {
        res.status(204).send();
      }
    }
  );
});

module.exports = usersRouter;
