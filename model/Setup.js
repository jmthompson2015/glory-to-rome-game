import MiscCard from "../artifact/MiscCard.js";
import OrderCard from "../artifact/OrderCard.js";
import SiteCard from "../artifact/SiteCard.js";
import Version from "../artifact/Version.js";

import ActionCreator from "../state/ActionCreator.js";
import MiscCardState from "../state/MiscCardState.js";
import OrderCardState from "../state/OrderCardState.js";

import DeckBuilder from "./DeckBuilder.js";

const reduceIndexed = R.addIndex(R.reduce);
const shuffle = (array) => array.sort(() => Math.random() - 0.5);

const Setup = {};

Setup.createSiteDecks = (store, players) => {
  const playerCount = players.length;

  const reduceFunction = (accum, siteKey) => {
    const { siteDeck, outOfTownDeck } = DeckBuilder.buildSiteDecks(
      store,
      siteKey,
      playerCount
    );
    store.dispatch(ActionCreator.setSiteToDeck(siteKey, siteDeck));
    store.dispatch(
      ActionCreator.setSiteToOutOfTownDeck(siteKey, outOfTownDeck)
    );
  };
  const siteKeys = SiteCard.keys();
  R.reduce(reduceFunction, [], siteKeys);
};

Setup.dealJackCards = (store, players) => {
  const forEachFunction = (player) => {
    store.dispatch(ActionCreator.transferJackToHand(player.id));
  };
  R.forEach(forEachFunction, players);
};

Setup.dealOrderCards = (store, players, cardCount = 5) => {
  const forEachFunction = (player) => {
    const reduceFunction = () =>
      store.dispatch(ActionCreator.transferOrderToHand(player.id));
    const counters = R.repeat(1, cardCount);
    return R.reduce(reduceFunction, [], counters);
  };
  R.forEach(forEachFunction, players);
};

Setup.dealPoolCards = (store, players) => {
  const playerCount = players.length;
  const reduceFunction = () =>
    store.dispatch(ActionCreator.transferOrderToPool());
  const counters = R.repeat(1, playerCount);
  R.reduce(reduceFunction, [], counters);

  const { cardPool } = store.getState();
  const cardPoolMap = reduceIndexed(
    (accum, id, i) => {
      const cardInstance = store.getState().orderCardInstances[id];
      const card = OrderCard.value(cardInstance.cardKey);
      return R.assoc(i, card, accum);
    },
    {},
    cardPool
  );
  const leaderIndex = reduceIndexed(
    (accum, card, i) => {
      if (R.isNil(accum) || card.name < cardPoolMap[accum].name) {
        return i;
      }
      return accum;
    },
    null,
    Object.values(cardPoolMap)
  );

  const leaderId = leaderIndex + 1;
  store.dispatch(ActionCreator.setCurrentPlayer(leaderId));
};

Setup.execute = (store, players, versionKey = Version.REPUBLIC) => {
  store.dispatch(ActionCreator.setVersion(versionKey));
  store.dispatch(ActionCreator.setPlayers(players));

  // Create the Leader card.
  OrderCardState.create({ cardKey: OrderCard.LEADER, store });

  // Create the order deck.
  const orderDeck = shuffle(DeckBuilder.buildOrderDeck(store));
  store.dispatch(ActionCreator.setOrderDeck(orderDeck));

  // Create the jack deck.
  const jackDeck = shuffle(DeckBuilder.buildJackDeck(store));
  store.dispatch(ActionCreator.setJackDeck(jackDeck));

  // Create the site decks.
  Setup.createSiteDecks(store, players);

  // Create Merchant Bonus cards.
  const forEachFunction = (cardKey) => MiscCardState.create({ cardKey, store });
  R.forEach(forEachFunction, MiscCard.keys());

  // Deal cards to each player.
  if (versionKey === Version.REPUBLIC) {
    Setup.dealOrderCards(store, players);
  } else {
    Setup.dealOrderCards(store, players, 4);
    Setup.dealJackCards(store, players);
  }

  // Deal an order card into the pool for each player, and determine the leader.
  Setup.dealPoolCards(store, players);
};

Object.freeze(Setup);

export default Setup;
