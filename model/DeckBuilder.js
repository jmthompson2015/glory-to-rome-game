import MiscCard from "../artifact/MiscCard.js";
import OrderCard from "../artifact/OrderCard.js";

import CardState from "../state/CardState.js";

const cardToId = (card) => card.id;

const DeckBuilder = {};

const createCards = (cardKey, count, store) => {
  const reduceFunction = (accum) =>
    R.append(CardState.create({ cardKey, store }), accum);
  const counters = R.repeat(1, count);

  return R.reduce(reduceFunction, [], counters);
};

DeckBuilder.buildJackDeck = (store) => {
  const array = R.concat(
    createCards(MiscCard.JACK1, 3, store),
    createCards(MiscCard.JACK2, 3, store)
  );

  return R.map(cardToId, array);
};

DeckBuilder.buildOrderDeck = (store) => {
  const reduceFunction = (accum, card) =>
    R.concat(accum, createCards(card.key, card.count, store));
  const array = R.reduce(reduceFunction, [], OrderCard.values());

  return R.map(cardToId, array);
};

DeckBuilder.buildSiteDecks = (siteKey, playerCount, store) => {
  const siteDeck = R.map(cardToId, createCards(siteKey, playerCount, store));
  const outOfTownDeck = R.map(
    cardToId,
    createCards(siteKey, 6 - playerCount, store)
  );

  return { siteDeck, outOfTownDeck };
};

Object.freeze(DeckBuilder);

export default DeckBuilder;
