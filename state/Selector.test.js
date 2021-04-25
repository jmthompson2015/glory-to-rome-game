import OrderCard from "../artifact/OrderCard.js";

import AppState from "./AppState.js";
import ActionCreator from "./ActionCreator.js";
import CardState from "./CardState.js";
import PlayerState from "./PlayerState.js";
import Reducer from "./Reducer.js";
import Selector from "./Selector.js";
import StructureState from "./StructureState.js";

QUnit.module("Selector");

const addCard = (id, cardKey, state) => {
  const card = CardState.create({ id, cardKey });
  const action = ActionCreator.addCard(card);

  return Reducer.root(state, action);
};

const addStructure = (id, foundationId, siteId, state) => {
  const structure = StructureState.create({ id, foundationId, siteId });
  const action = ActionCreator.addStructure(structure);

  return Reducer.root(state, action);
};

const createPlayers2 = () => {
  const ravenPlayer1 = PlayerState.create({
    id: 1,
    name: "Alan",
  });
  const wolfPlayer1 = PlayerState.create({
    id: 2,
    name: "Brian",
  });

  return [ravenPlayer1, wolfPlayer1];
};

const createPlayers4 = () => {
  const ravenPlayer1 = PlayerState.create({
    id: 1,
    name: "Alan",
  });
  const wolfPlayer1 = PlayerState.create({
    id: 2,
    name: "Brian",
  });
  const ravenPlayer2 = PlayerState.create({
    id: 3,
    name: "Chris",
  });
  const wolfPlayer2 = PlayerState.create({
    id: 4,
    name: "David",
  });

  return [ravenPlayer1, wolfPlayer1, ravenPlayer2, wolfPlayer2];
};

// /////////////////////////////////////////////////////////////////////////////////////////////////
QUnit.test("card()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const cardId = 1;
  const cardKey = OrderCard.ACADEMY;
  const state = addCard(cardId, cardKey, state0);

  // Run / Verify.
  const result = Selector.card(cardId, state);

  // Run / Verify.
  assert.ok(result);
  assert.equal(result.id, cardId);
  assert.equal(result.cardKey, cardKey);
});

QUnit.test("cards()", (assert) => {
  // Setup.
  let state = AppState.create();
  const orderCardKeys = OrderCard.keys();
  for (let id = 1; id <= 5; id += 1) {
    const cardKey = orderCardKeys[id - 1];
    state = addCard(id, cardKey, state);
  }
  const cardIds = [1, 3, 5];

  // Run / Verify.
  const result = Selector.cards(cardIds, state);

  // Run / Verify.
  assert.ok(result);
  assert.equal(Array.isArray(result), true);
  assert.equal(result.length, cardIds.length);
  const result0 = result[0];
  assert.ok(result0);
  assert.equal(result0.id, 1);
  assert.equal(result0.cardKey, OrderCard.ACADEMY);
  const result1 = result[1];
  assert.ok(result1);
  assert.equal(result1.id, 3);
  assert.equal(result1.cardKey, OrderCard.AQUEDUCT);
  const result2 = result[2];
  assert.ok(result2);
  assert.equal(result2.id, 5);
  assert.equal(result2.cardKey, OrderCard.ATRIUM);
});

QUnit.test("delay()", (assert) => {
  // Setup.
  const state = AppState.create();

  // Run.
  const result = Selector.delay(state);

  // Verify.
  assert.equal(result, 1000);
});

QUnit.test("hand()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const playerId = 3;
  const cardId = 12;
  const action = ActionCreator.addToPlayerArray(
    "playerToHand",
    playerId,
    cardId
  );
  const state = Reducer.root(state0, action);

  // Run.
  const result = Selector.hand(playerId, state);

  // Verify.
  assert.ok(result);
  assert.ok(Array.isArray(result));
  assert.equal(result.length, 1);
  assert.equal(result.includes(cardId), true);
  assert.equal(result[0], cardId);
});

QUnit.test("nextCardId()", (assert) => {
  // Setup.
  const state1 = AppState.create();

  // Run / Verify.
  assert.equal(Selector.nextCardId(state1), 1);

  const state2 = addCard(12, OrderCard.ACADEMY, state1);

  // Run / Verify.
  assert.equal(Selector.nextCardId(state2), 13);
});

QUnit.test("nextPlayerId()", (assert) => {
  // Setup.
  const state1 = AppState.create();

  // Run / Verify.
  assert.equal(Selector.nextPlayerId(state1), 1);

  const players = createPlayers2();
  const action1 = ActionCreator.setPlayers(players);
  const state2 = Reducer.root(state1, action1);

  // Run / Verify.
  assert.equal(Selector.nextPlayerId(state2), 3);
});

QUnit.test("nextStructureId()", (assert) => {
  // Setup.
  const state1 = AppState.create();

  // Run / Verify.
  assert.equal(Selector.nextStructureId(state1), 1);

  const state2 = addStructure(12, 3, 4, state1);

  // Run / Verify.
  assert.equal(Selector.nextStructureId(state2), 13);
});

QUnit.test("playersInOrder() 1", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const players = createPlayers4();
  const action0 = ActionCreator.setPlayers(players);
  const state1 = Reducer.root(state0, action0);
  const action1 = ActionCreator.setInitiativePlayer(1);
  const state = Reducer.root(state1, action1);

  // Run.
  const result = Selector.playersInOrder(state);

  // Verify.
  assert.ok(result);
  assert.equal(Array.isArray(result), true);
  assert.equal(result.length, 4);
  assert.equal(result[0].id, 1);
  assert.equal(result[1].id, 2);
  assert.equal(result[2].id, 3);
  assert.equal(result[3].id, 4);
});

QUnit.test("playersInOrder() 2", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const players = createPlayers4();
  const action0 = ActionCreator.setPlayers(players);
  const state1 = Reducer.root(state0, action0);
  const action1 = ActionCreator.setInitiativePlayer(2);
  const state = Reducer.root(state1, action1);

  // Run.
  const result = Selector.playersInOrder(state);

  // Verify.
  assert.ok(result);
  assert.equal(Array.isArray(result), true);
  assert.equal(result.length, 4);
  assert.equal(result[0].id, 2);
  assert.equal(result[1].id, 3);
  assert.equal(result[2].id, 4);
  assert.equal(result[3].id, 1);
});

QUnit.test("playersInOrder() 3", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const players = createPlayers4();
  const action0 = ActionCreator.setPlayers(players);
  const state1 = Reducer.root(state0, action0);
  const action1 = ActionCreator.setInitiativePlayer(3);
  const state = Reducer.root(state1, action1);

  // Run.
  const result = Selector.playersInOrder(state);

  // Verify.
  assert.ok(result);
  assert.equal(Array.isArray(result), true);
  assert.equal(result.length, 4);
  assert.equal(result[0].id, 3);
  assert.equal(result[1].id, 4);
  assert.equal(result[2].id, 1);
  assert.equal(result[3].id, 2);
});

QUnit.test("playersInOrder() 4", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const players = createPlayers4();
  const action0 = ActionCreator.setPlayers(players);
  const state1 = Reducer.root(state0, action0);
  const action1 = ActionCreator.setInitiativePlayer(4);
  const state = Reducer.root(state1, action1);

  // Run.
  const result = Selector.playersInOrder(state);

  // Verify.
  assert.ok(result);
  assert.equal(Array.isArray(result), true);
  assert.equal(result.length, 4);
  assert.equal(result[0].id, 4);
  assert.equal(result[1].id, 1);
  assert.equal(result[2].id, 2);
  assert.equal(result[3].id, 3);
});

const ReducerTest = {};
export default ReducerTest;
