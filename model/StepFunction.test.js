import Role from "../artifact/Role.js";
import Step from "../artifact/Step.js";

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

import StepFunction from "./StepFunction.js";
import TestData from "./TestData.js";

QUnit.module("StepFunction");

const isInRange = (low, value, high) => low <= value && value <= high;

QUnit.test("cleanup", (assert) => {
  // Setup.
  const stepKey = Step.CLEANUP;
  const leaderId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setVerbose(true));
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(leaderId));
  store.dispatch(ActionCreator.setCurrentStep(stepKey));
  store.dispatch(ActionCreator.transferHandToCamp(1, 2));
  store.dispatch(ActionCreator.transferHandToCamp(3, 12));
  store.dispatch(ActionCreator.transferHandToCamp(4, 17));

  // Run.
  const done = assert.async();
  const callback = () => {
    assert.ok(true, "test resumed from async operation");
    // Verify.
    const camp1 = Selector.camp(1, store.getState());
    assert.ok(camp1);
    assert.equal(camp1.length, 0);
    const camp3 = Selector.camp(3, store.getState());
    assert.ok(camp3);
    assert.equal(camp3.length, 0);
    const camp4 = Selector.camp(4, store.getState());
    assert.ok(camp4);
    assert.equal(camp4.length, 0);
    const cardPool = Selector.cardPool(store.getState());
    assert.ok(cardPool);
    assert.equal(cardPool.length, 8);
    assert.equal(cardPool.join(", "), "27, 28, 29, 30, 31, 2, 12, 17");
    done();
  };

  StepFunction[stepKey](store).then(callback);
});

QUnit.test("declare role", (assert) => {
  // Setup.
  const stepKey = Step.DECLARE_ROLE;
  const leaderId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setVerbose(true));
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(leaderId));
  store.dispatch(ActionCreator.setCurrentStep(stepKey));

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

QUnit.test("perform role Laborer", (assert) => {
  // Setup.
  const stepKey = Step.PERFORM_ROLE;
  const leaderId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setVerbose(true));
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(leaderId));
  store.dispatch(ActionCreator.setCurrentStep(stepKey));
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
    assert.equal(cardPool.length, 2, `cardPool.length = ${cardPool.length}`);

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
      1,
      `stockpile4.length = ${stockpile4.length}`
    );
    assert.equal(isInRange(26, R.head(stockpile4), 31), true);

    const stockpile5 = playerToStockpile[5] || [];
    assert.ok(stockpile5, `stockpile5 = ${JSON.stringify(stockpile5)}`);
    assert.equal(
      stockpile5.length,
      1,
      `stockpile5.length = ${stockpile5.length}`
    );
    assert.equal(isInRange(26, R.head(stockpile5), 31), true);
    done();
  };

  const stepFunction = StepFunction[stepKey];
  stepFunction(store).then(callback);
});

QUnit.test("perform role Merchant", (assert) => {
  // Setup.
  const stepKey = Step.PERFORM_ROLE;
  const leaderId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(leaderId));
  store.dispatch(ActionCreator.setCurrentStep(stepKey));
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
      0,
      `stockpile3.length = ${stockpile3.length}`
    );
    const vault3 = playerToVault[3] || [];
    assert.ok(vault3, `vault3 = ${JSON.stringify(vault3)}`);
    assert.equal(vault3.length, 1, `vault3.length = ${vault3.length}`);
    assert.equal(vault3, 27);
    done();
  };

  StepFunction[stepKey](store).then(callback);
});

QUnit.test("perform role Patron", (assert) => {
  // Setup.
  const stepKey = Step.PERFORM_ROLE;
  const leaderId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(leaderId));
  store.dispatch(ActionCreator.setCurrentStep(stepKey));
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
    assert.equal(cardPool.length, 4, `cardPool.length = ${cardPool.length}`);

    const clientele5 = store.getState().playerToClientele[5] || [];
    assert.ok(clientele5, `clientele5 = ${JSON.stringify(clientele5)}`);
    assert.equal(
      clientele5.length,
      1,
      `clientele5.length = ${clientele5.length}`
    );
    assert.equal(isInRange(26, R.head(clientele5), 31), true);
    done();
  };

  StepFunction[stepKey](store).then(callback);
});

const StepFunctionTest = {};
export default StepFunctionTest;
