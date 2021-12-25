const express = require("express");
const fs = require("fs");
const utils = require("./utils");

// eslint-disable-next-line new-cap
const decksRouter = express.Router();

decksRouter.post("/", (req, res, next) => {
  const err = utils.isValidDeck(req.body.cards);
  if (err) {
    res.status(400).send({ message: err.message });
  } else {
    next();
  }
});

decksRouter.get("/", (req, res, next) => {
  // TODO
  //   res.send("Working");
});

decksRouter.post("/", (req, res, next) => {
  let name = req.body.name;
  if (!name) {
    name = "Deck";
  }
  fs.writeFile(
    `./database/decks/${name}.json`,
    JSON.stringify(req.body.cards),
    {
      encoding: "utf8",
    },
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
