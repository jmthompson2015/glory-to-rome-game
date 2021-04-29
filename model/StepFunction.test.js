import Step from "../artifact/Step.js";

import ActionCreator from "../state/ActionCreator.js";

import StepFunction from "./StepFunction.js";
import TestData from "./TestData.js";

QUnit.module("StepFunction");

QUnit.test("declare role", (assert) => {
  // Setup.
  const stepKey = Step.DECLARE_ROLE;
  const leaderId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(0));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(leaderId));
  store.dispatch(ActionCreator.setCurrentStep(stepKey));
  store.dispatch(ActionCreator.setLeader(leaderId));

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    const camp = store.getState().playerToCamp[leaderId] || [];
    assert.ok(camp);
    if (camp.length > 0) {
      assert.equal(camp.length, 1);
      assert.equal([1, 4].includes(R.head(camp)), true);
    }
    done();
  };

  StepFunction[stepKey](store).then(callback);
});

const StepFunctionTest = {};
export default StepFunctionTest;
