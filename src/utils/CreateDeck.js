/* eslint-disable require-jsdoc */
export async function createDeck(cards, name) {
  const response = await fetch("/decks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      deck: { cards, name },
    }),
  });
  return response;
}
