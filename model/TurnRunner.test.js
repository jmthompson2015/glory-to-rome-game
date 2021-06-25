import Phase from "../artifact/Phase.js";
import Role from "../artifact/Role.js";

import ActionCreator from "../state/ActionCreator.js";
import S from "../state/Selector.js";

import GameFunction from "./GameFunction.js";
import TestData from "./TestData.js";

const { SingleStepRunner, TurnRunner } = GameEngine;

QUnit.module("TurnRunner");

const props = {
  actionCreator: ActionCreator,
  gameFunction: GameFunction,
  selector: S,
};

const engine = {
  turnRunner: TurnRunner,
  stepRunner: SingleStepRunner,
};

const assertEqual = (assert, name, value, expected) => {
  assert.equal(value, expected, `${name} = ${value}`);
};

const assertLength = (assert, name, array, expected) => {
  assert.equal(array.length, expected, `${name} length = ${array.length}`);
};

const assertSet = (assert, name, value, expecteds) => {
  assert.equal(expecteds.includes(value), true, `${name} = ${value}`);
};

QUnit.test("execute() Declare Role", (assert) => {
  // Setup.
  const phaseKey = Phase.DECLARE_ROLE;
  const playerId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPhase(phaseKey));
  store.dispatch(ActionCreator.setLeader(playerId));
  store.dispatch(ActionCreator.setCurrentPlayer(playerId));

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    const state = store.getState();
    assert.equal(S.currentRound(state), 1);
    assert.equal(S.currentPhaseKey(state), phaseKey);
    assert.equal(S.currentPlayerId(state), undefined);
    assert.equal(S.currentStepKey(state), undefined);

    const roleSet = [Role.ARCHITECT, Role.LEGIONARY, Role.THINKER];
    assertSet(assert, "leadRoleKey", S.leadRoleKey(state), roleSet);
    assertLength(assert, "cardPool", S.cardPool(state), 5);
    const deckLengths = [111, 112, 113, 114];
    assertSet(assert, "orderDeck", S.orderDeck(state).length, deckLengths);
    assertSet(assert, "campIds", S.campIds(playerId, state).length, [0, 1]);
    assertSet(assert, "handIds", S.handIds(playerId, state).length, [4, 6]);
    assertLength(assert, "clienteleIds", S.clienteleIds(playerId, state), 0);
    assertLength(assert, "influenceIds", S.influenceIds(playerId, state), 0);
    assertLength(assert, "stockpileIds", S.stockpileIds(playerId, state), 0);
    assertLength(assert, "vaultIds", S.vaultIds(playerId, state), 0);
    done();
  };

  TurnRunner.execute(props, store, engine)
    .then(callback)
    .catch((error) => {
      assert.ok(false, error.message);
      done();
    });
});

QUnit.test("execute() Perform Role", (assert) => {
  // Setup.
  const phaseKey = Phase.PERFORM_ROLE;
  const playerId = 1;
  const leadRoleKey = Role.ARCHITECT;
  const cardId = 2;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPhase(phaseKey));
  store.dispatch(ActionCreator.setLeader(playerId));
  store.dispatch(ActionCreator.setCurrentPlayer(playerId));
  store.dispatch(ActionCreator.setLeadRole(leadRoleKey));
  store.dispatch(ActionCreator.transferHandToCamp(playerId, cardId));

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    const state = store.getState();
    assert.equal(S.currentRound(state), 1);
    assert.equal(S.currentPhaseKey(state), phaseKey);
    assert.equal(S.currentPlayerId(state), undefined);
    assert.equal(S.currentStepKey(state), undefined);

    assertEqual(assert, "leadRoleKey", S.leadRoleKey(state), leadRoleKey);
    assertLength(assert, "cardPool", S.cardPool(state), 5);
    assertEqual(assert, "orderDeck len", S.orderDeck(state).length, 114);
    assertEqual(assert, "campIds len", S.campIds(playerId, state).length, 1);
    assertEqual(assert, "handIds len", S.handIds(playerId, state).length, 3);
    assertLength(assert, "clienteleIds", S.clienteleIds(playerId, state), 0);
    assertLength(assert, "influenceIds", S.influenceIds(playerId, state), 0);
    assertLength(assert, "stockpileIds", S.stockpileIds(playerId, state), 0);
    assertLength(assert, "vaultIds", S.vaultIds(playerId, state), 0);
    done();
  };

  TurnRunner.execute(props, store, engine)
    .then(callback)
    .catch((error) => {
      assert.ok(false, error.message);
      done();
    });
});

const TurnRunnerTest = {};
export default TurnRunnerTest;
