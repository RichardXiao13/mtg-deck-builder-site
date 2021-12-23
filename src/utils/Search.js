/* eslint-disable require-jsdoc */

const url = "https://api.magicthegathering.io/v1";

function filterUniqueCards(cards) {
  const seen = new Set();
  const filteredCards = [];
  for (const card of cards) {
    if (card.imageUrl && !seen.has(card.name)) {
      seen.add(card.name);
      filteredCards.push(card);
    }
  }
  return filteredCards;
}

export async function searchCardsWithName(name) {
  const query = `${url}/cards?name=${name}`;
  let response = await fetch(query);
  response = await response.json();
  const cards = filterUniqueCards(response.cards);
  return cards;
}
