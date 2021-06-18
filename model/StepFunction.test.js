import Role from "../artifact/Role.js";
import Phase from "../artifact/Phase.js";

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

import StepFunction from "./StepFunction.js";
import TestData from "./TestData.js";

QUnit.module("StepFunction");

const isInRange = (low, value, high) => low <= value && value <= high;

QUnit.test("cleanup() 1", (assert) => {
  // Setup.
  const leaderId = 1;
  const store = TestData.createStore();
  // store.dispatch(ActionCreator.setVerbose(true));
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(leaderId));
  store.dispatch(ActionCreator.setCurrentPhase(Phase.CLEANUP));
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
    assert.equal(camp1.length, 0);
    const camp3 = Selector.campIds(3, store.getState());
    assert.ok(camp3);
    assert.equal(camp3.length, 1);
    assert.equal(R.head(camp3), 12);
    const camp4 = Selector.campIds(4, store.getState());
    assert.ok(camp4);
    assert.equal(camp4.length, 1);
    assert.equal(R.head(camp4), 17);
    const cardPool = Selector.cardPool(store.getState());
    assert.ok(cardPool);
    assert.equal(cardPool.length, 6);
    assert.equal(cardPool.join(", "), "27, 28, 29, 30, 31, 2");
    done();
  };

  StepFunction.cleanup(store).then(callback);
});

QUnit.test("cleanup() 1 Jack", (assert) => {
  // Setup.
  const leaderId = 1;
  const store = TestData.createStore();
  // store.dispatch(ActionCreator.setVerbose(true));
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(leaderId));
  store.dispatch(ActionCreator.setCurrentPhase(Phase.CLEANUP));
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
    assert.equal(camp3.length, 1);
    assert.equal(R.head(camp3), 12);
    const camp4 = Selector.campIds(4, store.getState());
    assert.ok(camp4);
    assert.equal(camp4.length, 1);
    assert.equal(R.head(camp4), 17);
    const jackDeck = Selector.jackDeck(store.getState());
    assert.ok(jackDeck);
    assert.equal(jackDeck.length, 6);
    assert.equal(jackDeck.join(", "), "147, 148, 149, 150, 151, 146");
    done();
  };

  StepFunction.cleanup(store).then(callback);
});

QUnit.test("cleanup() 3", (assert) => {
  // Setup.
  const leaderId = 3;
  const store = TestData.createStore();
  // store.dispatch(ActionCreator.setVerbose(true));
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(leaderId));
  store.dispatch(ActionCreator.setCurrentPhase(Phase.CLEANUP));
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
    assert.equal(camp1.length, 1);
    assert.equal(R.head(camp1), 2);
    const camp3 = Selector.campIds(3, store.getState());
    assert.ok(camp3);
    assert.equal(camp3.length, 0);
    const camp4 = Selector.campIds(4, store.getState());
    assert.ok(camp4);
    assert.equal(camp4.length, 1);
    assert.equal(R.head(camp4), 17);
    const cardPool = Selector.cardPool(store.getState());
    assert.ok(cardPool);
    assert.equal(cardPool.length, 6);
    assert.equal(cardPool.join(", "), "27, 28, 29, 30, 31, 12");
    done();
  };

  StepFunction.cleanup(store).then(callback);
});

QUnit.test("declareRole() 1", (assert) => {
  // Setup.
  const leaderId = 1;
  const store = TestData.createStore();
  // store.dispatch(ActionCreator.setVerbose(true));
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(leaderId));
  store.dispatch(ActionCreator.setCurrentPhase(Phase.DECLARE_ROLE));

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    const camp = store.getState().playerToCamp[leaderId] || [];
    assert.ok(camp, `camp = ${JSON.stringify(camp)}`);
    if (camp.length > 0) {
      assert.equal(camp.length, 1, `camp.length = ${camp.length}`);
      assert.equal([2, 3, 4, 5, 6].includes(R.head(camp)), true);
    }
    done();
  };

  StepFunction.declareRole(store).then(callback);
});

QUnit.test("performRole() Laborer", (assert) => {
  // Setup.
  const leaderId = 1;
  const store = TestData.createStore();
  // store.dispatch(ActionCreator.setVerbose(true));
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(leaderId));
  store.dispatch(ActionCreator.setCurrentPhase(Phase.PERFORM_ROLE));
  store.dispatch(ActionCreator.setLeadRole(Role.LABORER));
  // TestData.printOrderCards(store);
  // TestData.printHands(store);
  // TestData.printCardPool(store);
  store.dispatch(ActionCreator.addToPlayerArray("playerToHand", 1, 67));
  store.dispatch(ActionCreator.transferHandToCamp(1, 67));
  store.dispatch(ActionCreator.transferHandToCamp(4, 16));
  store.dispatch(ActionCreator.transferHandToCamp(5, 21));
  assert.equal(
    store.getState().cardPool.length,
    5,
    `cardPool.length = ${store.getState().cardPool.length}`
  );

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    const { cardPool, playerToStockpile } = store.getState();
    assert.ok(cardPool, `cardPool = ${JSON.stringify(cardPool)}`);
    assert.equal(cardPool.length, 4, `cardPool.length = ${cardPool.length}`);

    const stockpile1 = playerToStockpile[1] || [];
    assert.ok(stockpile1, `stockpile1 = ${JSON.stringify(stockpile1)}`);
    assert.equal(
      stockpile1.length,
      1,
      `stockpile1.length = ${stockpile1.length}`
    );
    assert.equal(isInRange(26, R.head(stockpile1), 31), true);

    const stockpile4 = playerToStockpile[4] || [];
    assert.ok(stockpile4, `stockpile4 = ${JSON.stringify(stockpile4)}`);
    assert.equal(
      stockpile4.length,
      0,
      `stockpile4.length = ${stockpile4.length}`
    );
    // assert.equal(isInRange(26, R.head(stockpile4), 31), true);

    const stockpile5 = playerToStockpile[5] || [];
    assert.ok(stockpile5, `stockpile5 = ${JSON.stringify(stockpile5)}`);
    assert.equal(
      stockpile5.length,
      0,
      `stockpile5.length = ${stockpile5.length}`
    );
    // assert.equal(isInRange(26, R.head(stockpile5), 31), true);
    done();
  };

  StepFunction.performRole(store).then(callback);
});

QUnit.test("perform role Merchant", (assert) => {
  // Setup.
  const leaderId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(leaderId));
  store.dispatch(ActionCreator.setCurrentPhase(Phase.PERFORM_ROLE));
  store.dispatch(ActionCreator.setLeadRole(Role.MERCHANT));
  // TestData.printOrderCards(store);
  // TestData.printHands(store);
  // TestData.printCardPool(store);
  store.dispatch(ActionCreator.transferOrderToHand(3, 31));
  store.dispatch(ActionCreator.transferHandToCamp(3, 31));
  store.dispatch(ActionCreator.transferPoolToStockpile(3, 27));

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    const { playerToStockpile, playerToVault } = store.getState();
    const stockpile3 = playerToStockpile[3] || [];
    assert.ok(stockpile3, `stockpile3 = ${JSON.stringify(stockpile3)}`);
    assert.equal(
      stockpile3.length,
      1,
      `stockpile3.length = ${stockpile3.length}`
    );
    const vault3 = playerToVault[3] || [];
    assert.ok(vault3, `vault3 = ${JSON.stringify(vault3)}`);
    assert.equal(vault3.length, 0, `vault3.length = ${vault3.length}`);
    // assert.equal(vault3, 27);
    done();
  };

  StepFunction.performRole(store).then(callback);
});

QUnit.test("perform role Patron", (assert) => {
  // Setup.
  const leaderId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(leaderId));
  store.dispatch(ActionCreator.setCurrentPhase(Phase.PERFORM_ROLE));
  store.dispatch(ActionCreator.setLeadRole(Role.PATRON));
  // TestData.printOrderCards(store);
  // TestData.printHands(store);
  // TestData.printCardPool(store);
  store.dispatch(ActionCreator.transferHandToCamp(5, 22));

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    const { cardPool } = store.getState();
    assert.ok(cardPool, `cardPool = ${JSON.stringify(cardPool)}`);
    assert.equal(cardPool.length, 5, `cardPool.length = ${cardPool.length}`);

    const clientele5 = store.getState().playerToClientele[5] || [];
    assert.ok(clientele5, `clientele5 = ${JSON.stringify(clientele5)}`);
    assert.equal(
      clientele5.length,
      0,
      `clientele5.length = ${clientele5.length}`
    );
    done();
  };

  StepFunction.performRole(store).then(callback);
});

const StepFunctionTest = {};
export default StepFunctionTest;
