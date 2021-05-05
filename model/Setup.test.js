import Version from "../artifact/Version.js";

import ActionCreator from "../state/ActionCreator.js";
import PlayerState from "../state/PlayerState.js";
import Reducer from "../state/Reducer.js";

import DeckBuilder from "./DeckBuilder.js";
import Setup from "./Setup.js";

QUnit.module("Setup");

const createPlayers = () => {
  const player1 = PlayerState.create({ id: 1, name: "Alfred" });
  const player2 = PlayerState.create({ id: 2, name: "Bruce" });

  return [player1, player2];
};

QUnit.test("createSiteDecks()", (assert) => {
  // Setup.
  const store = Redux.createStore(Reducer.root);
  const players = createPlayers();
  const orderDeck0 = DeckBuilder.buildOrderDeck(store);
  store.dispatch(ActionCreator.setOrderDeck(orderDeck0));

  // Run.
  Setup.createSiteDecks(store, players.length);

  // Verify.
  const state = store.getState();
  const { outOfTownSiteDeck, siteCardInstances, siteDeck } = state;
  assert.ok(siteCardInstances);
  assert.equal(
    Object.keys(siteCardInstances).length,
    36,
    `siteCardInstances length = ${siteCardInstances.length}`
  );
  assert.ok(siteDeck);
  assert.equal(siteDeck.length, 12, `siteDeck.length = ${siteDeck.length}`);
  assert.ok(outOfTownSiteDeck);
  assert.equal(
    outOfTownSiteDeck.length,
    24,
    `outOfTownSiteDeck.length = ${outOfTownSiteDeck.length}`
  );
});

QUnit.test("dealOrderCards()", (assert) => {
  // Setup.
  const store = Redux.createStore(Reducer.root);
  const players = createPlayers();
  const orderDeck0 = DeckBuilder.buildOrderDeck(store);
  store.dispatch(ActionCreator.setOrderDeck(orderDeck0));
  const jackDeck0 = DeckBuilder.buildJackDeck(store);
  store.dispatch(ActionCreator.setJackDeck(jackDeck0));

  // Run.
  Setup.dealOrderCards(store, players);

  // Verify.
  const state = store.getState();
  const { orderCardInstances, jackDeck, orderDeck, playerToHand } = state;
  assert.ok(orderCardInstances);
  assert.equal(
    Object.keys(orderCardInstances).length,
    150,
    `orderCardInstances length = ${Object.keys(orderCardInstances).length}`
  );
  assert.ok(orderDeck);
  assert.equal(orderDeck.length, 134, `orderDeck.length = ${orderDeck.length}`);
  assert.ok(jackDeck);
  assert.equal(jackDeck.length, 6, `jackDeck.length = ${jackDeck.length}`);
  const hand1 = playerToHand[1];
  assert.ok(hand1, `hand1 = ${hand1}`);
  assert.equal(hand1.length, 5);
  const hand2 = playerToHand[2];
  assert.ok(hand2, `hand2 = ${hand2}`);
  assert.equal(hand2.length, 5);
});

QUnit.test("dealPoolCards()", (assert) => {
  // Setup.
  const store = Redux.createStore(Reducer.root);
  const players = createPlayers();
  const orderDeck0 = DeckBuilder.buildOrderDeck(store);
  store.dispatch(ActionCreator.setOrderDeck(orderDeck0));

  // Run.
  Setup.dealPoolCards(store, players);

  // Verify.
  const state = store.getState();
  const { cardPool, currentPlayerId, orderCardInstances, orderDeck } = state;
  assert.ok(orderCardInstances);
  assert.equal(
    Object.keys(orderCardInstances).length,
    144,
    `orderCardInstances length = ${Object.keys(orderCardInstances).length}`
  );
  assert.ok(orderDeck);
  assert.equal(orderDeck.length, 142, `orderDeck.length = ${orderDeck.length}`);
  assert.ok(cardPool);
  assert.equal(cardPool.length, 2, `cardPool.length = ${cardPool.length}`);

  assert.equal(currentPlayerId, 1, `currentPlayerId = ${currentPlayerId}`);
});

QUnit.test("execute() Imperium", (assert) => {
  // Setup.
  const store = Redux.createStore(Reducer.root);
  const players = createPlayers();
  const versionKey = Version.IMPERIUM;

  // Run.
  Setup.execute(store, players, versionKey);

  // Verify.
  const state = store.getState();
  const {
    currentPlayerId,
    jackDeck,
    bonusCardInstances: bonusCards,
    orderCardInstances: orderCards,
    orderDeck,
    outOfTownSiteDeck,
    playerInstances,
    playerToHand,
    siteCardInstances: siteCards,
    siteDeck,
  } = state;
  assert.ok(bonusCards);
  assert.equal(
    Object.keys(bonusCards).length,
    6,
    `bonusCards length = ${Object.keys(bonusCards).length}`
  );
  assert.ok(orderCards);
  assert.equal(
    Object.keys(orderCards).length,
    151,
    `orderCards length = ${Object.keys(orderCards).length}`
  );
  assert.ok(siteCards);
  assert.equal(
    Object.keys(siteCards).length,
    36,
    `siteCards length = ${Object.keys(siteCards).length}`
  );
  assert.ok(playerInstances);
  assert.equal(
    Object.keys(playerInstances).length,
    2,
    `playerInstances length = ${Object.keys(playerInstances).length}`
  );

  assert.ok(orderDeck);
  assert.equal(orderDeck.length, 134, `orderDeck.length = ${orderDeck.length}`);

  assert.ok(jackDeck);
  assert.equal(jackDeck.length, 4, `jackDeck.length = ${jackDeck.length}`);

  assert.ok(siteDeck);
  assert.equal(Object.keys(siteDeck).length, 12);
  assert.ok(outOfTownSiteDeck);
  assert.equal(Object.keys(outOfTownSiteDeck).length, 24);

  const hand1 = playerToHand[1];
  assert.ok(hand1, `hand1 = ${hand1}`);
  assert.equal(
    [5, 6].includes(hand1.length),
    true,
    `hand1.length = ${hand1.length}`
  );
  const hand2 = playerToHand[2];
  assert.ok(hand2, `hand2 = ${hand2}`);
  assert.equal(
    [5, 6].includes(hand2.length),
    true,
    `hand2.length = ${hand2.length}`
  );

  assert.equal(
    [1, 2].includes(currentPlayerId),
    true,
    `currentPlayerId = ${currentPlayerId}`
  );
});

QUnit.test("execute() Republic", (assert) => {
  // Setup.
  const store = Redux.createStore(Reducer.root);
  const players = createPlayers();

  // Run.
  Setup.execute(store, players);

  // Verify.
  const state = store.getState();
  const {
    currentPlayerId,
    jackDeck,
    bonusCardInstances: bonusCards,
    orderCardInstances: orderCards,
    orderDeck,
    outOfTownSiteDeck,
    playerInstances,
    playerToHand,
    siteCardInstances: siteCards,
    siteDeck,
  } = state;
  assert.ok(bonusCards);
  assert.equal(
    Object.keys(bonusCards).length,
    6,
    `bonusCards length = ${Object.keys(bonusCards).length}`
  );
  assert.ok(orderCards);
  assert.equal(
    Object.keys(orderCards).length,
    151,
    `orderCards length = ${Object.keys(orderCards).length}`
  );
  assert.ok(siteCards);
  assert.equal(
    Object.keys(siteCards).length,
    36,
    `siteCards length = ${Object.keys(siteCards).length}`
  );
  assert.ok(playerInstances);
  assert.equal(
    Object.keys(playerInstances).length,
    2,
    `playerInstances length = ${Object.keys(playerInstances).length}`
  );

  assert.ok(orderDeck);
  assert.equal(orderDeck.length, 132, `orderDeck.length = ${orderDeck.length}`);

  assert.ok(jackDeck);
  assert.equal(jackDeck.length, 6, `jackDeck.length = ${jackDeck.length}`);

  assert.ok(siteDeck);
  assert.equal(Object.keys(siteDeck).length, 12);
  assert.ok(outOfTownSiteDeck);
  assert.equal(Object.keys(outOfTownSiteDeck).length, 24);

  const hand1 = playerToHand[1];
  assert.ok(hand1, `hand1 = ${hand1}`);
  assert.equal(
    [5, 6].includes(hand1.length),
    true,
    `hand1.length = ${hand1.length}`
  );
  const hand2 = playerToHand[2];
  assert.ok(hand2, `hand2 = ${hand2}`);
  assert.equal(
    [5, 6].includes(hand2.length),
    true,
    `hand2.length = ${hand2.length}`
  );

  assert.equal(
    [1, 2].includes(currentPlayerId),
    true,
    `currentPlayerId = ${currentPlayerId}`
  );
});

const SetupTest = {};
export default SetupTest;
