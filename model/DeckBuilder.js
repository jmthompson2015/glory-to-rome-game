import OrderCard from "../artifact/OrderCard.js";
import SiteCard from "../artifact/SiteCard.js";

import OrderCardState from "../state/OrderCardState.js";
import SiteCardState from "../state/SiteCardState.js";

const cardToId = (card) => card.id;

const DeckBuilder = {};

const createOrderCards = (store, cardKey, count, isFaceup = false) => {
  const reduceFunction = (accum) =>
    R.append(OrderCardState.create({ cardKey, isFaceup, store }), accum);
  const counters = R.repeat(1, count);

  return R.reduce(reduceFunction, [], counters);
};

const createSiteCards = (store, cardKey, count, isFaceup = false) => {
  const reduceFunction = (accum) =>
    R.append(SiteCardState.create({ cardKey, isFaceup, store }), accum);
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
    R.concat(accum, createOrderCards(store, card.key, card.count, true));
  const { versionKey } = store.getState();
  const values = OrderCard.valuesByVersion(versionKey);
  const array = R.reduce(reduceFunction, [], values);

  return R.map(cardToId, array);
};

DeckBuilder.buildOutOfTownSiteDeck = (store, playerCount) => {
  const reduceFunction = (accum, card) =>
    R.concat(accum, createSiteCards(store, card.key, 6 - playerCount));
  const { versionKey } = store.getState();
  const values = SiteCard.values(versionKey);
  const array = R.reduce(reduceFunction, [], values);

  return R.map(cardToId, array);
};

DeckBuilder.buildSiteDeck = (store, playerCount) => {
  const reduceFunction = (accum, card) =>
    R.concat(accum, createSiteCards(store, card.key, playerCount, true));
  const { versionKey } = store.getState();
  const values = SiteCard.values(versionKey);
  const array = R.reduce(reduceFunction, [], values);

  return R.map(cardToId, array);
};

Object.freeze(DeckBuilder);

export default DeckBuilder;
