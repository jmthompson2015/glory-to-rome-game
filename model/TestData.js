import MiscCard from "../artifact/MiscCard.js";

import ActionCreator from "../state/ActionCreator.js";
import MiscCardState from "../state/MiscCardState.js";
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

TestData.createStore = () => {
  const store = Redux.createStore(Reducer.root);
  const players = createPlayers();

  // From Setup.execute(); don't shuffle for repeatability.
  store.dispatch(ActionCreator.setPlayers(players));

  // Create the Leader card.
  MiscCardState.create({ cardKey: MiscCard.LEADER, store });

  // Create Merchant Bonus cards.
  const forEachFunction = (cardKey) => MiscCardState.create({ cardKey, store });
  R.forEach(forEachFunction, MiscCard.keys().slice(1));

  // Create the order deck.
  const orderDeck = DeckBuilder.buildOrderDeck(store);
  store.dispatch(ActionCreator.setOrderDeck(orderDeck));

  // Create the jack deck.
  const jackDeck = DeckBuilder.buildJackDeck(store);
  store.dispatch(ActionCreator.setJackDeck(jackDeck));

  // Create the site decks.
  Setup.createSiteDecks(store, players);

  // Deal cards to each player.
  Setup.dealOrderCards(store, players);

  // Deal an order card into the pool for each player, and determine the leader.
  Setup.dealPoolCards(store, players);

  return store;
};

Object.freeze(TestData);

export default TestData;
