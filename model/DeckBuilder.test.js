import Version from "../artifact/Version.js";

import ActionCreator from "../state/ActionCreator.js";
import Reducer from "../state/Reducer.js";

import DeckBuilder from "./DeckBuilder.js";

QUnit.module("DeckBuilder");

QUnit.test("buildJackDeck()", (assert) => {
  // Setup.
  const store = Redux.createStore(Reducer.root);

  // Run.
  const result = DeckBuilder.buildJackDeck(store);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 6);
  const cardFirst = R.head(result);
  assert.ok(cardFirst);
  assert.equal(cardFirst, 1);
  const cardLast = R.last(result);
  assert.ok(cardLast);
  assert.equal(cardLast, 6);
});

QUnit.test("buildOrderDeck() Imperium", (assert) => {
  // Setup.
  const store = Redux.createStore(Reducer.root);
  store.dispatch(ActionCreator.setVersion(Version.IMPERIUM));

  // Run.
  const result = DeckBuilder.buildOrderDeck(store);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 144);
  const cardFirst = R.head(result);
  assert.ok(cardFirst);
  assert.equal(cardFirst, 1);
  const cardLast = R.last(result);
  assert.ok(cardLast);
  assert.equal(cardLast, 144);
});

QUnit.test("buildOrderDeck() Republic", (assert) => {
  // Setup.
  const store = Redux.createStore(Reducer.root);

  // Run.
  const result = DeckBuilder.buildOrderDeck(store);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 144);
  const cardFirst = R.head(result);
  assert.ok(cardFirst);
  assert.equal(cardFirst, 1);
  const cardLast = R.last(result);
  assert.ok(cardLast);
  assert.equal(cardLast, 144);
});

QUnit.test("buildOutOfTownSiteDeck() 5", (assert) => {
  // Setup.
  const store = Redux.createStore(Reducer.root);
  const playerCount = 5;

  // Run.
  const result = DeckBuilder.buildOutOfTownSiteDeck(store, playerCount);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 36 - 6 * playerCount);
  const cardFirst = R.head(result);
  assert.ok(cardFirst);
  assert.equal(cardFirst, 1);
  const cardLast = R.last(result);
  assert.ok(cardLast);
  assert.equal(cardLast, 6);
});

QUnit.test("buildSiteDeck() 5", (assert) => {
  // Setup.
  const store = Redux.createStore(Reducer.root);
  const playerCount = 5;

  // Run.
  const result = DeckBuilder.buildSiteDeck(store, playerCount);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 6 * playerCount);
  const cardFirst = R.head(result);
  assert.ok(cardFirst);
  assert.equal(cardFirst, 1);
  const cardLast = R.last(result);
  assert.ok(cardLast);
  assert.equal(cardLast, 30);
});

const DeckBuilderTest = {};
export default DeckBuilderTest;
