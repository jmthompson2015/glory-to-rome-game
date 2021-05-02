/* eslint no-console: ["error", { allow: ["info"] }] */

import OrderCard from "../artifact/OrderCard.js";
import BonusCard from "../artifact/BonusCard.js";

import ActionCreator from "../state/ActionCreator.js";
import BonusCardState from "../state/BonusCardState.js";
import OrderCardState from "../state/OrderCardState.js";
import PlayerState from "../state/PlayerState.js";
import Reducer from "../state/Reducer.js";

import DeckBuilder from "./DeckBuilder.js";
import Setup from "./Setup.js";

const TestData = {};

const createPlayers = () => {
  const player1 = PlayerState.create({
    id: 1,
    name: "Alfred", // Pennyworth
  });
  const player2 = PlayerState.create({
    id: 2,
    name: "Bruce", // Wayne
  });
  const player3 = PlayerState.create({
    id: 3,
    name: "Clark", // Kent
  });
  const player4 = PlayerState.create({
    id: 4,
    name: "Diana", // Prince
  });
  const player5 = PlayerState.create({
    id: 5,
    name: "Edward", // Nygma
  });

  return [player1, player2, player3, player4, player5];
};

TestData.DELAY = 100;

TestData.createStore = () => {
  const store = Redux.createStore(Reducer.root);
  const players = createPlayers();

  // From Setup.execute(); don't shuffle for repeatability.
  store.dispatch(ActionCreator.setPlayers(players));

  // Create the Leader card.
  OrderCardState.create({ cardKey: OrderCard.LEADER, store });

  // Create the order deck.
  const orderDeck = DeckBuilder.buildOrderDeck(store);
  store.dispatch(ActionCreator.setOrderDeck(orderDeck));

  // Create the jack deck.
  const jackDeck = DeckBuilder.buildJackDeck(store);
  store.dispatch(ActionCreator.setJackDeck(jackDeck));

  // Create the site decks.
  const playerCount = players.length;
  Setup.createSiteDecks(store, playerCount);

  // Create Merchant Bonus cards.
  const forEachFunction = (cardKey) =>
    BonusCardState.create({ cardKey, store });
  R.forEach(forEachFunction, BonusCard.keys().slice(1));

  // Deal cards to each player.
  Setup.dealOrderCards(store, players);

  // Deal an order card into the pool for each player, and determine the leader.
  Setup.dealPoolCards(store, players);

  return store;
};

TestData.printCardPool = (store) => {
  const { cardPool } = store.getState();
  console.info(`cardPool ${JSON.stringify(cardPool)}`);
};

TestData.printHands = (store) => {
  const { playerToHand } = store.getState();
  const { length } = Object.keys(playerToHand);
  console.info(`player length = ${length}`);

  for (let i = 1; i <= length; i += 1) {
    console.info(`player ${i} hand ${JSON.stringify(playerToHand[i])}`);
  }
};

TestData.printOrderCards = (store) => {
  const { orderCardInstances } = store.getState();
  const { length } = Object.keys(orderCardInstances);
  console.info(`orderCard length = ${length}`);

  for (let i = 1; i <= length; i += 1) {
    const card = R.pick(["cardKey", "cardType"], orderCardInstances[i]);
    console.info(
      `orderCard ${i} ${card.cardKey} ${card.cardType.roleKey} ${card.cardType.materialKey}`
    );
  }
};

Object.freeze(TestData);

export default TestData;
