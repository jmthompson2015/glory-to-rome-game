import ActionCreator from "../state/ActionCreator.js";

import GtRGame from "./GtRGame.js";
import TestData from "./TestData.js";

QUnit.module("GtRGame");

QUnit.test("execute()", (assert) => {
  // Setup.
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setVerbose(true));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setLeader(1));

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
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
