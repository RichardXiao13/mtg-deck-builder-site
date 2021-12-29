/* eslint-disable require-jsdoc */
export async function getCardSimilarity(originalText, toCompareText) {
  return await fetch("/cards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cardsText: {
        originalText,
        toCompareText,
      },
    }),
  });
}
