const express = require("express");

// eslint-disable-next-line new-cap
const decksRouter = express.Router();

decksRouter.get("/", (req, res, next) => {
  // TODO
  res.send("Working");
});

module.exports = decksRouter;
