import MiscCard from "../artifact/MiscCard.js";
import OrderCard from "../artifact/OrderCard.js";
import SiteCard from "../artifact/SiteCard.js";

import AppState from "./AppState.js";
import ActionCreator from "./ActionCreator.js";
import OrderCardState from "./OrderCardState.js";
import PlayerState from "./PlayerState.js";
import Reducer from "./Reducer.js";
import Selector from "./Selector.js";
import SiteCardState from "./SiteCardState.js";
import StructureState from "./StructureState.js";

QUnit.module("Selector");

const addMiscCard = (id, cardKey, state) => {
  const card = OrderCardState.create({ id, cardKey });
  const action = ActionCreator.addMiscCard(card);

  return Reducer.root(state, action);
};

const addOrderCard = (id, cardKey, state) => {
  const card = OrderCardState.create({ id, cardKey });
  const action = ActionCreator.addOrderCard(card);

  return Reducer.root(state, action);
};

const addSiteCard = (id, cardKey, state) => {
  const card = SiteCardState.create({ id, cardKey });
  const action = ActionCreator.addSiteCard(card);

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

QUnit.test("nextMiscCardId()", (assert) => {
  // Setup.
  const state1 = AppState.create();

  // Run / Verify.
  assert.equal(Selector.nextMiscCardId(state1), 1);

  const state2 = addMiscCard(12, MiscCard.MERCHANT_BONUS_BRICK, state1);

  // Run / Verify.
  assert.equal(Selector.nextMiscCardId(state2), 13);
});

QUnit.test("nextOrderCardId()", (assert) => {
  // Setup.
  const state1 = AppState.create();

  // Run / Verify.
  assert.equal(Selector.nextOrderCardId(state1), 1);

  const state2 = addOrderCard(12, OrderCard.ACADEMY, state1);

  // Run / Verify.
  assert.equal(Selector.nextOrderCardId(state2), 13);
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

QUnit.test("nextSiteCardId()", (assert) => {
  // Setup.
  const state1 = AppState.create();

  // Run / Verify.
  assert.equal(Selector.nextSiteCardId(state1), 1);

  const state2 = addSiteCard(12, SiteCard.BRICK, state1);

  // Run / Verify.
  assert.equal(Selector.nextSiteCardId(state2), 13);
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

QUnit.test("orderCard()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const cardId = 1;
  const cardKey = OrderCard.ACADEMY;
  const state = addOrderCard(cardId, cardKey, state0);

  // Run / Verify.
  const result = Selector.orderCard(cardId, state);

  // Run / Verify.
  assert.ok(result);
  assert.equal(result.id, cardId);
  assert.equal(result.cardKey, cardKey);
});

QUnit.test("orderCards()", (assert) => {
  // Setup.
  let state = AppState.create();
  const orderCardKeys = OrderCard.keys();
  for (let id = 1; id <= 5; id += 1) {
    const cardKey = orderCardKeys[id - 1];
    state = addOrderCard(id, cardKey, state);
  }
  const cardIds = [1, 3, 5];

  // Run / Verify.
  const result = Selector.orderCards(cardIds, state);

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

QUnit.test("playersInOrder() 1", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const players = createPlayers4();
  const action0 = ActionCreator.setPlayers(players);
  const state1 = Reducer.root(state0, action0);
  const action1 = ActionCreator.setLeader(1);
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
  const action1 = ActionCreator.setLeader(2);
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
  const action1 = ActionCreator.setLeader(3);
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
  const action1 = ActionCreator.setLeader(4);
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

QUnit.test("siteCard()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const cardId = 1;
  const cardKey = OrderCard.ACADEMY;
  const state = addSiteCard(cardId, cardKey, state0);

  // Run / Verify.
  const result = Selector.siteCard(cardId, state);

  // Run / Verify.
  assert.ok(result);
  assert.equal(result.id, cardId);
  assert.equal(result.cardKey, cardKey);
});

QUnit.test("siteCards()", (assert) => {
  // Setup.
  let state = AppState.create();
  const orderCardKeys = OrderCard.keys();
  for (let id = 1; id <= 5; id += 1) {
    const cardKey = orderCardKeys[id - 1];
    state = addSiteCard(id, cardKey, state);
  }
  const cardIds = [1, 3, 5];

  // Run / Verify.
  const result = Selector.siteCards(cardIds, state);

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

const ReducerTest = {};
export default ReducerTest;
