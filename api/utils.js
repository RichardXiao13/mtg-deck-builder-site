
const isValidDeck = (cards) => {
  let numCards = 0;
  let err = null
  for (const cardName in cards) {
    if (Object.prototype.hasOwnProperty.call(cards, cardName)) {
      numCards += cards[cardName].length;
    }
  }
  if (numCards < 60) {
      err = new Error(`Deck must have at least 60 cards. You currently have ${numCards} cards.`);
  }
  return err;
};

module.exports = {
  isValidDeck
};
