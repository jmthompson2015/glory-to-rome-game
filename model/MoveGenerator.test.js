import Material from "../artifact/Material.js";
import Role from "../artifact/Role.js";

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

import MoveGenerator from "./MoveGenerator.js";
import TestData from "./TestData.js";

QUnit.module("MoveGenerator");

QUnit.test("generateArchitectOptions() Build Structure", (assert) => {
  // Setup.
  const playerId = 1;
  const store = TestData.createStore();
  // Lay a foundation.
  const handIds0 = Selector.handIds(playerId, store.getState());
  const foundationId = R.head(handIds0);
  const siteIds0 = Selector.siteIdsByMaterial(Material.BRICK, store.getState());
  const siteId = R.head(siteIds0);
  store.dispatch(ActionCreator.layFoundation(playerId, foundationId, siteId));
  // Add a card to stockpile.
  const cardPool = Selector.cardPool(store.getState());
  const cardId = R.head(cardPool);
  store.dispatch(ActionCreator.transferPoolToStockpile(playerId, cardId));
  // Empty player's hand.
  store.dispatch(ActionCreator.transferHandToCamp(playerId, 3));
  store.dispatch(ActionCreator.transferHandToCamp(playerId, 4));
  store.dispatch(ActionCreator.transferHandToCamp(playerId, 5));
  store.dispatch(ActionCreator.transferHandToCamp(playerId, 6));

  // Run.
  const result = MoveGenerator.generateArchitectOptions(
    playerId,
    store.getState()
  );

  // Verify.
  assert.ok(result, `result = ${JSON.stringify(result)}`);
  assert.equal(result.length, 1, `result.length = ${result.length}`);
  const moveFirst = R.head(result);
  assert.equal(
    moveFirst.moveKey,
    "build structure",
    `moveFirst.moveKey = ${moveFirst.moveKey}`
  );
  assert.equal(moveFirst.cardId, 27, `moveFirst.cardId = ${moveFirst.cardId}`);
  assert.equal(
    moveFirst.structureId,
    1,
    `moveFirst.structureId = ${moveFirst.structureId}`
  );
});

QUnit.test("generateArchitectOptions() Lay Foundation", (assert) => {
  // Setup.
  const playerId = 1;
  const store = TestData.createStore();

  // Run.
  const result = MoveGenerator.generateArchitectOptions(
    playerId,
    store.getState()
  );

  // Verify.
  assert.ok(result, `result = ${JSON.stringify(result)}`);
  assert.equal(result.length, 5, `result.length = ${result.length}`);
  const moveFirst = R.head(result);
  assert.equal(
    moveFirst.moveKey,
    "lay a foundation",
    `moveFirst.moveKey = ${moveFirst.moveKey}`
  );
  assert.equal(moveFirst.cardId, 2, `moveFirst.cardId = ${moveFirst.cardId}`);
  const moveLast = R.last(result);
  assert.equal(
    moveLast.moveKey,
    "lay a foundation",
    `moveLast.moveKey = ${moveLast.moveKey}`
  );
  assert.equal(moveLast.cardId, 6, `moveLast.cardId = ${moveLast.cardId}`);
});

QUnit.test("generateCraftsmanOptions() Build Structure", (assert) => {
  // Setup.
  const playerId = 1;
  const store = TestData.createStore();
  // Lay a foundation.
  const handIds0 = Selector.handIds(playerId, store.getState());
  const foundationId = R.head(handIds0);
  const siteIds0 = Selector.siteIdsByMaterial(Material.BRICK, store.getState());
  const siteId = R.head(siteIds0);
  store.dispatch(ActionCreator.layFoundation(playerId, foundationId, siteId));
  // Remove cards from player's hand.
  store.dispatch(ActionCreator.transferHandToCamp(playerId, 4));
  store.dispatch(ActionCreator.transferHandToCamp(playerId, 5));
  store.dispatch(ActionCreator.transferHandToCamp(playerId, 6));
  // Remove brick sites.
  const oldSiteDeck = Selector.siteDeck(store.getState());
  const filterFunction = (siteCardId) => {
    const siteCard = Selector.siteCard(siteCardId, store.getState());
    return siteCard.cardType.materialKey !== Material.BRICK;
  };
  const newSiteDeck = R.filter(filterFunction, oldSiteDeck);
  store.dispatch(ActionCreator.setSiteDeck(newSiteDeck));

  // Run.
  const result = MoveGenerator.generateCraftsmanOptions(
    playerId,
    store.getState()
  );

  // Verify.
  assert.ok(result, `result = ${JSON.stringify(result)}`);
  assert.equal(result.length, 1, `result.length = ${result.length}`);
  const moveFirst = R.head(result);
  assert.equal(
    moveFirst.moveKey,
    "build structure",
    `moveFirst.moveKey = ${moveFirst.moveKey}`
  );
  assert.equal(moveFirst.cardId, 3, `moveFirst.cardId = ${moveFirst.cardId}`);
  assert.equal(
    moveFirst.structureId,
    1,
    `moveFirst.structureId = ${moveFirst.structureId}`
  );
});

QUnit.test("generateCraftsmanOptions() Lay Foundation", (assert) => {
  // Setup.
  const playerId = 1;
  const store = TestData.createStore();

  // Run.
  const result = MoveGenerator.generateCraftsmanOptions(
    playerId,
    store.getState()
  );

  // Verify.
  assert.ok(result, `result = ${JSON.stringify(result)}`);
  assert.equal(result.length, 5, `result.length = ${result.length}`);
  const moveFirst = R.head(result);
  assert.equal(
    moveFirst.moveKey,
    "lay a foundation",
    `moveFirst.moveKey = ${moveFirst.moveKey}`
  );
  assert.equal(moveFirst.cardId, 2, `moveFirst.cardId = ${moveFirst.cardId}`);
  const moveLast = R.last(result);
  assert.equal(
    moveLast.moveKey,
    "lay a foundation",
    `moveLast.moveKey = ${moveLast.moveKey}`
  );
  assert.equal(moveLast.cardId, 6, `moveLast.cardId = ${moveLast.cardId}`);
});

QUnit.test("generateLaborerOptions()", (assert) => {
  // Setup.
  const playerId = 1;
  const store = TestData.createStore();

  // Run.
  const result = MoveGenerator.generateLaborerOptions(
    playerId,
    store.getState()
  );

  // Verify.
  assert.ok(result, `result = ${JSON.stringify(result)}`);
  assert.equal(result.length, 5, `result.length = ${result.length}`);
  const moveFirst = R.head(result);
  assert.ok(moveFirst);
  assert.equal(moveFirst.cardId, 27, `moveFirst.cardId = ${moveFirst.cardId}`);
  const moveLast = R.last(result);
  assert.ok(moveLast);
  assert.equal(moveLast.cardId, 31, `moveLast.cardId = ${moveLast.cardId}`);
});

QUnit.test("generateLegionaryOptions()", (assert) => {
  // Setup.
  const playerId = 1;
  const store = TestData.createStore();

  // Run.
  const result = MoveGenerator.generateLegionaryOptions(
    playerId,
    store.getState()
  );

  // Verify.
  assert.ok(result, `result = ${JSON.stringify(result)}`);
  assert.equal(result.length, 5, `result.length = ${result.length}`);
  const moveFirst = R.head(result);
  assert.ok(moveFirst);
  assert.equal(moveFirst.cardId, 2, `moveFirst.cardId = ${moveFirst.cardId}`);
  const moveLast = R.last(result);
  assert.ok(moveLast);
  assert.equal(moveLast.cardId, 6, `moveLast.cardId = ${moveLast.cardId}`);
});

QUnit.test("generateMerchantOptions()", (assert) => {
  // Setup.
  const playerId = 1;
  const store = TestData.createStore();
  const cardId0 = R.head(Selector.cardPool(store.getState()));
  store.dispatch(ActionCreator.transferPoolToStockpile(playerId, cardId0));
  const cardId1 = R.last(Selector.cardPool(store.getState()));
  store.dispatch(ActionCreator.transferPoolToStockpile(playerId, cardId1));

  // Run.
  const result = MoveGenerator.generateMerchantOptions(
    playerId,
    store.getState()
  );

  // Verify.
  assert.ok(result, `result = ${JSON.stringify(result)}`);
  assert.equal(result.length, 2, `result.length = ${result.length}`);
  const moveFirst = R.head(result);
  assert.ok(moveFirst);
  assert.equal(moveFirst.cardId, 27, `moveFirst.cardId = ${moveFirst.cardId}`);
  const moveLast = R.last(result);
  assert.ok(moveLast);
  assert.equal(moveLast.cardId, 31, `moveLast.cardId = ${moveLast.cardId}`);
});

QUnit.test("generatePatronOptions()", (assert) => {
  // Setup.
  const playerId = 1;
  const store = TestData.createStore();

  // Run.
  const result = MoveGenerator.generatePatronOptions(
    playerId,
    store.getState()
  );

  // Verify.
  assert.ok(result, `result = ${JSON.stringify(result)}`);
  assert.equal(result.length, 5, `result.length = ${result.length}`);
  const moveFirst = R.head(result);
  assert.ok(moveFirst);
  assert.equal(moveFirst.cardId, 27, `moveFirst.cardId = ${moveFirst.cardId}`);
  const moveLast = R.last(result);
  assert.ok(moveLast);
  assert.equal(moveLast.cardId, 31, `moveLast.cardId = ${moveLast.cardId}`);
});

QUnit.test("generateRoleOptions() 1", (assert) => {
  // Setup.
  const playerId = 1;
  const store = TestData.createStore();

  // Run.
  const result = MoveGenerator.generateRoleOptions(playerId, store.getState());

  // Verify.
  assert.ok(result, `result = ${JSON.stringify(result)}`);
  assert.equal(result.length, 6, `result.length = ${result.length}`);
  const moveFirst = R.head(result);
  assert.ok(moveFirst);
  assert.equal(moveFirst.cardId, 2, `moveFirst.cardId = ${moveFirst.cardId}`);
  const moveLast = R.last(result);
  assert.ok(moveLast);
  assert.equal(moveLast.cardId, 1, `moveLast.cardId = ${moveLast.cardId}`);
});

QUnit.test("generateRoleOptions() 2", (assert) => {
  // Setup.
  const playerId = 2;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setLeadRole(Role.ARCHITECT));

  // Run.
  const result = MoveGenerator.generateRoleOptions(playerId, store.getState());

  // Verify.
  assert.ok(result, `result = ${JSON.stringify(result)}`);
  assert.equal(result.length, 5, `result.length = ${result.length}`);
  const moveFirst = R.head(result);
  assert.ok(moveFirst);
  assert.equal(moveFirst.cardId, 1, `moveFirst.cardId = ${moveFirst.cardId}`);
  const moveLast = R.last(result);
  assert.ok(moveLast);
  assert.equal(moveLast.cardId, 10, `moveLast.cardId = ${moveLast.cardId}`);
});

QUnit.test("generateRoleOptions() 3", (assert) => {
  // Setup.
  const playerId = 3;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setLeadRole(Role.ARCHITECT));

  // Run.
  const result = MoveGenerator.generateRoleOptions(playerId, store.getState());

  // Verify.
  assert.ok(result, `result = ${JSON.stringify(result)}`);
  assert.equal(result.length, 1, `result.length = ${result.length}`);
  const moveFirst = R.head(result);
  assert.ok(moveFirst);
  assert.equal(moveFirst.cardId, 1, `moveFirst.cardId = ${moveFirst.cardId}`);
});

QUnit.test("generateRoleOptions() 4", (assert) => {
  // Setup.
  const playerId = 4;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setLeadRole(Role.ARCHITECT));

  // Run.
  const result = MoveGenerator.generateRoleOptions(playerId, store.getState());

  // Verify.
  assert.ok(result, `result = ${JSON.stringify(result)}`);
  assert.equal(result.length, 1, `result.length = ${result.length}`);
  const moveFirst = R.head(result);
  assert.ok(moveFirst);
  assert.equal(moveFirst.cardId, 1, `moveFirst.cardId = ${moveFirst.cardId}`);
});

QUnit.test("generateRoleOptions() 5", (assert) => {
  // Setup.
  const playerId = 5;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setLeadRole(Role.ARCHITECT));

  // Run.
  const result = MoveGenerator.generateRoleOptions(playerId, store.getState());

  // Verify.
  assert.ok(result, `result = ${JSON.stringify(result)}`);
  assert.equal(result.length, 1, `result.length = ${result.length}`);
  const moveFirst = R.head(result);
  assert.ok(moveFirst);
  assert.equal(moveFirst.cardId, 1, `moveFirst.cardId = ${moveFirst.cardId}`);
});

QUnit.test("generateThinkerOptions()", (assert) => {
  // Setup.
  const playerId = 1;
  const store = TestData.createStore();

  // Run.
  const result = MoveGenerator.generateThinkerOptions(
    playerId,
    store.getState()
  );

  // Verify.
  assert.ok(result, `result = ${JSON.stringify(result)}`);
  assert.equal(result.length, 2, `result.length = ${result.length}`);
  assert.equal(
    R.head(result),
    "draw a jack",
    `R.head(result) = ${R.head(result)}`
  );
  assert.equal(
    R.last(result),
    "draw a card",
    `R.last(result) = ${R.last(result)}`
  );
});

QUnit.test("generateThinkerOptions() needs refill", (assert) => {
  // Setup.
  const playerId = 1;
  const store = TestData.createStore();
  const cardId0 = R.head(Selector.handIds(playerId, store.getState()));
  store.dispatch(ActionCreator.transferHandToCamp(playerId, cardId0));
  const cardId1 = R.head(Selector.handIds(playerId, store.getState()));
  store.dispatch(ActionCreator.transferHandToCamp(playerId, cardId1));

  // Run.
  const result = MoveGenerator.generateThinkerOptions(
    playerId,
    store.getState()
  );

  // Verify.
  assert.ok(result, `result = ${JSON.stringify(result)}`);
  assert.equal(result.length, 2, `result.length = ${result.length}`);
  assert.equal(
    R.head(result),
    "draw a jack",
    `R.head(result) = ${R.head(result)}`
  );
  assert.equal(
    R.last(result),
    "refill hand",
    `R.last(result) = ${R.last(result)}`
  );
});

QUnit.test("generateThinkerOptions() out of Jacks", (assert) => {
  // Setup.
  const playerId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setJackDeck([]));

  // Run.
  const result = MoveGenerator.generateThinkerOptions(
    playerId,
    store.getState()
  );

  // Verify.
  assert.ok(result, `result = ${JSON.stringify(result)}`);
  assert.equal(result.length, 1, `result.length = ${result.length}`);
  assert.equal(
    R.head(result),
    "draw a card",
    `R.head(result) = ${R.head(result)}`
  );
});

const MoveGeneratorTest = {};
export default MoveGeneratorTest;
