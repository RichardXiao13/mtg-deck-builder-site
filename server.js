const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorhandler = require("errorhandler");
const morgan = require("morgan");

// Import routers from ./api here
const decksRouter = require("./api/decks");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

// Mount routers here
app.use("/decks", decksRouter);

app.use(errorhandler());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
