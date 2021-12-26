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

export async function searchCards(name = "", type = "", colors = new Set()) {
  const searchColors = Array.from(colors).join("|");
  const query = `${url}/cards?name=${name}&type=${type}&colors=${searchColors}`;
  console.log(query);
  let response = await fetch(query);
  response = await response.json();
  const cards = filterUniqueCards(response.cards);
  return cards;
}
