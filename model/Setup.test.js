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
  const players = createPlayers();
  const store = Redux.createStore(Reducer.root);
  const orderDeck0 = DeckBuilder.buildOrderDeck(store);
  store.dispatch(ActionCreator.setOrderDeck(orderDeck0));

  // Run.
  Setup.createSiteDecks(players, store);

  // Verify.
  const state = store.getState();
  const { cardInstances, siteToDeck, siteToOutOfTownDeck } = state;
  assert.ok(cardInstances);
  assert.equal(Object.keys(cardInstances).length, 195);
  assert.ok(siteToDeck);
  assert.equal(Object.keys(siteToDeck).length, 6);
  assert.ok(siteToOutOfTownDeck);
  assert.equal(Object.keys(siteToOutOfTownDeck).length, 6);
});

QUnit.test("dealOrderCards()", (assert) => {
  // Setup.
  const players = createPlayers();
  const store = Redux.createStore(Reducer.root);
  const orderDeck0 = DeckBuilder.buildOrderDeck(store);
  store.dispatch(ActionCreator.setOrderDeck(orderDeck0));

  // Run.
  Setup.dealOrderCards(players, store);

  // Verify.
  const state = store.getState();
  const { cardInstances, orderDeck, playerToHand } = state;
  assert.ok(cardInstances);
  assert.equal(
    Object.keys(cardInstances).length,
    159,
    `cardInstances length = ${Object.keys(cardInstances).length}`
  );
  assert.ok(orderDeck);
  assert.equal(orderDeck.length, 149, `orderDeck.length = ${orderDeck.length}`);
  const hand1 = playerToHand[1];
  assert.ok(hand1, `hand1 = ${hand1}`);
  assert.equal(hand1.length, 5);
  const hand2 = playerToHand[2];
  assert.ok(hand2, `hand2 = ${hand2}`);
  assert.equal(hand2.length, 5);
});

QUnit.test("dealPoolCards()", (assert) => {
  // Setup.
  const players = createPlayers();
  const store = Redux.createStore(Reducer.root);
  const orderDeck0 = DeckBuilder.buildOrderDeck(store);
  store.dispatch(ActionCreator.setOrderDeck(orderDeck0));

  // Run.
  Setup.dealPoolCards(players, store);

  // Verify.
  const state = store.getState();
  const { cardInstances, cardPool, orderDeck } = state;
  assert.ok(cardInstances);
  assert.equal(
    Object.keys(cardInstances).length,
    159,
    `cardInstances length = ${Object.keys(cardInstances).length}`
  );
  assert.ok(orderDeck);
  assert.equal(orderDeck.length, 157, `orderDeck.length = ${orderDeck.length}`);
  assert.ok(cardPool);
  assert.equal(cardPool.length, 2, `cardPool.length = ${cardPool.length}`);
});

QUnit.test("execute()", (assert) => {
  // Setup.
  const players = createPlayers();

  // Run.
  const store = Setup.execute(players);

  // Verify.
  const state = store.getState();
  const {
    cardInstances,
    initiativePlayerId,
    jackDeck,
    orderDeck,
    playerInstances,
    playerToHand,
    siteToDeck,
    siteToOutOfTownDeck,
  } = state;
  assert.ok(cardInstances);
  assert.equal(
    Object.keys(cardInstances).length,
    201,
    `cardInstances length = ${Object.keys(cardInstances).length}`
  );
  assert.ok(playerInstances);
  assert.equal(
    Object.keys(playerInstances).length,
    2,
    `playerInstances length = ${Object.keys(playerInstances).length}`
  );

  assert.ok(orderDeck);
  assert.equal(orderDeck.length, 147, `orderDeck.length = ${orderDeck.length}`);

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
    initiativePlayerId,
    1,
    `initiativePlayerId = ${initiativePlayerId}`
  );
});

const SetupTest = {};
export default SetupTest;
