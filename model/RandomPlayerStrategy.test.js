import RandomPlayerStrategy from "./RandomPlayerStrategy.js";
import TestData from "./TestData.js";

QUnit.module("RandomPlayerStrategy");

QUnit.test("chooseLaborerOption()", (assert) => {
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

  RandomPlayerStrategy.chooseLaborerOption(options, store, delay).then(
    callback
  );
});

QUnit.test("chooseMerchantOption()", (assert) => {
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

  RandomPlayerStrategy.chooseMerchantOption(options, store, delay).then(
    callback
  );
});

QUnit.test("choosePatronOption()", (assert) => {
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

  RandomPlayerStrategy.choosePatronOption(options, store, delay).then(callback);
});

QUnit.test("chooseRoleOption()", (assert) => {
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

  RandomPlayerStrategy.chooseRoleOption(options, store, delay).then(callback);
});

const RandomPlayerStrategyTest = {};
export default RandomPlayerStrategyTest;
