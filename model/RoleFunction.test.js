import Role from "../artifact/Role.js";
import Step from "../artifact/Step.js";

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

import RoleFunction from "./RoleFunction.js";
import TestData from "./TestData.js";

QUnit.module("RoleFunction");

QUnit.test("Thinker execute()", (assert) => {
  // Setup.
  const stepKey = Step.DECLARE_ROLE;
  const playerId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(0));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentStep(stepKey));
  store.dispatch(ActionCreator.setLeader(playerId));
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
  store.dispatch(ActionCreator.setDelay(0));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(playerId));
  store.dispatch(ActionCreator.setCurrentStep(stepKey));
  store.dispatch(ActionCreator.setLeader(playerId));
  store.dispatch(ActionCreator.transferHandToStockpile(playerId, 1));
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
  store.dispatch(ActionCreator.setDelay(0));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(playerId));
  store.dispatch(ActionCreator.setCurrentStep(stepKey));
  store.dispatch(ActionCreator.setLeader(playerId));
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
