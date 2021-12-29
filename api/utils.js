/* eslint-disable require-jsdoc */
const fetch = require("node-fetch");
const { RAPIDAPI_KEY } = require("./ApiKeys");

const RAPIDAPI_URL =
  "https://twinword-text-similarity-v1.p.rapidapi.com/similarity";

function validateDeck(cards) {
  let numCards = 0;
  let err = null;
  for (const cardName in cards) {
    if (Object.prototype.hasOwnProperty.call(cards, cardName)) {
      numCards += cards[cardName].length;
    }
  }
  if (numCards < 60) {
    err = new Error(
      `Deck must have at least 60 cards. You currently have ${numCards} cards.`
    );
  }
  return err;
}

function getCardSimilarity(originalText, toCompareText) {
  const cleanedOriginalText = originalText.replace(/(\r\n|\n|\r)/gm, " ");
  const cleanedToCompareText = toCompareText.replace(/(\r\n|\n|\r)/gm, " ");
  const query = `${RAPIDAPI_URL}/?text1=${cleanedOriginalText}&text2=${cleanedToCompareText}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-host": "twinword-text-similarity-v1.p.rapidapi.com",
      "x-rapidapi-key": RAPIDAPI_KEY,
    },
  };
  return fetch(query, options);
}

module.exports = {
  validateDeck,
  getCardSimilarity,
};
