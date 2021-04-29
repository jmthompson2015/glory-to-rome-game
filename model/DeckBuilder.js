import OrderCard from "../artifact/OrderCard.js";

import OrderCardState from "../state/OrderCardState.js";
import SiteCardState from "../state/SiteCardState.js";

const cardToId = (card) => card.id;

const DeckBuilder = {};

const createOrderCards = (store, cardKey, count, isFaceUp = false) => {
  const reduceFunction = (accum) =>
    R.append(OrderCardState.create({ cardKey, isFaceUp, store }), accum);
  const counters = R.repeat(1, count);

  return R.reduce(reduceFunction, [], counters);
};

const createSiteCards = (store, cardKey, count, isFaceUp = false) => {
  const reduceFunction = (accum) =>
    R.append(SiteCardState.create({ cardKey, isFaceUp, store }), accum);
  const counters = R.repeat(1, count);

  return R.reduce(reduceFunction, [], counters);
};

DeckBuilder.buildJackDeck = (store) => {
  const array = R.concat(
    createOrderCards(store, OrderCard.JACK1, 3, true),
    createOrderCards(store, OrderCard.JACK2, 3, true)
  );

  return R.map(cardToId, array);
};

DeckBuilder.buildOrderDeck = (store) => {
  const reduceFunction = (accum, card) =>
    R.concat(accum, createOrderCards(store, card.key, card.count));
  const { versionKey } = store.getState();
  const values = OrderCard.valuesByVersion(versionKey);
  const array = R.reduce(reduceFunction, [], values);

  return R.map(cardToId, array);
};

DeckBuilder.buildSiteDecks = (store, siteKey, playerCount) => {
  const siteDeck = R.map(
    cardToId,
    createSiteCards(store, siteKey, playerCount, true)
  );
  const outOfTownDeck = R.map(
    cardToId,
    createSiteCards(store, siteKey, 6 - playerCount, false)
  );

  return { siteDeck, outOfTownDeck };
};

Object.freeze(DeckBuilder);

export default DeckBuilder;
