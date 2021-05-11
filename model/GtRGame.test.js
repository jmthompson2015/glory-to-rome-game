import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

import GtRGame from "./GtRGame.js";
import TestData from "./TestData.js";

QUnit.module("GtRGame");

QUnit.test("execute()", (assert) => {
  // Setup.
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setVerbose(true));
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(1));

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    const state = store.getState();
    assert.equal(Selector.currentRound(state), 4);
    assert.equal(Selector.currentPhaseKey(state), undefined);
    assert.equal(Selector.currentPlayerId(state), undefined);
    assert.equal(Selector.currentStepKey(state), undefined);
    assert.equal(Selector.currentStepKey(state), undefined);
    const winner = Selector.winner(state);
    assert.ok(winner, `winner = ${JSON.stringify(winner)}`);
    done();
  };

  GtRGame.execute(store)
    .then(callback)
    .catch((error) => {
      assert.ok(false, error.message);
      done();
    });
});

const GtRGameTest = {};
export default GtRGameTest;
