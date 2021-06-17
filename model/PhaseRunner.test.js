import ActionCreator from "../state/ActionCreator.js";
import S from "../state/Selector.js";

import GameFunction from "./GameFunction.js";
import TestData from "./TestData.js";

const { PhaseRunner, SingleStepRunner, TurnRunner } = GameEngine;

QUnit.module("PhaseRunner");

const props = {
  actionCreator: ActionCreator,
  gameFunction: GameFunction,
  selector: S,
};

const engine = {
  phaseRunner: PhaseRunner,
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

QUnit.test("execute()", (assert) => {
  // Setup.
  const playerId = 1;
  const store = TestData.createStore();
  // store.dispatch(ActionCreator.setVerbose(true));
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    const state = store.getState();
    assert.equal(S.currentRound(state), 1);
    assert.equal(S.currentPhaseKey(state), undefined);
    assert.equal(S.currentPlayerId(state), undefined);
    assert.equal(S.currentStepKey(state), undefined);

    assertLength(assert, "currentMoves", S.currentMoves(state), 0);
    assertEqual(assert, "leadRoleKey", S.leadRoleKey(state), null);
    assertSet(assert, "cardPool len", S.cardPool(state).length, [5, 6, 7]);
    const deckLen = [110, 111, 112, 113, 114];
    assertSet(assert, "orderDeck len", S.orderDeck(state).length, deckLen);
    assertEqual(assert, "campIds", S.campIds(playerId, state).length, 0);
    const handLen = [3, 4, 6];
    assertSet(
      assert,
      "handIds len",
      S.handIds(playerId, state).length,
      handLen
    );
    assertLength(assert, "clienteleIds", S.clienteleIds(playerId, state), 0);
    assertLength(assert, "influenceIds", S.influenceIds(playerId, state), 0);
    const stockpileLen = [0, 1, 2, 3];
    assertSet(
      assert,
      "stockpileIds len",
      S.stockpileIds(playerId, state).length,
      stockpileLen
    );
    assertLength(assert, "vaultIds", S.vaultIds(playerId, state), 0);
    done();
  };

  PhaseRunner.execute(props, store, engine)
    .then(callback)
    .catch((error) => {
      assert.ok(false, error.message);
      done();
    });
});

const PhaseRunnerTest = {};
export default PhaseRunnerTest;
