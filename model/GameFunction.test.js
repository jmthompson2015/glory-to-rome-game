import Phase from "../artifact/Phase.js";

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

import GameFunction from "./GameFunction.js";
import TestData from "./TestData.js";

QUnit.module("GameFunction");

QUnit.test("phaseEnd() Declare Role", (assert) => {
  // Setup.
  const leaderId = 1;
  const store = TestData.createStore();
  // store.dispatch(ActionCreator.setVerbose(true));
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(leaderId));
  store.dispatch(ActionCreator.setCurrentPhase(Phase.DECLARE_ROLE));
  store.dispatch(ActionCreator.transferHandToCamp(1, 2));
  store.dispatch(ActionCreator.transferHandToCamp(3, 12));
  store.dispatch(ActionCreator.transferHandToCamp(4, 17));

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    const camp1 = Selector.campIds(1, store.getState());
    assert.ok(camp1);
    assert.equal(camp1.length, 1, `camp1.length = ${camp1.length}`);
    assert.equal(R.head(camp1), 2, `camp1 = ${camp1}`);
    const camp3 = Selector.campIds(3, store.getState());
    assert.ok(camp3);
    assert.equal(camp3.length, 1, `camp3.length = ${camp3.length}`);
    assert.equal(R.head(camp3), 12, `camp3 = ${camp3}`);
    const camp4 = Selector.campIds(4, store.getState());
    assert.ok(camp4);
    assert.equal(camp4.length, 1, `camp4.length = ${camp4.length}`);
    assert.equal(R.head(camp4), 17, `camp4 = ${camp4}`);
    const cardPool = Selector.cardPool(store.getState());
    assert.ok(cardPool);
    assert.equal(cardPool.length, 5, `cardPool.length = ${cardPool.length}`);
    assert.equal(cardPool.join(", "), "27, 28, 29, 30, 31");
    done();
  };

  GameFunction.phaseEnd(store).then(callback);
});

QUnit.test("phaseEnd() Perform Role", (assert) => {
  // Setup.
  const leaderId = 1;
  const store = TestData.createStore();
  // store.dispatch(ActionCreator.setVerbose(true));
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(leaderId));
  store.dispatch(ActionCreator.setCurrentPhase(Phase.PERFORM_ROLE));
  store.dispatch(ActionCreator.transferHandToCamp(1, 2));
  store.dispatch(ActionCreator.transferHandToCamp(3, 12));
  store.dispatch(ActionCreator.transferHandToCamp(4, 17));

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    const camp1 = Selector.campIds(1, store.getState());
    assert.ok(camp1);
    assert.equal(camp1.length, 0, `camp1.length = ${camp1.length}`);
    const camp3 = Selector.campIds(3, store.getState());
    assert.ok(camp3);
    assert.equal(camp3.length, 0, `camp3.length = ${camp3.length}`);
    const camp4 = Selector.campIds(4, store.getState());
    assert.ok(camp4);
    assert.equal(camp4.length, 0, `camp4.length = ${camp4.length}`);
    const cardPool = Selector.cardPool(store.getState());
    assert.ok(cardPool);
    assert.equal(cardPool.length, 8, `cardPool.length = ${cardPool.length}`);
    assert.equal(cardPool.join(", "), "27, 28, 29, 30, 31, 2, 12, 17");
    done();
  };

  GameFunction.phaseEnd(store).then(callback);
});

QUnit.test("phaseEnd() Perform Role Jack", (assert) => {
  // Setup.
  const leaderId = 1;
  const store = TestData.createStore();
  // store.dispatch(ActionCreator.setVerbose(true));
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(leaderId));
  store.dispatch(ActionCreator.setCurrentPhase(Phase.PERFORM_ROLE));
  store.dispatch(ActionCreator.transferJackToHand(1, 146));
  store.dispatch(ActionCreator.transferHandToCamp(1, 146));
  store.dispatch(ActionCreator.transferHandToCamp(3, 12));
  store.dispatch(ActionCreator.transferHandToCamp(4, 17));

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    const camp1 = Selector.campIds(1, store.getState());
    assert.ok(camp1);
    assert.equal(camp1.length, 0);
    const camp3 = Selector.campIds(3, store.getState());
    assert.ok(camp3);
    assert.equal(camp3.length, 0, `camp3.length = ${camp3.length}`);
    const camp4 = Selector.campIds(4, store.getState());
    assert.ok(camp4);
    assert.equal(camp4.length, 0, `camp4.length = ${camp4.length}`);
    const jackDeck = Selector.jackDeck(store.getState());
    assert.ok(jackDeck);
    assert.equal(jackDeck.length, 6, `jackDeck.length = ${jackDeck.length}`);
    assert.equal(jackDeck.join(", "), "147, 148, 149, 150, 151, 146");
    done();
  };

  GameFunction.phaseEnd(store).then(callback);
});

QUnit.test("isGameOver() false", (assert) => {
  // Setup.
  const store = TestData.createStore();

  // Run.
  const result = GameFunction.isGameOver(store);

  // Verify.
  assert.equal(result, false);
});

QUnit.test("phaseKeys()", (assert) => {
  // Setup.

  // Run.
  const result = GameFunction.phaseKeys();

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 2);
});

const GameFunctionTest = {};
export default GameFunctionTest;
