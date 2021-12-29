const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorhandler = require("errorhandler");
const morgan = require("morgan");

// Import routers from ./api here
const decksRouter = require("./api/decks");
const usersRouter = require("./api/users");
const loginRouter = require("./api/login");
const cardsRouter = require("./api/cards");

const PORT = process.env.PORT || 4000;

const app = express();
app.use(bodyParser.json({ limit: "1mb" }));
app.use(cors());
app.use(morgan("dev"));

// Mount routers here
app.use("/decks", decksRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/cards", cardsRouter);

app.use(errorhandler());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
