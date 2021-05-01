import GameFunction from "./GameFunction.js";
import TestData from "./TestData.js";

QUnit.module("GameFunction");

QUnit.test("isGameOver() false", (assert) => {
  // Setup.
  const store = TestData.createStore();

  // Run.
  const result = GameFunction.isGameOver(store);

  // Verify.
  assert.equal(result, false);
});

QUnit.test("stepKeys()", (assert) => {
  // Setup.

  // Run.
  const result = GameFunction.stepKeys();

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 3);
});

const GameFunctionTest = {};
export default GameFunctionTest;
