import Material from "../artifact/Material.js";
import Phase from "../artifact/Phase.js";
import Role from "../artifact/Role.js";

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";
import StructureState from "../state/StructureState.js";

import RoleFunction from "./RoleFunction.js";
import TestData from "./TestData.js";

QUnit.module("RoleFunction");

QUnit.test("Architect execute() Build Structure", (assert) => {
  // Setup.
  const phaseKey = Phase.PERFORM_ROLE;
  const playerId = 1;
  const store = TestData.createStore();
  // store.dispatch(ActionCreator.setVerbose(true));
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPhase(phaseKey));
  store.dispatch(ActionCreator.setCurrentPlayer(playerId));
  const roleFunction = RoleFunction[Role.ARCHITECT];
  // Lay a foundation.
  const handIds0 = Selector.handIds(playerId, store.getState());
  const foundationId = R.head(handIds0);
  const siteIds0 = Selector.siteIdsByMaterial(Material.BRICK, store.getState());
  const siteId = R.head(siteIds0);
  const structureState = StructureState.create({
    id: 1,
    foundationId,
    siteId,
    store,
  });
  store.dispatch(ActionCreator.layFoundation(playerId, structureState));
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
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    const state = store.getState();
    const handIds = Selector.handIds(playerId, state);
    assert.equal(handIds.length, 0, `handIds.length = ${handIds.length}`);
    const siteIds = Selector.siteDeck(state);
    assert.equal(siteIds.length, 29, `siteIds.length = ${siteIds.length}`);
    const poolIds = Selector.cardPool(state);
    assert.equal(poolIds.length, 4, `poolIds.length = ${poolIds.length}`);
    const structureIds = Selector.structureIds(playerId, state);
    assert.equal(
      structureIds.length,
      1,
      `structureIds.length = ${structureIds.length}`
    );
    const structure = Selector.structure(1, store.getState());
    assert.ok(structure);
    const { materialIds } = structure;
    assert.ok(materialIds);
    assert.equal(
      structure.foundationId,
      foundationId,
      `structure.foundationId = ${structure.foundationId}`
    );
    assert.equal(
      structure.siteId,
      siteId,
      `structure.siteId = ${structure.siteId}`
    );
    assert.equal(
      materialIds.length,
      1,
      `materialIds.length = ${materialIds.length}`
    );
    done();
  };

  roleFunction.execute(playerId, store).then(callback);
});

QUnit.test("Architect execute() Lay Foundation", (assert) => {
  // Setup.
  const phaseKey = Phase.PERFORM_ROLE;
  const playerId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPhase(phaseKey));
  store.dispatch(ActionCreator.setCurrentPlayer(playerId));
  const roleFunction = RoleFunction[Role.ARCHITECT];

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    const state = store.getState();
    const handIds = Selector.handIds(playerId, state);
    assert.equal(handIds.length, 4, `handIds.length = ${handIds.length}`);
    assert.equal(
      [2, 3].includes(R.head(handIds)),
      true,
      `handIds[0] = ${R.head(handIds)}`
    );
    assert.equal(
      [5, 6].includes(R.last(handIds)),
      true,
      `handIds[last] = ${R.last(handIds)}`
    );
    const siteIds = Selector.siteDeck(state);
    assert.equal(siteIds.length, 29, `siteIds.length = ${siteIds.length}`);
    const poolIds = Selector.cardPool(state);
    assert.equal(poolIds.length, 5, `poolIds.length = ${poolIds.length}`);
    const structureIds = Selector.structureIds(playerId, state);
    assert.equal(
      structureIds.length,
      1,
      `structureIds.length = ${structureIds.length}`
    );
    done();
  };

  roleFunction.execute(playerId, store).then(callback);
});

QUnit.test("Craftsman execute() Build Structure", (assert) => {
  // Setup.
  const phaseKey = Phase.PERFORM_ROLE;
  const playerId = 1;
  const store = TestData.createStore();
  // store.dispatch(ActionCreator.setVerbose(true));
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPhase(phaseKey));
  store.dispatch(ActionCreator.setCurrentPlayer(playerId));
  const roleFunction = RoleFunction[Role.CRAFTSMAN];
  // Lay a foundation.
  const handIds0 = Selector.handIds(playerId, store.getState());
  const foundationId = R.head(handIds0);
  const siteIds0 = Selector.siteIdsByMaterial(Material.BRICK, store.getState());
  const siteId = R.head(siteIds0);
  const structureState = StructureState.create({
    id: 1,
    foundationId,
    siteId,
    store,
  });
  store.dispatch(ActionCreator.layFoundation(playerId, structureState));
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
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    const state = store.getState();
    const handIds = Selector.handIds(playerId, state);
    assert.equal(handIds.length, 0, `handIds.length = ${handIds.length}`);
    const siteIds = Selector.siteDeck(state);
    assert.equal(siteIds.length, 25, `siteIds.length = ${siteIds.length}`);
    const poolIds = Selector.cardPool(state);
    assert.equal(poolIds.length, 5, `poolIds.length = ${poolIds.length}`);
    const structureIds = Selector.structureIds(playerId, state);
    assert.equal(
      structureIds.length,
      1,
      `structureIds.length = ${structureIds.length}`
    );
    const structure = Selector.structure(1, store.getState());
    assert.ok(structure);
    const { materialIds } = structure;
    assert.ok(materialIds);
    assert.equal(
      structure.foundationId,
      foundationId,
      `structure.foundationId = ${structure.foundationId}`
    );
    assert.equal(
      structure.siteId,
      siteId,
      `structure.siteId = ${structure.siteId}`
    );
    assert.equal(
      materialIds.length,
      1,
      `materialIds.length = ${materialIds.length}`
    );
    done();
  };

  roleFunction.execute(playerId, store).then(callback);
});

QUnit.test("Craftsman execute() Lay Foundation", (assert) => {
  // Setup.
  const phaseKey = Phase.PERFORM_ROLE;
  const playerId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPhase(phaseKey));
  store.dispatch(ActionCreator.setCurrentPlayer(playerId));
  const roleFunction = RoleFunction[Role.CRAFTSMAN];

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    const state = store.getState();
    const handIds = Selector.handIds(playerId, state);
    assert.equal(handIds.length, 4, `handIds.length = ${handIds.length}`);
    assert.equal(
      [2, 3].includes(R.head(handIds)),
      true,
      `handIds[0] = ${R.head(handIds)}`
    );
    assert.equal(
      [5, 6].includes(R.last(handIds)),
      true,
      `handIds[last] = ${R.last(handIds)}`
    );
    const siteIds = Selector.siteDeck(state);
    assert.equal(siteIds.length, 29, `siteIds.length = ${siteIds.length}`);
    const poolIds = Selector.cardPool(state);
    assert.equal(poolIds.length, 5, `poolIds.length = ${poolIds.length}`);
    const structureIds = Selector.structureIds(playerId, state);
    assert.equal(
      structureIds.length,
      1,
      `structureIds.length = ${structureIds.length}`
    );
    done();
  };

  roleFunction.execute(playerId, store).then(callback);
});

QUnit.test("Laborer execute()", (assert) => {
  // Setup.
  const phaseKey = Phase.PERFORM_ROLE;
  const playerId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPhase(phaseKey));
  store.dispatch(ActionCreator.setCurrentPlayer(playerId));
  const roleFunction = RoleFunction[Role.LABORER];

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    const state = store.getState();
    const poolIds = Selector.cardPool(state);
    assert.equal(poolIds.length, 4, `poolIds.length = ${poolIds.length}`);
    const stockpileIds = Selector.stockpileIds(playerId, state);
    assert.equal(
      stockpileIds.length,
      1,
      `stockpileIds.length = ${stockpileIds.length}`
    );
    done();
  };

  roleFunction.execute(playerId, store).then(callback);
});

QUnit.test("Legionary execute()", (assert) => {
  // Setup.
  const phaseKey = Phase.PERFORM_ROLE;
  const playerId = 1;
  const store = TestData.createStore();
  // store.dispatch(ActionCreator.setVerbose(true));
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPhase(phaseKey));
  store.dispatch(ActionCreator.setCurrentPlayer(playerId));
  const roleFunction = RoleFunction[Role.LEGIONARY];

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    const state = store.getState();
    const poolIds = Selector.cardPool(state);
    assert.equal(
      [4, 5].includes(poolIds.length),
      true,
      `poolIds.length = ${poolIds.length}`
    );
    const leftHandIds = Selector.handIds(2, state);
    assert.equal(
      [4, 5].includes(leftHandIds.length),
      true,
      `leftHandIds.length = ${leftHandIds.length}`
    );
    const rightHandIds = Selector.handIds(5, state);
    assert.equal(
      [4, 5].includes(rightHandIds.length),
      true,
      `rightHandIds.length = ${rightHandIds.length}`
    );
    const stockpileIds = Selector.stockpileIds(playerId, state);
    assert.equal(
      [0, 1, 2, 3].includes(stockpileIds.length),
      true,
      `stockpileIds.length = ${stockpileIds.length}`
    );
    done();
  };

  roleFunction.execute(playerId, store).then(callback);
});

QUnit.test("Merchant execute()", (assert) => {
  // Setup.
  const phaseKey = Phase.PERFORM_ROLE;
  const playerId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPhase(phaseKey));
  store.dispatch(ActionCreator.setCurrentPlayer(playerId));
  const cardId = R.last(Selector.cardPool(store.getState()));
  store.dispatch(ActionCreator.transferPoolToStockpile(playerId, cardId));
  const roleFunction = RoleFunction[Role.MERCHANT];

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    const state = store.getState();
    const stockpileIds = Selector.stockpileIds(playerId, state);
    assert.equal(
      stockpileIds.length,
      0,
      `stockpileIds.length = ${stockpileIds.length}`
    );
    const vaultIds = Selector.vaultIds(playerId, state);
    assert.equal(vaultIds.length, 1, `vaultIds.length = ${vaultIds.length}`);
    done();
  };

  roleFunction.execute(playerId, store).then(callback);
});

QUnit.test("Patron execute()", (assert) => {
  // Setup.
  const phaseKey = Phase.PERFORM_ROLE;
  const playerId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPhase(phaseKey));
  store.dispatch(ActionCreator.setCurrentPlayer(playerId));
  const roleFunction = RoleFunction[Role.PATRON];

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    const state = store.getState();
    const poolIds = Selector.cardPool(state);
    assert.equal(poolIds.length, 4, `poolIds.length = ${poolIds.length}`);
    const clienteleIds = Selector.clienteleIds(playerId, state);
    assert.equal(
      clienteleIds.length,
      1,
      `clienteleIds.length = ${clienteleIds.length}`
    );
    done();
  };

  roleFunction.execute(playerId, store).then(callback);
});

QUnit.test("Thinker execute()", (assert) => {
  // Setup.
  const phaseKey = Phase.DECLARE_ROLE;
  const playerId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPhase(phaseKey));
  store.dispatch(ActionCreator.setCurrentPlayer(playerId));
  const roleFunction = RoleFunction[Role.THINKER];

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    const state = store.getState();
    const handIds = Selector.handIds(playerId, state);
    assert.equal(handIds.length, 6, `handIds.length = ${handIds.length}`);
    done();
  };

  roleFunction.execute(playerId, store).then(callback);
});

QUnit.test("Thinker execute() needs refill", (assert) => {
  // Setup.
  const phaseKey = Phase.DECLARE_ROLE;
  const playerId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(playerId));
  store.dispatch(ActionCreator.setCurrentPhase(phaseKey));
  store.dispatch(ActionCreator.setCurrentPlayer(playerId));
  const cardId = R.last(Selector.cardPool(store.getState()));
  store.dispatch(ActionCreator.transferPoolToStockpile(playerId, cardId));
  const roleFunction = RoleFunction[Role.THINKER];

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    const state = store.getState();
    const handIds = Selector.handIds(playerId, state);
    assert.equal(
      [6, 7].includes(handIds.length),
      true,
      `handIds.length = ${handIds.length}`
    );
    done();
  };

  roleFunction.execute(playerId, store).then(callback);
});

QUnit.test("Thinker execute() out of Jacks", (assert) => {
  // Setup.
  const phaseKey = Phase.DECLARE_ROLE;
  const playerId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(playerId));
  store.dispatch(ActionCreator.setCurrentPhase(phaseKey));
  store.dispatch(ActionCreator.setCurrentPlayer(playerId));
  store.dispatch(ActionCreator.setJackDeck([]));
  const roleFunction = RoleFunction[Role.THINKER];

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    const state = store.getState();
    const handIds = Selector.handIds(playerId, state);
    assert.equal(handIds.length, 6, `handIds.length = ${handIds.length}`);
    done();
  };

  roleFunction.execute(playerId, store).then(callback);
});

const RoleFunctionTest = {};
export default RoleFunctionTest;
