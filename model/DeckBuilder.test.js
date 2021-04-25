import SiteCard from "../artifact/SiteCard.js";

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

QUnit.test("buildOrderDeck()", (assert) => {
  // Setup.
  const store = Redux.createStore(Reducer.root);

  // Run.
  const result = DeckBuilder.buildOrderDeck(store);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 159);
  const cardFirst = R.head(result);
  assert.ok(cardFirst);
  assert.equal(cardFirst, 1);
  const cardLast = R.last(result);
  assert.ok(cardLast);
  assert.equal(cardLast, 159);
});

QUnit.test("buildSiteDecks() Brick", (assert) => {
  // Setup.
  const siteKey = SiteCard.BRICK;
  const playerCount = 4;
  const store = Redux.createStore(Reducer.root);

  // Run.
  const result = DeckBuilder.buildSiteDecks(siteKey, playerCount, store);

  // Verify.
  assert.ok(result);
  const { siteDeck, outOfTownDeck } = result;
  assert.ok(siteDeck);
  assert.equal(siteDeck.length, 4);
  const cardFirst1 = R.head(siteDeck);
  assert.equal(cardFirst1, 1);
  const cardLast1 = R.last(siteDeck);
  assert.equal(cardLast1, 4);

  assert.ok(outOfTownDeck);
  assert.equal(outOfTownDeck.length, 2);
  const cardFirst2 = R.head(outOfTownDeck);
  assert.equal(cardFirst2, 5);
  const cardLast2 = R.last(outOfTownDeck);
  assert.equal(cardLast2, 6);
});

const DeckBuilderTest = {};
export default DeckBuilderTest;
