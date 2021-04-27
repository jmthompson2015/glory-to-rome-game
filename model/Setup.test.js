import Version from "../artifact/Version.js";

import ActionCreator from "../state/ActionCreator.js";
import PlayerState from "../state/PlayerState.js";
import Reducer from "../state/Reducer.js";

import DeckBuilder from "./DeckBuilder.js";
import Setup from "./Setup.js";

QUnit.module("Setup");

const createPlayers = () => {
  const player1 = PlayerState.create({ id: 1, name: "Alfred" });
  const player2 = PlayerState.create({ id: 2, name: "Bruce" });

  return [player1, player2];
};

QUnit.test("createSiteDecks()", (assert) => {
  // Setup.
  const store = Redux.createStore(Reducer.root);
  const players = createPlayers();
  const orderDeck0 = DeckBuilder.buildOrderDeck(store);
  store.dispatch(ActionCreator.setOrderDeck(orderDeck0));

  // Run.
  Setup.createSiteDecks(store, players);

  // Verify.
  const state = store.getState();
  const { siteCardInstances, siteToDeck, siteToOutOfTownDeck } = state;
  assert.ok(siteCardInstances);
  assert.equal(Object.keys(siteCardInstances).length, 36);
  assert.ok(siteToDeck);
  assert.equal(Object.keys(siteToDeck).length, 6);
  assert.ok(siteToOutOfTownDeck);
  assert.equal(Object.keys(siteToOutOfTownDeck).length, 6);
});

QUnit.test("dealOrderCards()", (assert) => {
  // Setup.
  const store = Redux.createStore(Reducer.root);
  const players = createPlayers();
  const orderDeck0 = DeckBuilder.buildOrderDeck(store);
  store.dispatch(ActionCreator.setOrderDeck(orderDeck0));
  const jackDeck0 = DeckBuilder.buildJackDeck(store);
  store.dispatch(ActionCreator.setJackDeck(jackDeck0));

  // Run.
  Setup.dealOrderCards(store, players);

  // Verify.
  const state = store.getState();
  const { orderCardInstances, jackDeck, orderDeck, playerToHand } = state;
  assert.ok(orderCardInstances);
  assert.equal(
    Object.keys(orderCardInstances).length,
    144,
    `orderCardInstances length = ${Object.keys(orderCardInstances).length}`
  );
  assert.ok(orderDeck);
  assert.equal(orderDeck.length, 134, `orderDeck.length = ${orderDeck.length}`);
  assert.ok(jackDeck);
  assert.equal(jackDeck.length, 6, `jackDeck.length = ${jackDeck.length}`);
  const hand1 = playerToHand[1];
  assert.ok(hand1, `hand1 = ${hand1}`);
  assert.equal(hand1.length, 5);
  const hand2 = playerToHand[2];
  assert.ok(hand2, `hand2 = ${hand2}`);
  assert.equal(hand2.length, 5);
});

QUnit.test("dealPoolCards()", (assert) => {
  // Setup.
  const store = Redux.createStore(Reducer.root);
  const players = createPlayers();
  const orderDeck0 = DeckBuilder.buildOrderDeck(store);
  store.dispatch(ActionCreator.setOrderDeck(orderDeck0));

  // Run.
  Setup.dealPoolCards(store, players);

  // Verify.
  const state = store.getState();
  const { cardPool, initiativePlayerId, orderCardInstances, orderDeck } = state;
  assert.ok(orderCardInstances);
  assert.equal(
    Object.keys(orderCardInstances).length,
    144,
    `orderCardInstances length = ${Object.keys(orderCardInstances).length}`
  );
  assert.ok(orderDeck);
  assert.equal(orderDeck.length, 142, `orderDeck.length = ${orderDeck.length}`);
  assert.ok(cardPool);
  assert.equal(cardPool.length, 2, `cardPool.length = ${cardPool.length}`);

  assert.equal(
    initiativePlayerId,
    1,
    `initiativePlayerId = ${initiativePlayerId}`
  );
});

QUnit.test("execute() Imperium", (assert) => {
  // Setup.
  const store = Redux.createStore(Reducer.root);
  const players = createPlayers();
  const versionKey = Version.IMPERIUM;

  // Run.
  Setup.execute(store, players, versionKey);

  // Verify.
  const state = store.getState();
  const {
    initiativePlayerId,
    jackDeck,
    miscCardInstances: miscCards,
    orderCardInstances: orderCards,
    orderDeck,
    playerInstances,
    playerToHand,
    siteCardInstances: siteCards,
    siteToDeck,
    siteToOutOfTownDeck,
  } = state;
  assert.ok(miscCards);
  assert.equal(
    Object.keys(miscCards).length,
    6,
    `miscCards length = ${Object.keys(miscCards).length}`
  );
  assert.ok(orderCards);
  assert.equal(
    Object.keys(orderCards).length,
    144,
    `orderCards length = ${Object.keys(orderCards).length}`
  );
  assert.ok(siteCards);
  assert.equal(
    Object.keys(siteCards).length,
    36,
    `siteCards length = ${Object.keys(siteCards).length}`
  );
  assert.ok(playerInstances);
  assert.equal(
    Object.keys(playerInstances).length,
    2,
    `playerInstances length = ${Object.keys(playerInstances).length}`
  );

  assert.ok(orderDeck);
  assert.equal(orderDeck.length, 134, `orderDeck.length = ${orderDeck.length}`);

  assert.ok(jackDeck);
  assert.equal(jackDeck.length, 4, `jackDeck.length = ${jackDeck.length}`);

  assert.ok(siteToDeck);
  assert.equal(Object.keys(siteToDeck).length, 6);
  assert.ok(siteToOutOfTownDeck);
  assert.equal(Object.keys(siteToOutOfTownDeck).length, 6);

  const hand1 = playerToHand[1];
  assert.ok(hand1, `hand1 = ${hand1}`);
  assert.equal(hand1.length, 5);
  const hand2 = playerToHand[2];
  assert.ok(hand2, `hand2 = ${hand2}`);
  assert.equal(hand2.length, 5);

  assert.equal(
    [1, 2].includes(initiativePlayerId),
    true,
    `initiativePlayerId = ${initiativePlayerId}`
  );
});

QUnit.test("execute() Republic", (assert) => {
  // Setup.
  const store = Redux.createStore(Reducer.root);
  const players = createPlayers();

  // Run.
  Setup.execute(store, players);

  // Verify.
  const state = store.getState();
  const {
    initiativePlayerId,
    jackDeck,
    miscCardInstances: miscCards,
    orderCardInstances: orderCards,
    orderDeck,
    playerInstances,
    playerToHand,
    siteCardInstances: siteCards,
    siteToDeck,
    siteToOutOfTownDeck,
  } = state;
  assert.ok(miscCards);
  assert.equal(
    Object.keys(miscCards).length,
    6,
    `miscCards length = ${Object.keys(miscCards).length}`
  );
  assert.ok(orderCards);
  assert.equal(
    Object.keys(orderCards).length,
    144,
    `orderCards length = ${Object.keys(orderCards).length}`
  );
  assert.ok(siteCards);
  assert.equal(
    Object.keys(siteCards).length,
    36,
    `siteCards length = ${Object.keys(siteCards).length}`
  );
  assert.ok(playerInstances);
  assert.equal(
    Object.keys(playerInstances).length,
    2,
    `playerInstances length = ${Object.keys(playerInstances).length}`
  );

  assert.ok(orderDeck);
  assert.equal(orderDeck.length, 132, `orderDeck.length = ${orderDeck.length}`);

  assert.ok(jackDeck);
  assert.equal(jackDeck.length, 6, `jackDeck.length = ${jackDeck.length}`);

  assert.ok(siteToDeck);
  assert.equal(Object.keys(siteToDeck).length, 6);
  assert.ok(siteToOutOfTownDeck);
  assert.equal(Object.keys(siteToOutOfTownDeck).length, 6);

  const hand1 = playerToHand[1];
  assert.ok(hand1, `hand1 = ${hand1}`);
  assert.equal(hand1.length, 5);
  const hand2 = playerToHand[2];
  assert.ok(hand2, `hand2 = ${hand2}`);
  assert.equal(hand2.length, 5);

  assert.equal(
    [1, 2].includes(initiativePlayerId),
    true,
    `initiativePlayerId = ${initiativePlayerId}`
  );
});

const SetupTest = {};
export default SetupTest;
