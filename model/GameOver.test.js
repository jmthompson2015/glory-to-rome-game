import ActionCreator from "../state/ActionCreator.js";

import GameOver from "./GameOver.js";
import TestData from "./TestData.js";

QUnit.module("GameOver");

QUnit.test("getWinner() undefined", (assert) => {
  // Setup.
  const store = TestData.createStore();

  // Run.
  const result = GameOver.getWinner(store.getState());

  // Verify.
  assert.equal(result, undefined);
});

QUnit.test("isGameOver() false", (assert) => {
  // Setup.
  const store = TestData.createStore();

  // Run.
  const result = GameOver.isGameOver(store);

  // Verify.
  assert.equal(result, false);
});

QUnit.test("isGameOver() empty draw deck", (assert) => {
  // Setup.
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setOrderDeck([]));

  // Run.
  const result = GameOver.isGameOver(store);

  // Verify.
  assert.equal(result, true);
});

QUnit.test("isGameOver() empty site cards", (assert) => {
  // Setup.
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setSiteDeck([]));

  // Run.
  const result = GameOver.isGameOver(store);

  // Verify.
  assert.equal(result, true);
});

const GameOverTest = {};
export default GameOverTest;
