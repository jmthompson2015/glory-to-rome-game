import RandomPlayerStrategy from "./RandomPlayerStrategy.js";
import TestData from "./TestData.js";

QUnit.module("RandomPlayerStrategy");

QUnit.test("chooseMove()", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const delay = 0;
  const options = [1, 2, 3, 4];

  // Run.
  const done = assert.async();
  const callback = (result) => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    assert.ok(result);
    assert.equal(options.includes(result), true);
    done();
  };

  RandomPlayerStrategy.chooseMove(options, store, delay).then(callback);
});

QUnit.test("chooseRole()", (assert) => {
  // Setup.
  const store = TestData.createStore();
  const delay = 0;
  const options = [1, 2, 3, 4];

  // Run.
  const done = assert.async();
  const callback = (result) => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    assert.ok(result);
    assert.equal(options.includes(result), true);
    done();
  };

  RandomPlayerStrategy.chooseRole(options, store, delay).then(callback);
});

const RandomPlayerStrategyTest = {};
export default RandomPlayerStrategyTest;
