import BonusCard from "../artifact/BonusCard.js";
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

const addBonusCard = (id, cardKey, state) => {
  const card = OrderCardState.create({ id, cardKey });
  const action = ActionCreator.addBonusCard(card);

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

const addStructure = (id, foundationId, siteId, materialIds, state) => {
  const structure = StructureState.create({
    id,
    foundationId,
    siteId,
    materialIds,
  });
  const action = ActionCreator.addStructure(structure);

  return Reducer.root(state, action);
};

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

// /////////////////////////////////////////////////////////////////////////////////////////////////
QUnit.test("camp()", (assert) => {
  // Setup.
  const state = AppState.create();
  const playerId = 3;

  // Run / Verify.
  const result = Selector.camp(playerId, state);

  // Run / Verify.
  assert.ok(result);
  assert.equal(Array.isArray(result), true);
  assert.equal(result.length, 0);
});

QUnit.test("clientele()", (assert) => {
  // Setup.
  const state = AppState.create();
  const playerId = 3;

  // Run / Verify.
  const result = Selector.clientele(playerId, state);

  // Run / Verify.
  assert.ok(result);
  assert.equal(Array.isArray(result), true);
  assert.equal(result.length, 0);
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

QUnit.test("influence()", (assert) => {
  // Setup.
  const state = AppState.create();
  const playerId = 3;

  // Run / Verify.
  const result = Selector.influence(playerId, state);

  // Run / Verify.
  assert.ok(result);
  assert.equal(Array.isArray(result), true);
  assert.equal(result.length, 0);
});

QUnit.test("leaderCard()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const cardId = 12;
  const cardKey = OrderCard.LEADER;
  const state = addOrderCard(cardId, cardKey, state0);

  // Run / Verify.
  const result = Selector.leaderCard(state);

  // Run / Verify.
  assert.ok(result);
  assert.equal(result.id, cardId);
  assert.equal(result.cardKey, cardKey);
});

QUnit.test("leaderId()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const players = createPlayers();
  const action0 = ActionCreator.setPlayers(players);
  const state1 = Reducer.root(state0, action0);
  const playerId = 3;
  const action1 = ActionCreator.setCurrentPlayer(playerId);
  const state = Reducer.root(state1, action1);

  // Run / Verify.
  const result = Selector.leaderId(state);

  // Run / Verify.
  assert.equal(result, playerId);
});

QUnit.test("nextBonusCardId()", (assert) => {
  // Setup.
  const state1 = AppState.create();

  // Run / Verify.
  assert.equal(Selector.nextBonusCardId(state1), 1);

  const state2 = addBonusCard(12, BonusCard.MERCHANT_BONUS_BRICK, state1);

  // Run / Verify.
  assert.equal(Selector.nextBonusCardId(state2), 13);
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

  const players = createPlayers();
  const action1 = ActionCreator.setPlayers(players);
  const state2 = Reducer.root(state1, action1);

  // Run / Verify.
  assert.equal(Selector.nextPlayerId(state2), 6);
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

  const state2 = addStructure(12, 3, 4, [], state1);

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
  const players = createPlayers();
  const action0 = ActionCreator.setPlayers(players);
  const state1 = Reducer.root(state0, action0);
  const action1 = ActionCreator.setCurrentPlayer(1);
  const state = Reducer.root(state1, action1);

  // Run.
  const result = Selector.playersInOrder(state);

  // Verify.
  assert.ok(result);
  assert.equal(Array.isArray(result), true);
  assert.equal(result.length, 5);
  assert.equal(result[0].id, 1);
  assert.equal(result[1].id, 2);
  assert.equal(result[2].id, 3);
  assert.equal(result[3].id, 4);
  assert.equal(result[4].id, 5);
});

QUnit.test("playersInOrder() 2", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const players = createPlayers();
  const action0 = ActionCreator.setPlayers(players);
  const state1 = Reducer.root(state0, action0);
  const action1 = ActionCreator.setCurrentPlayer(2);
  const state = Reducer.root(state1, action1);

  // Run.
  const result = Selector.playersInOrder(state);

  // Verify.
  assert.ok(result);
  assert.equal(Array.isArray(result), true);
  assert.equal(result.length, 5);
  assert.equal(result[0].id, 2);
  assert.equal(result[1].id, 3);
  assert.equal(result[2].id, 4);
  assert.equal(result[3].id, 5);
  assert.equal(result[4].id, 1);
});

QUnit.test("playersInOrder() 3", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const players = createPlayers();
  const action0 = ActionCreator.setPlayers(players);
  const state1 = Reducer.root(state0, action0);
  const action1 = ActionCreator.setCurrentPlayer(3);
  const state = Reducer.root(state1, action1);

  // Run.
  const result = Selector.playersInOrder(state);

  // Verify.
  assert.ok(result);
  assert.equal(Array.isArray(result), true);
  assert.equal(result.length, 5);
  assert.equal(result[0].id, 3);
  assert.equal(result[1].id, 4);
  assert.equal(result[2].id, 5);
  assert.equal(result[3].id, 1);
  assert.equal(result[4].id, 2);
});

QUnit.test("playersInOrder() 4", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const players = createPlayers();
  const action0 = ActionCreator.setPlayers(players);
  const state1 = Reducer.root(state0, action0);
  const action1 = ActionCreator.setCurrentPlayer(4);
  const state = Reducer.root(state1, action1);

  // Run.
  const result = Selector.playersInOrder(state);

  // Verify.
  assert.ok(result);
  assert.equal(Array.isArray(result), true);
  assert.equal(result.length, 5);
  assert.equal(result[0].id, 4);
  assert.equal(result[1].id, 5);
  assert.equal(result[2].id, 1);
  assert.equal(result[3].id, 2);
  assert.equal(result[4].id, 3);
});

QUnit.test("refillLimit()", (assert) => {
  // Setup.
  const state = AppState.create();
  const playerId = 1;

  // Run / Verify.
  const result = Selector.refillLimit(playerId, state);

  // Run / Verify.
  assert.equal(result, 5);
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

QUnit.test("sitesAvailable()", (assert) => {
  // Setup.
  let state = AppState.create();
  const siteCardKeys = SiteCard.keys();
  for (let id = 1; id <= 3; id += 1) {
    const cardKey = siteCardKeys[id - 1];
    state = addSiteCard(id, cardKey, state);
    const action = ActionCreator.setSiteToDeck(cardKey, [id]);
    state = Reducer.root(state, action);
  }

  // Run / Verify.
  const result = Selector.sitesAvailable(state);

  // Run / Verify.
  assert.ok(result);
  assert.equal(Array.isArray(result), true);
  assert.equal(result.length, 3);
  const resultFirst = R.head(result);
  assert.equal(resultFirst, SiteCard.BRICK);
  const resultLast = R.last(result);
  assert.equal(resultLast, SiteCard.MARBLE);
});

QUnit.test("stockpile()", (assert) => {
  // Setup.
  const state = AppState.create();
  const playerId = 3;

  // Run / Verify.
  const result = Selector.stockpile(playerId, state);

  // Run / Verify.
  assert.ok(result);
  assert.equal(Array.isArray(result), true);
  assert.equal(result.length, 0);
});

QUnit.test("unfinishedStructures()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const playerId = 3;
  const state1 = addSiteCard(1, SiteCard.BRICK, state0);
  const state2 = addStructure(1, 2, 1, [], state1);
  const state3 = addSiteCard(2, SiteCard.CONCRETE, state2);
  const state4 = addStructure(2, 3, 2, [5, 6], state3);
  const action4 = ActionCreator.addToPlayerArray(
    "playerToStructures",
    playerId,
    1
  );
  const state5 = Reducer.root(state4, action4);
  const action5 = ActionCreator.addToPlayerArray(
    "playerToStructures",
    playerId,
    2
  );
  const state = Reducer.root(state5, action5);

  // Run / Verify.
  const result = Selector.unfinishedStructures(playerId, state);

  // Run / Verify.
  assert.ok(result);
  assert.equal(Array.isArray(result), true);
  assert.equal(result.length, 1, `result.length = ${result.length}`);
  assert.equal(R.head(result), 1);
});

QUnit.test("vault()", (assert) => {
  // Setup.
  const state = AppState.create();
  const playerId = 3;

  // Run / Verify.
  const result = Selector.vault(playerId, state);

  // Run / Verify.
  assert.ok(result);
  assert.equal(Array.isArray(result), true);
  assert.equal(result.length, 0);
});

const ReducerTest = {};
export default ReducerTest;
