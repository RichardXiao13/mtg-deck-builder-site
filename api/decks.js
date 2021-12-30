/* eslint-disable no-invalid-this */
const express = require("express");
const fs = require("fs");
const utils = require("./utils");
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./database/decks.sqlite");

// eslint-disable-next-line new-cap
const decksRouter = express.Router();

decksRouter.param("deckId", (req, res, next, id) => {
  db.run("SELECT * FROM Decks WHERE id=$id", { $id: id }, (err, deck) => {
    if (err) {
      next(err);
    } else if (deck) {
      req.deck = deck;
      next();
    } else {
      res.status(404).send({ message: "Deck not found." });
    }
  });
});

decksRouter.get("/:deckId", (req, res, next) => {
  res.send({ deck: req.deck });
});

decksRouter.post("/", (req, res, next) => {
  const err = utils.validateDeck(req.body.deck.cards);
  if (err) {
    res.status(400).send({ message: err.message });
  } else {
    next();
  }
});

decksRouter.post("/all", (req, res, next) => {
  const user = req.body.user;
  db.all(
    "SELECT * FROM Decks WHERE user_id=$id",
    { $id: user.id },
    (err, decks) => {
      if (err) {
        next(err);
      } else if (decks) {
        res.send({ decks: decks });
      } else {
        res.status(404).send({ message: "User not found." });
      }
    }
  );
});

decksRouter.post("/", (req, res, next) => {
  const user = req.body.user;
  let name = req.body.deck.name;
  if (!name) {
    name = "Deck";
  }
  const path = `./database/decks/${user.username}/${name}.json`;
  fs.writeFile(
    path,
    JSON.stringify(req.body.deck.cards),
    {
      encoding: "utf8",
    },
    (err) => {
      if (err) {
        next(err);
      } else {
        res.status(201).send();
      }
    }
  );

  db.run(
    "INSERT INTO Decks (name, path, user_id) VALUES ($name, $path, $user_id)",
    {
      $name: name,
      $path: path,
      $user_id: user.id,
    },
    function (err) {
      if (err) {
        next(err);
      } else {
        db.get(
          "SELECT * FROM Decks WHERE id=$id",
          { $id: this.lastID },
          (err, deck) => {
            if (err) {
              next(err);
            } else {
              res.status(201).send({ deck: deck });
            }
          }
        );
      }
    }
  );
});

decksRouter.put("/:deckId", (req, res, next) => {
  const username = req.body.user.username;
  let newName = req.body.deck.name;
  if (!newName) {
    newName = "Deck";
  }
  const path = `./database/decks/${username}/${newName}.json`;
  fs.writeFile(
    path,
    JSON.stringify(req.body.deck.cards),
    {
      encoding: "utf8",
    },
    (err) => {
      if (err) {
        next(err);
      } else {
        db.run(
          "UPDATE Decks SET name=$name, path=$path WHERE id=$id",
          { $name: newName, $path: path, $id: req.deck.id },
          function (err) {
            if (err) {
              next(err);
            } else {
              db.get(
                "SELECT * FROM Decks WHERE id=$id",
                { $id: this.lastID },
                (err, deck) => {
                  if (err) {
                    next(err);
                  } else {
                    res.send({ deck: deck });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

decksRouter.delete("/:deckId", (req, res, next) => {
  db.run(
    "DELETE FROM Decks WHERE id=$id",
    { $id: req.params.deckId },
    (err) => {
      if (err) {
        next(err);
      } else {
        res.status(204).send();
      }
    }
  );
});

module.exports = decksRouter;
