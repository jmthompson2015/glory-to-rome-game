import Phase from "../artifact/Phase.js";
import Role from "../artifact/Role.js";

import ActionCreator from "../state/ActionCreator.js";

import MCTSPlayerStrategy from "./MCTSPlayerStrategy.js";
import MoveGenerator from "./MoveGenerator.js";
import TestData from "./TestData.js";

QUnit.module("MCTSPlayerStrategy");

const ROUND_LIMIT = 3;
const ALLOWED_TIME = 100;

QUnit.test("chooseMove()", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const phaseKey = Phase.PERFORM_ROLE;
  const playerId = 1;
  const roleKey = Role.ARCHITECT;
  store.dispatch(ActionCreator.setVerbose(true));
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPhase(phaseKey));
  store.dispatch(ActionCreator.setCurrentPlayer(playerId));
  store.dispatch(ActionCreator.setLeadRole(roleKey));
  const delay = 0;
  const options = MoveGenerator.generateOptions(
    roleKey,
    playerId,
    store.getState()
  );

  // Run.
  const done = assert.async();
  const callback = (result) => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    assert.ok(result);
    assert.equal(R.includes(result, options), true);
    done();
  };

  MCTSPlayerStrategy.chooseMove(
    options,
    store,
    delay,
    ROUND_LIMIT,
    ALLOWED_TIME
  ).then(callback);
});

QUnit.test("chooseRole()", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const phaseKey = Phase.DECLARE_ROLE;
  const playerId = 1;
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentPhase(phaseKey));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(playerId));
  const delay = 0;
  const options = MoveGenerator.generateRoleOptions(playerId, store.getState());

  // Run.
  const done = assert.async();
  const callback = (result) => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    assert.ok(result);
    assert.equal(R.includes(result, options), true);
    done();
  };

  MCTSPlayerStrategy.chooseRole(
    options,
    store,
    delay,
    ROUND_LIMIT,
    ALLOWED_TIME
  ).then(callback);
});

const MCTSPlayerStrategyTest = {};
export default MCTSPlayerStrategyTest;
