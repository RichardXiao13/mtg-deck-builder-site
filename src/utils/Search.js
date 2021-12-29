/* eslint-disable require-jsdoc */

const MTG_URL = "https://api.magicthegathering.io/v1";
const TCG_URL = "https://api.tcgplayer.com/catalog/categories/1/search";

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
  const query = `${MTG_URL}/cards?name=${name}&type=${type}&colors=${searchColors}`;

  let response = await fetch(query);
  response = await response.json();
  const cards = filterUniqueCards(response.cards);
  return cards;
}

export async function searchPrice(name = "") {
  const body = {
    sort: "MinPrice DESC",
    limit: 10,
    offset: 0,
    filters: [
      {
        name: "ProductName",
        values: [name],
      },
    ],
  };
  console.log(body);

  const response = await fetch(TCG_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return response;
}
