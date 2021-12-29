/* eslint-disable new-cap */
const express = require("express");
const { getCardSimilarity } = require("./utils");

const cards = express.Router();

cards.post("/", async (req, res, next) => {
  const { originalText, toCompareText } = req.body.cardsText;
  let similarityResponse = await getCardSimilarity(originalText, toCompareText);
  const status = similarityResponse.status;
  similarityResponse = await similarityResponse.json();
  res.status(status).send(similarityResponse);
});

module.exports = cards;
