import Role from "../artifact/Role.js";
import Step from "../artifact/Step.js";

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

import RoleFunction from "./RoleFunction.js";
import TestData from "./TestData.js";

QUnit.module("RoleFunction");

QUnit.test("Laborer execute()", (assert) => {
  // Setup.
  const stepKey = Step.PERFORM_ROLE;
  const playerId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentStep(stepKey));
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
    const stockpileIds = Selector.stockpile(playerId, state);
    assert.equal(
      stockpileIds.length,
      1,
      `stockpileIds.length = ${stockpileIds.length}`
    );
    done();
  };

  roleFunction.execute(playerId, store).then(callback);
});

QUnit.test("Merchant execute()", (assert) => {
  // Setup.
  const stepKey = Step.PERFORM_ROLE;
  const playerId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentStep(stepKey));
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
    const stockpileIds = Selector.stockpile(playerId, state);
    assert.equal(
      stockpileIds.length,
      0,
      `stockpileIds.length = ${stockpileIds.length}`
    );
    const vaultIds = Selector.vault(playerId, state);
    assert.equal(vaultIds.length, 1, `vaultIds.length = ${vaultIds.length}`);
    done();
  };

  roleFunction.execute(playerId, store).then(callback);
});

QUnit.test("Patron execute()", (assert) => {
  // Setup.
  const stepKey = Step.PERFORM_ROLE;
  const playerId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentStep(stepKey));
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
    const clienteleIds = Selector.clientele(playerId, state);
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
  const stepKey = Step.DECLARE_ROLE;
  const playerId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentStep(stepKey));
  store.dispatch(ActionCreator.setCurrentPlayer(playerId));
  const roleFunction = RoleFunction[Role.THINKER];

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    const state = store.getState();
    const handIds = Selector.hand(playerId, state);
    assert.equal(handIds.length, 6, `handIds.length = ${handIds.length}`);
    done();
  };

  roleFunction.execute(playerId, store).then(callback);
});

QUnit.test("Thinker execute() needs refill", (assert) => {
  // Setup.
  const stepKey = Step.DECLARE_ROLE;
  const playerId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(playerId));
  store.dispatch(ActionCreator.setCurrentStep(stepKey));
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
    const handIds = Selector.hand(playerId, state);
    assert.equal(
      [5, 6].includes(handIds.length),
      true,
      `handIds.length = ${handIds.length}`
    );
    done();
  };

  roleFunction.execute(playerId, store).then(callback);
});

QUnit.test("Thinker execute() out of Jacks", (assert) => {
  // Setup.
  const stepKey = Step.DECLARE_ROLE;
  const playerId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(playerId));
  store.dispatch(ActionCreator.setCurrentStep(stepKey));
  store.dispatch(ActionCreator.setCurrentPlayer(playerId));
  store.dispatch(ActionCreator.setJackDeck([]));
  const roleFunction = RoleFunction[Role.THINKER];

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    const state = store.getState();
    const handIds = Selector.hand(playerId, state);
    assert.equal(handIds.length, 6, `handIds.length = ${handIds.length}`);
    done();
  };

  roleFunction.execute(playerId, store).then(callback);
});

const RoleFunctionTest = {};
export default RoleFunctionTest;
