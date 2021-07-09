import Material from "../artifact/Material.js";
import MoveOption from "../artifact/MoveOption.js";
import Role from "../artifact/Role.js";
import Phase from "../artifact/Phase.js";

import ActionCreator from "../state/ActionCreator.js";
import MoveState from "../state/MoveState.js";
import Selector from "../state/Selector.js";
import StructureState from "../state/StructureState.js";

import StepFunction from "./StepFunction.js";
import TestData from "./TestData.js";

QUnit.module("StepFunction");

const isInRange = (low, value, high) => low <= value && value <= high;

QUnit.test("declareRole() 1", (assert) => {
  // Setup.
  const leaderId = 1;
  const store = TestData.createStore();
  // store.dispatch(ActionCreator.setVerbose(true));
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(leaderId));
  store.dispatch(ActionCreator.setCurrentPhase(Phase.DECLARE_ROLE));

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    const camp = store.getState().playerToCamp[leaderId] || [];
    assert.ok(camp, `camp = ${JSON.stringify(camp)}`);
    if (camp.length > 0) {
      assert.equal(camp.length, 1, `camp.length = ${camp.length}`);
      assert.equal([2, 3, 4, 5, 6].includes(R.head(camp)), true);
    }
    done();
  };

  StepFunction.declareRole(store).then(callback);
});

QUnit.test("declareRole() Thinker", (assert) => {
  // Setup.
  const phaseKey = Phase.DECLARE_ROLE;
  const roleKey = Role.THINKER;
  const playerId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPhase(phaseKey));
  store.dispatch(ActionCreator.setCurrentPlayer(playerId));
  store.dispatch(ActionCreator.setLeadRole(Role.ARCHITECT));
  const move = MoveState.create({
    cardId: 1,
    moveKey: MoveOption.DRAW_JACK,
    playerId,
    roleKey,
    state: store.getState(),
  });
  store.dispatch(ActionCreator.setCurrentMove(move));

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    const state = store.getState();
    const handIds = Selector.handIds(playerId, state);
    assert.equal(
      [4, 6].includes(handIds.length),
      true,
      `handIds.length = ${handIds.length}`
    );
    done();
  };

  StepFunction.declareRole(store).then(callback);
});

QUnit.test("declareRole() Thinker needs refill", (assert) => {
  // Setup.
  const phaseKey = Phase.DECLARE_ROLE;
  const roleKey = Role.THINKER;
  const playerId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(playerId));
  store.dispatch(ActionCreator.setCurrentPhase(phaseKey));
  store.dispatch(ActionCreator.setCurrentPlayer(playerId));
  store.dispatch(ActionCreator.setLeadRole(Role.ARCHITECT));
  const cardId = R.last(Selector.cardPool(store.getState()));
  store.dispatch(ActionCreator.transferPoolToStockpile(playerId, cardId));
  const move = MoveState.create({
    cardId: 1,
    moveKey: MoveOption.REFILL_HAND,
    playerId,
    roleKey,
    state: store.getState(),
  });
  store.dispatch(ActionCreator.setCurrentMove(move));

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    const state = store.getState();
    const handIds = Selector.handIds(playerId, state);
    assert.equal(
      [4, 6].includes(handIds.length),
      true,
      `handIds.length = ${handIds.length}`
    );
    done();
  };

  StepFunction.declareRole(store).then(callback);
});

QUnit.test("declareRole() Thinker out of Jacks", (assert) => {
  // Setup.
  const phaseKey = Phase.DECLARE_ROLE;
  const roleKey = Role.THINKER;
  const playerId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(playerId));
  store.dispatch(ActionCreator.setCurrentPhase(phaseKey));
  store.dispatch(ActionCreator.setCurrentPlayer(playerId));
  store.dispatch(ActionCreator.setLeadRole(Role.ARCHITECT));
  store.dispatch(ActionCreator.setJackDeck([]));
  const move = MoveState.create({
    cardId: 1,
    moveKey: MoveOption.DRAW_CARD,
    playerId,
    roleKey,
    state: store.getState(),
  });
  store.dispatch(ActionCreator.setCurrentMove(move));

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    const state = store.getState();
    const handIds = Selector.handIds(playerId, state);
    assert.equal(
      [4, 6].includes(handIds.length),
      true,
      `handIds.length = ${handIds.length}`
    );
    done();
  };

  StepFunction.declareRole(store).then(callback);
});

QUnit.test("performRole() Architect Build Structure", (assert) => {
  // Setup.
  const phaseKey = Phase.PERFORM_ROLE;
  const roleKey = Role.ARCHITECT;
  const playerId = 1;
  const store = TestData.createStore();
  // store.dispatch(ActionCreator.setVerbose(true));
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPhase(phaseKey));
  store.dispatch(ActionCreator.setCurrentPlayer(playerId));
  store.dispatch(ActionCreator.setLeadRole(roleKey));
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
    const stockpileIds = Selector.stockpileIds(playerId, state);
    assert.equal(
      stockpileIds.length,
      0,
      `stockpileIds.length = ${stockpileIds.length}`
    );
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
    const { foundationType, materialIds, materialTypes, siteType } = structure;
    assert.ok(foundationType);
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
    assert.ok(materialIds);
    assert.equal(
      materialIds.length,
      1,
      `materialIds.length = ${materialIds.length}`
    );
    assert.ok(materialTypes);
    assert.equal(
      materialTypes.length,
      1,
      `materialTypes.length = ${materialTypes.length}`
    );
    assert.ok(siteType);
    done();
  };

  StepFunction.performRole(store).then(callback);
});

QUnit.test("performRole() Architect Lay Foundation", (assert) => {
  // Setup.
  const phaseKey = Phase.PERFORM_ROLE;
  const roleKey = Role.ARCHITECT;
  const playerId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPhase(phaseKey));
  store.dispatch(ActionCreator.setCurrentPlayer(playerId));
  store.dispatch(ActionCreator.setLeadRole(roleKey));
  store.dispatch(ActionCreator.transferHandToCamp(playerId, 2));

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    const state = store.getState();
    const handIds = Selector.handIds(playerId, state);
    assert.equal(handIds.length, 3, `handIds.length = ${handIds.length}`);
    assert.equal(
      [3, 4].includes(R.head(handIds)),
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

  StepFunction.performRole(store).then(callback);
});

QUnit.test("performRole() Craftsman Build Structure", (assert) => {
  // Setup.
  const phaseKey = Phase.PERFORM_ROLE;
  const roleKey = Role.CRAFTSMAN;
  const playerId = 1;
  const store = TestData.createStore();
  // store.dispatch(ActionCreator.setVerbose(true));
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPhase(phaseKey));
  store.dispatch(ActionCreator.setCurrentPlayer(playerId));
  store.dispatch(ActionCreator.setLeadRole(roleKey));
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
    const { foundationType, materialIds, materialTypes, siteType } = structure;
    assert.ok(foundationType);
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
    assert.ok(materialIds);
    assert.equal(
      materialIds.length,
      1,
      `materialIds.length = ${materialIds.length}`
    );
    assert.ok(materialTypes);
    assert.equal(
      materialTypes.length,
      1,
      `materialTypes.length = ${materialTypes.length}`
    );
    assert.ok(siteType);
    done();
  };

  StepFunction.performRole(store).then(callback);
});

QUnit.test("performRole() Craftsman Lay Foundation", (assert) => {
  // Setup.
  const phaseKey = Phase.PERFORM_ROLE;
  const roleKey = Role.CRAFTSMAN;
  const playerId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPhase(phaseKey));
  store.dispatch(ActionCreator.setCurrentPlayer(playerId));
  store.dispatch(ActionCreator.setLeadRole(roleKey));
  store.dispatch(ActionCreator.transferHandToCamp(playerId, 2));

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    const state = store.getState();
    const handIds = Selector.handIds(playerId, state);
    assert.equal(handIds.length, 3, `handIds.length = ${handIds.length}`);
    assert.equal(
      [3, 4].includes(R.head(handIds)),
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

  StepFunction.performRole(store).then(callback);
});

QUnit.test("performRole() Laborer", (assert) => {
  // Setup.
  const leaderId = 1;
  const store = TestData.createStore();
  // store.dispatch(ActionCreator.setVerbose(true));
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(leaderId));
  store.dispatch(ActionCreator.setCurrentPhase(Phase.PERFORM_ROLE));
  store.dispatch(ActionCreator.setLeadRole(Role.LABORER));
  // TestData.printOrderCards(store);
  // TestData.printHands(store);
  // TestData.printCardPool(store);
  store.dispatch(ActionCreator.addToPlayerArray("playerToHand", 1, 67));
  store.dispatch(ActionCreator.transferHandToCamp(1, 67));
  store.dispatch(ActionCreator.transferHandToCamp(4, 16));
  store.dispatch(ActionCreator.transferHandToCamp(5, 21));
  assert.equal(
    store.getState().cardPool.length,
    5,
    `cardPool.length = ${store.getState().cardPool.length}`
  );

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    const { cardPool, playerToStockpile } = store.getState();
    assert.ok(cardPool, `cardPool = ${JSON.stringify(cardPool)}`);
    assert.equal(cardPool.length, 4, `cardPool.length = ${cardPool.length}`);

    const stockpile1 = playerToStockpile[1] || [];
    assert.ok(stockpile1, `stockpile1 = ${JSON.stringify(stockpile1)}`);
    assert.equal(
      stockpile1.length,
      1,
      `stockpile1.length = ${stockpile1.length}`
    );
    assert.equal(isInRange(26, R.head(stockpile1), 31), true);

    const stockpile4 = playerToStockpile[4] || [];
    assert.ok(stockpile4, `stockpile4 = ${JSON.stringify(stockpile4)}`);
    assert.equal(
      stockpile4.length,
      0,
      `stockpile4.length = ${stockpile4.length}`
    );

    const stockpile5 = playerToStockpile[5] || [];
    assert.ok(stockpile5, `stockpile5 = ${JSON.stringify(stockpile5)}`);
    assert.equal(
      stockpile5.length,
      0,
      `stockpile5.length = ${stockpile5.length}`
    );
    done();
  };

  StepFunction.performRole(store).then(callback);
});

QUnit.test("performRole() Legionary", (assert) => {
  // Setup.
  const phaseKey = Phase.PERFORM_ROLE;
  const roleKey = Role.LEGIONARY;
  const playerId = 1;
  const store = TestData.createStore();
  // store.dispatch(ActionCreator.setVerbose(true));
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPhase(phaseKey));
  store.dispatch(ActionCreator.setCurrentPlayer(playerId));
  store.dispatch(ActionCreator.setLeadRole(roleKey));

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

  StepFunction.performRole(store).then(callback);
});

QUnit.test("performRole() Merchant", (assert) => {
  // Setup.
  const leaderId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(leaderId));
  store.dispatch(ActionCreator.setCurrentPhase(Phase.PERFORM_ROLE));
  store.dispatch(ActionCreator.setLeadRole(Role.MERCHANT));
  // TestData.printOrderCards(store);
  // TestData.printHands(store);
  // TestData.printCardPool(store);
  store.dispatch(ActionCreator.transferOrderToHand(3, 31));
  store.dispatch(ActionCreator.transferHandToCamp(3, 31));
  store.dispatch(ActionCreator.transferPoolToStockpile(3, 27));

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    const { playerToStockpile, playerToVault } = store.getState();
    const stockpile3 = playerToStockpile[3] || [];
    assert.ok(stockpile3, `stockpile3 = ${JSON.stringify(stockpile3)}`);
    assert.equal(
      stockpile3.length,
      1,
      `stockpile3.length = ${stockpile3.length}`
    );
    const vault3 = playerToVault[3] || [];
    assert.ok(vault3, `vault3 = ${JSON.stringify(vault3)}`);
    assert.equal(vault3.length, 0, `vault3.length = ${vault3.length}`);
    // assert.equal(vault3, 27);
    done();
  };

  StepFunction.performRole(store).then(callback);
});

QUnit.test("performRole() Patron", (assert) => {
  // Setup.
  const leaderId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(leaderId));
  store.dispatch(ActionCreator.setCurrentPhase(Phase.PERFORM_ROLE));
  store.dispatch(ActionCreator.setLeadRole(Role.PATRON));
  // TestData.printOrderCards(store);
  // TestData.printHands(store);
  // TestData.printCardPool(store);
  store.dispatch(ActionCreator.transferHandToCamp(5, 22));

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    const { cardPool } = store.getState();
    assert.ok(cardPool, `cardPool = ${JSON.stringify(cardPool)}`);
    assert.equal(cardPool.length, 5, `cardPool.length = ${cardPool.length}`);

    const clientele5 = store.getState().playerToClientele[5] || [];
    assert.ok(clientele5, `clientele5 = ${JSON.stringify(clientele5)}`);
    assert.equal(
      clientele5.length,
      0,
      `clientele5.length = ${clientele5.length}`
    );
    done();
  };

  StepFunction.performRole(store).then(callback);
});

const StepFunctionTest = {};
export default StepFunctionTest;
