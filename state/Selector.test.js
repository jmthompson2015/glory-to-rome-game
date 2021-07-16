import BonusCard from "../artifact/BonusCard.js";
import Material from "../artifact/Material.js";
import OrderCard from "../artifact/OrderCard.js";
import SiteCard from "../artifact/SiteCard.js";

import AppState from "./AppState.js";
import ActionCreator from "./ActionCreator.js";
import BonusCardState from "./BonusCardState.js";
import OrderCardState from "./OrderCardState.js";
import PlayerState from "./PlayerState.js";
import Reducer from "./Reducer.js";
import Selector from "./Selector.js";
import SiteCardState from "./SiteCardState.js";
import StructureState from "./StructureState.js";

QUnit.module("Selector");

const addBonusCard = (state, id, cardKey) => {
  const card = BonusCardState.create({ id, cardKey });
  const action = ActionCreator.addBonusCard(card);

  return Reducer.root(state, action);
};

const addOrderCard = (state, id, cardKey) => {
  const card = OrderCardState.create({ id, cardKey });
  const action = ActionCreator.addOrderCard(card);

  return Reducer.root(state, action);
};

const addPoolCard = (state, id) => {
  const action = ActionCreator.addPoolCard(id);

  return Reducer.root(state, action);
};

const addSiteCard = (state, id, cardKey) => {
  const card = SiteCardState.create({ id, cardKey });
  const action = ActionCreator.addSiteCard(card);

  return Reducer.root(state, action);
};

const addStructure = (state, id, foundationId, siteId, materialIds) => {
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
QUnit.test("campIds()", (assert) => {
  // Setup.
  const state = AppState.create();
  const playerId = 3;

  // Run / Verify.
  const result = Selector.campIds(playerId, state);

  // Run / Verify.
  assert.ok(result);
  assert.equal(Array.isArray(result), true);
  assert.equal(result.length, 0);
});

QUnit.test("clienteleIds()", (assert) => {
  // Setup.
  const state = AppState.create();
  const playerId = 3;

  // Run / Verify.
  const result = Selector.clienteleIds(playerId, state);

  // Run / Verify.
  assert.ok(result);
  assert.equal(Array.isArray(result), true);
  assert.equal(result.length, 0);
});

QUnit.test("computeInfluence()", (assert) => {
  // Setup.
  const state = AppState.create();
  const playerId = 3;

  // Run / Verify.
  const result = Selector.computeInfluence(playerId, state);

  // Run / Verify.
  assert.equal(result, 2);
});

QUnit.test("delay()", (assert) => {
  // Setup.
  const state = AppState.create();

  // Run.
  const result = Selector.delay(state);

  // Verify.
  assert.equal(result, 1000);
});

QUnit.test("handIds()", (assert) => {
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
  const result = Selector.handIds(playerId, state);

  // Verify.
  assert.ok(result);
  assert.ok(Array.isArray(result));
  assert.equal(result.length, 1);
  assert.equal(result.includes(cardId), true);
  assert.equal(result[0], cardId);
});

QUnit.test("influenceIds()", (assert) => {
  // Setup.
  const state = AppState.create();
  const playerId = 3;

  // Run / Verify.
  const result = Selector.influenceIds(playerId, state);

  // Run / Verify.
  assert.ok(result);
  assert.equal(Array.isArray(result), true);
  assert.equal(result.length, 0);
});

QUnit.test("isLeader()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const players = createPlayers();
  const action0 = ActionCreator.setPlayers(players);
  const state1 = Reducer.root(state0, action0);
  const playerId = 3;
  const action1 = ActionCreator.setLeader(playerId);
  const state = Reducer.root(state1, action1);

  // Run / Verify.
  assert.equal(Selector.isLeader(1, state), false);
  assert.equal(Selector.isLeader(3, state), true);
});

QUnit.test("isStructureComplete()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const cardId1 = 1;
  const cardKey1 = OrderCard.AMPHITHEATRE; // Architect Concrete 2
  const state1 = addOrderCard(state0, cardId1, cardKey1);
  const cardId2 = 2;
  const cardKey2 = SiteCard.CONCRETE;
  const state2 = addSiteCard(state1, cardId2, cardKey2);
  const cardId3 = 3;
  const cardKey3 = OrderCard.AQUEDUCT; // Architect Concrete 2
  const state3 = addOrderCard(state2, cardId3, cardKey3);
  const structureId1 = 1;
  const state4 = addStructure(
    state3,
    structureId1,
    cardId1, // foundationId,
    cardId2, // siteId,
    [cardId3] // materialIds,
  );

  // Run / Verify.
  assert.equal(Selector.isStructureComplete(structureId1, state4), false);

  const cardId4 = 4;
  const cardKey4 = OrderCard.BRIDGE; // Architect Concrete 2
  const state5 = addOrderCard(state4, cardId4, cardKey4);
  const structureId2 = 2;
  const state = addStructure(
    state5,
    structureId2,
    cardId1, // foundationId,
    cardId2, // siteId,
    [cardId3, cardId4] // materialIds,
  );

  // Run / Verify.
  assert.equal(Selector.isStructureComplete(structureId2, state), true);
});

QUnit.test("leaderCard()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const cardId = 12;
  const cardKey = OrderCard.LEADER;
  const state = addOrderCard(state0, cardId, cardKey);

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
  const action1 = ActionCreator.setLeader(playerId);
  const state = Reducer.root(state1, action1);

  // Run.
  const result = Selector.leaderId(state);

  // Verify.
  assert.equal(result, playerId);
});

QUnit.test("nextBonusCardId()", (assert) => {
  // Setup.
  const state1 = AppState.create();

  // Run / Verify.
  assert.equal(Selector.nextBonusCardId(state1), 1);

  const state2 = addBonusCard(state1, 12, BonusCard.MERCHANT_BONUS_BRICK);

  // Run / Verify.
  assert.equal(Selector.nextBonusCardId(state2), 13);
});

QUnit.test("nextOrderCardId()", (assert) => {
  // Setup.
  const state1 = AppState.create();

  // Run / Verify.
  assert.equal(Selector.nextOrderCardId(state1), 1);

  const state2 = addOrderCard(state1, 12, OrderCard.ACADEMY);

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

  const state2 = addSiteCard(state1, 12, SiteCard.BRICK);

  // Run / Verify.
  assert.equal(Selector.nextSiteCardId(state2), 13);
});

QUnit.test("nextStructureId()", (assert) => {
  // Setup.
  const state1 = AppState.create();

  // Run / Verify.
  assert.equal(Selector.nextStructureId(state1), 1);

  const state2 = addStructure(state1, 12, 3, 4, []);

  // Run / Verify.
  assert.equal(Selector.nextStructureId(state2), 13);
});

QUnit.test("orderCard()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const cardId = 1;
  const cardKey = OrderCard.ACADEMY;
  const state = addOrderCard(state0, cardId, cardKey);

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
    state = addOrderCard(state, id, cardKey);
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
  const action1 = ActionCreator.setLeader(1);
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
  const action1 = ActionCreator.setLeader(2);
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
  const action1 = ActionCreator.setLeader(3);
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
  const action1 = ActionCreator.setLeader(4);
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

QUnit.test("poolIdsByMaterial()", (assert) => {
  // Setup.
  let state = AppState.create();
  const poolCardKeys = OrderCard.keys();
  for (let id = 1; id <= 12; id += 1) {
    const cardKey = poolCardKeys[id - 1];
    state = addOrderCard(state, id, cardKey);
    state = addPoolCard(state, id);
  }
  const materialKey = Material.BRICK;

  // Run / Verify.
  const result = Selector.poolIdsByMaterial(materialKey, state);

  // Run / Verify.
  assert.ok(result);
  assert.equal(Array.isArray(result), true);
  assert.equal(result.length, 4, `result.length = ${result.length}`);
  assert.equal(R.head(result), 1);
  assert.equal(R.last(result), 8);
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

QUnit.test("score()", (assert) => {
  // Setup.
  const state = AppState.create();
  const playerId = 3;

  // Run / Verify.
  const result = Selector.score(playerId, state);

  // Run / Verify.
  assert.equal(result, 2);
});

QUnit.test("siteCard()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const cardId = 1;
  const cardKey = OrderCard.ACADEMY;
  const state = addSiteCard(state0, cardId, cardKey);

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
    state = addSiteCard(state, id, cardKey);
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

QUnit.test("siteIdsByMaterial()", (assert) => {
  // Setup.
  let state = AppState.create();
  const siteCardKeys = SiteCard.keys();
  for (let id = 1; id <= 3; id += 1) {
    const cardKey = siteCardKeys[id - 1];
    state = addSiteCard(state, id, cardKey);
  }
  const action = ActionCreator.setSiteDeck([1, 2, 3]);
  state = Reducer.root(state, action);
  const materialKey = Material.BRICK;

  // Run / Verify.
  const result = Selector.siteIdsByMaterial(materialKey, state);

  // Run / Verify.
  assert.ok(result);
  assert.equal(Array.isArray(result), true);
  assert.equal(result.length, 1, `result.length = ${result.length}`);
  assert.equal(R.head(result), 1);
});

QUnit.test("stockpileIds()", (assert) => {
  // Setup.
  const state = AppState.create();
  const playerId = 3;

  // Run / Verify.
  const result = Selector.stockpileIds(playerId, state);

  // Run / Verify.
  assert.ok(result);
  assert.equal(Array.isArray(result), true);
  assert.equal(result.length, 0);
});

QUnit.test("unfinishedStructureIds()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const playerId = 3;
  const state1 = addOrderCard(state0, 2, OrderCard.ACADEMY);
  const state2 = addSiteCard(state1, 1, SiteCard.BRICK);
  const state3 = addStructure(state2, 1, 2, 1, []);
  const state4 = addOrderCard(state3, 3, OrderCard.AMPHITHEATRE);
  const state5 = addSiteCard(state4, 2, SiteCard.CONCRETE);
  const state6 = addStructure(state5, 2, 3, 2, [5, 6]);
  const action6 = ActionCreator.addToPlayerArray(
    "playerToStructures",
    playerId,
    1
  );
  const state7 = Reducer.root(state6, action6);
  const action7 = ActionCreator.addToPlayerArray(
    "playerToStructures",
    playerId,
    2
  );
  const state = Reducer.root(state7, action7);

  // Run / Verify.
  const result = Selector.unfinishedStructureIds(playerId, state);

  // Run / Verify.
  assert.ok(result);
  assert.equal(Array.isArray(result), true);
  assert.equal(result.length, 1, `result.length = ${result.length}`);
  assert.equal(R.head(result), 1);
});

QUnit.test("unfinishedStructureIdsByMaterial()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const playerId = 3;
  const state1 = addOrderCard(state0, 2, OrderCard.ACADEMY);
  const state2 = addSiteCard(state1, 1, SiteCard.BRICK);
  const state3 = addStructure(state2, 1, 2, 1, []);
  const state4 = addOrderCard(state3, 3, OrderCard.AMPHITHEATRE);
  const state5 = addSiteCard(state4, 2, SiteCard.CONCRETE);
  const state6 = addStructure(state5, 2, 3, 2, [5, 6]);
  const action6 = ActionCreator.addToPlayerArray(
    "playerToStructures",
    playerId,
    1
  );
  const state7 = Reducer.root(state6, action6);
  const action7 = ActionCreator.addToPlayerArray(
    "playerToStructures",
    playerId,
    2
  );
  const state = Reducer.root(state7, action7);
  const materialKey = Material.BRICK;

  // Run / Verify.
  const result = Selector.unfinishedStructureIdsByMaterial(
    materialKey,
    playerId,
    state
  );

  // Run / Verify.
  assert.ok(result);
  assert.equal(Array.isArray(result), true);
  assert.equal(result.length, 1, `result.length = ${result.length}`);
  assert.equal(R.head(result), 1);
});

QUnit.test("vaultIds()", (assert) => {
  // Setup.
  const state = AppState.create();
  const playerId = 3;

  // Run / Verify.
  const result = Selector.vaultIds(playerId, state);

  // Run / Verify.
  assert.ok(result);
  assert.equal(Array.isArray(result), true);
  assert.equal(result.length, 0);
});

const ReducerTest = {};
export default ReducerTest;
