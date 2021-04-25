import MiscCard from "../artifact/MiscCard.js";
import OrderCard from "../artifact/OrderCard.js";
import Version from "../artifact/Version.js";

import AppState from "./AppState.js";
import ActionCreator from "./ActionCreator.js";
import CardState from "./CardState.js";
import PlayerState from "./PlayerState.js";
import Reducer from "./Reducer.js";
import Selector from "./Selector.js";
import StructureState from "./StructureState.js";

QUnit.module("Reducer");

QUnit.test("addCard()", (assert) => {
  // Setup.
  const state = AppState.create();
  const cardKey = "knight";
  const cardState = CardState.create({
    id: Selector.nextCardId(state),
    cardKey,
  });
  const action = ActionCreator.addCard(cardState);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  const cards = result.cardInstances;
  assert.ok(cards);
  assert.equal(Object.keys(cards).length, 1);
  const card = cards[1];
  assert.ok(card);
  assert.equal(card.id, 1);
  assert.equal(card.cardKey, cardKey);
});

QUnit.test("addGameRecord()", (assert) => {
  // Setup.
  const state01 = AppState.create();
  const action01 = ActionCreator.setCurrentRound(1);
  const state0 = Reducer.root(state01, action01);
  const action0 = ActionCreator.addGameRecord("first game record");

  // Run.
  const result0 = Reducer.root(state0, action0);

  // Verify.
  assert.ok(result0);
  const { gameRecords: gameRecords0 } = result0;
  assert.ok(gameRecords0);
  assert.equal(gameRecords0.length, 1);
  assert.equal(gameRecords0[0].round, 1);
  assert.equal(gameRecords0[0].message, "first game record");

  // Setup.
  const action02 = ActionCreator.setCurrentRound(2);
  const state02 = Reducer.root(result0, action02);
  const action1 = ActionCreator.addGameRecord("second game record");

  // Run.
  const result1 = Reducer.root(state02, action1);

  // Verify.
  assert.ok(result1);
  const { gameRecords: gameRecords1 } = result1;
  assert.ok(gameRecords1);
  assert.equal(gameRecords1.length, 2);
  assert.equal(gameRecords0[0].round, 1);
  assert.equal(gameRecords0[0].message, "first game record");
  assert.equal(gameRecords1[1].round, 2);
  assert.equal(gameRecords1[1].message, "second game record");
});

QUnit.test("addStructure()", (assert) => {
  // Setup.
  const state = AppState.create();
  const structureState = StructureState.create({
    id: Selector.nextStructureId(state),
    foundationId: 2,
    siteId: 3,
  });
  const action = ActionCreator.addStructure(structureState);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  const structures = result.structureInstances;
  assert.ok(structures);
  assert.equal(Object.keys(structures).length, 1);
  const structure = structures[1];
  assert.ok(structure);
  assert.equal(structure.id, 1, `structure.id = ${structure.id}`);
  assert.equal(
    structure.foundationId,
    2,
    `structure.foundationId = ${structure.foundationId}`
  );
  assert.equal(structure.siteId, 3, `structure.siteId = ${structure.siteId}`);
  assert.equal(
    structure.materialIds.length,
    0,
    `structure.materialIds = ${structure.materialIds}`
  );
});

QUnit.test("addToPlayerArray()", (assert) => {
  // Setup.
  const state = AppState.create();
  const playerId = 3;
  const cardId = 12;
  const action = ActionCreator.addToPlayerArray(
    "playerToHand",
    playerId,
    cardId
  );

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  const hand = result.playerToHand[playerId];
  assert.ok(hand);
  assert.ok(Array.isArray(hand));
  assert.equal(hand.length, 1);
  assert.equal(hand[0], cardId);
});

QUnit.test("setCurrentPhase()", (assert) => {
  // Setup.
  const state = AppState.create();
  const phaseKey = "bogus";
  const action = ActionCreator.setCurrentPhase(phaseKey);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.currentPhaseKey, phaseKey);
});

QUnit.test("setCurrentPlayer()", (assert) => {
  // Setup.
  const state = AppState.create();
  const playerId = 12;
  const action = ActionCreator.setCurrentPlayer(playerId);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.currentPlayerId, playerId);
});

QUnit.test("setCurrentPlayerOrder()", (assert) => {
  // Setup.
  const state = AppState.create();
  const playerIds = [4, 3, 2, 1];
  const action = ActionCreator.setCurrentPlayerOrder(playerIds);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.currentPlayerOrder.join(), playerIds.join());
});

QUnit.test("setCurrentRound()", (assert) => {
  // Setup.
  const state = AppState.create();
  const round = 12;
  const action = ActionCreator.setCurrentRound(round);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.round, round);
});

QUnit.test("setCurrentStep()", (assert) => {
  // Setup.
  const state = AppState.create();
  const stepKey = "bogus";
  const action = ActionCreator.setCurrentStep(stepKey);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.currentStepKey, stepKey);
});

QUnit.test("setDelay()", (assert) => {
  // Setup.
  const state = AppState.create();
  const delay = 12;
  const action = ActionCreator.setDelay(delay);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.delay, delay);
});

QUnit.test("setInitiativePlayer()", (assert) => {
  // Setup.
  const state = AppState.create();
  const playerId = 3;
  const action = ActionCreator.setInitiativePlayer(playerId);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.initiativePlayerId, playerId);
});

QUnit.test("setJackDeck()", (assert) => {
  // Setup.
  const state = AppState.create();
  const jackDeck = 3;
  const action = ActionCreator.setJackDeck(jackDeck);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.jackDeck, jackDeck);
});

QUnit.test("setMctsRoot()", (assert) => {
  // Setup.
  const state = AppState.create();
  const mctsRoot = 12;
  const action = ActionCreator.setMctsRoot(mctsRoot);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.mctsRoot, mctsRoot);
});

QUnit.test("setOrderDeck()", (assert) => {
  // Setup.
  const state = AppState.create();
  const orderDeck = 3;
  const action = ActionCreator.setOrderDeck(orderDeck);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.orderDeck, orderDeck);
});

QUnit.test("setPlayers()", (assert) => {
  // Setup.
  const state = AppState.create();
  const id1 = 1;
  const id2 = 2;
  const ravenPlayer = PlayerState.create({ id: id1, name: "Raven" });
  const wolfPlayer = PlayerState.create({ id: id2, name: "Wolf" });
  const players = [ravenPlayer, wolfPlayer];
  const action = ActionCreator.setPlayers(players);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  const { playerInstances } = result;
  assert.ok(playerInstances);
  assert.equal(Object.keys(playerInstances).length, 2);
  assert.equal(playerInstances[id1], ravenPlayer);
  assert.equal(playerInstances[id2], wolfPlayer);
});

QUnit.test("setPlayerStrategy()", (assert) => {
  // Setup.
  const state = AppState.create();
  const playerId = 3;
  const strategy = 12;
  const action = ActionCreator.setPlayerStrategy(playerId, strategy);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.playerToStrategy[playerId], strategy);
});

QUnit.test("setSiteToDeck()", (assert) => {
  // Setup.
  const state = AppState.create();
  const siteKey = 3;
  const siteDeck = 12;
  const action = ActionCreator.setSiteToDeck(siteKey, siteDeck);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.siteToDeck[siteKey], siteDeck);
});

QUnit.test("setSiteToOutOfTownDeck()", (assert) => {
  // Setup.
  const state = AppState.create();
  const siteKey = 3;
  const outOfTownDeck = 12;
  const action = ActionCreator.setSiteToOutOfTownDeck(siteKey, outOfTownDeck);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.siteToOutOfTownDeck[siteKey], outOfTownDeck);
});

QUnit.test("setUserMessage()", (assert) => {
  // Setup.
  const state = AppState.create();
  const userMessage = "bogus";
  const action = ActionCreator.setUserMessage(userMessage);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.userMessage, userMessage);
});

QUnit.test("setVerbose()", (assert) => {
  // Setup.
  const state = AppState.create();
  const isVerbose = false;
  const action = ActionCreator.setVerbose(isVerbose);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.isVerbose, isVerbose);
});

QUnit.test("setVersion()", (assert) => {
  // Setup.
  const state = AppState.create();
  const versionKey = Version.IMPERIUM;
  const action = ActionCreator.setVersion(versionKey);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.versionKey, versionKey);
});

QUnit.test("setWinner()", (assert) => {
  // Setup.
  const state = AppState.create();
  const winnerId = 3;
  const action = ActionCreator.setWinner(winnerId);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.winnerId, winnerId);
});

QUnit.test("transferCampToPool()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const playerId = 3;
  const cardId = 1;
  const cardKey = OrderCard.ACADEMY;
  const card = CardState.create({ id: cardId, cardKey });
  const action0 = ActionCreator.addCard(card);
  const state1 = Reducer.root(state0, action0);
  const action1 = ActionCreator.addToPlayerArray(
    "playerToHand",
    playerId,
    cardId
  );
  const state = Reducer.root(state1, action1);
  const action = ActionCreator.transferCampToPool(playerId, cardId);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  const camp = result.playerToCamp[playerId];
  assert.ok(camp);
  assert.equal(camp.length, 0);
  const pool = result.cardPool;
  assert.ok(pool);
  assert.equal(pool.length, 1);
  assert.equal(R.head(pool), cardId);
});

QUnit.test("transferHandToCamp()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const playerId = 3;
  const cardId = 1;
  const cardKey = OrderCard.ACADEMY;
  const card = CardState.create({ id: cardId, cardKey });
  const action0 = ActionCreator.addCard(card);
  const state1 = Reducer.root(state0, action0);
  const action1 = ActionCreator.addToPlayerArray(
    "playerToHand",
    playerId,
    cardId
  );
  const state = Reducer.root(state1, action1);
  const action = ActionCreator.transferHandToCamp(playerId, cardId);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  const hand = result.playerToHand[playerId];
  assert.ok(hand);
  assert.equal(hand.length, 0);
  const camp = result.playerToCamp[playerId];
  assert.ok(camp);
  assert.equal(camp.length, 1);
  assert.equal(R.head(camp), cardId);
});

QUnit.test("transferHandToClientele()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const playerId = 3;
  const cardId = 1;
  const cardKey = OrderCard.ACADEMY;
  const card = CardState.create({ id: cardId, cardKey });
  const action0 = ActionCreator.addCard(card);
  const state1 = Reducer.root(state0, action0);
  const action1 = ActionCreator.addToPlayerArray(
    "playerToHand",
    playerId,
    cardId
  );
  const state = Reducer.root(state1, action1);
  const action = ActionCreator.transferHandToClientele(playerId, cardId);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  const hand = result.playerToHand[playerId];
  assert.ok(hand);
  assert.equal(hand.length, 0);
  const clientele = result.playerToClientele[playerId];
  assert.ok(clientele);
  assert.equal(clientele.length, 1);
  assert.equal(R.head(clientele), cardId);
});

QUnit.test("transferHandToInfluence()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const playerId = 3;
  const cardId = 1;
  const cardKey = OrderCard.ACADEMY;
  const card = CardState.create({ id: cardId, cardKey });
  const action0 = ActionCreator.addCard(card);
  const state1 = Reducer.root(state0, action0);
  const action1 = ActionCreator.addToPlayerArray(
    "playerToHand",
    playerId,
    cardId
  );
  const state = Reducer.root(state1, action1);
  const action = ActionCreator.transferHandToInfluence(playerId, cardId);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  const hand = result.playerToHand[playerId];
  assert.ok(hand);
  assert.equal(hand.length, 0);
  const influence = result.playerToInfluence[playerId];
  assert.ok(influence);
  assert.equal(influence.length, 1);
  assert.equal(R.head(influence), cardId);
});

QUnit.test("transferHandToStockpile()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const playerId = 3;
  const cardId = 1;
  const cardKey = OrderCard.ACADEMY;
  const card = CardState.create({ id: cardId, cardKey });
  const action0 = ActionCreator.addCard(card);
  const state1 = Reducer.root(state0, action0);
  const action1 = ActionCreator.addToPlayerArray(
    "playerToHand",
    playerId,
    cardId
  );
  const state = Reducer.root(state1, action1);
  const action = ActionCreator.transferHandToStockpile(playerId, cardId);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  const hand = result.playerToHand[playerId];
  assert.ok(hand);
  assert.equal(hand.length, 0);
  const stockpile = result.playerToStockpile[playerId];
  assert.ok(stockpile);
  assert.equal(stockpile.length, 1);
  assert.equal(R.head(stockpile), cardId);
});

QUnit.test("transferHandToVault()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const playerId = 3;
  const cardId = 1;
  const cardKey = OrderCard.ACADEMY;
  const card = CardState.create({ id: cardId, cardKey });
  const action0 = ActionCreator.addCard(card);
  const state1 = Reducer.root(state0, action0);
  const action1 = ActionCreator.addToPlayerArray(
    "playerToHand",
    playerId,
    cardId
  );
  const state = Reducer.root(state1, action1);
  const action = ActionCreator.transferHandToVault(playerId, cardId);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  const hand = result.playerToHand[playerId];
  assert.ok(hand);
  assert.equal(hand.length, 0);
  const vault = result.playerToVault[playerId];
  assert.ok(vault);
  assert.equal(vault.length, 1);
  assert.equal(R.head(vault), cardId);
});

QUnit.test("transferJackToHand()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const playerId = 3;
  const cardId = 1;
  const cardKey = MiscCard.JACK1;
  const card = CardState.create({ id: cardId, cardKey });
  const action0 = ActionCreator.addCard(card);
  const state1 = Reducer.root(state0, action0);
  const action1 = ActionCreator.setJackDeck([cardId]);
  const state = Reducer.root(state1, action1);
  const action = ActionCreator.transferJackToHand(playerId);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  const { orderDeck, playerToHand } = result;
  assert.ok(orderDeck);
  assert.equal(orderDeck.length, 0, `orderDeck.length = ${orderDeck.length}`);
  const hand = playerToHand[playerId];
  assert.ok(hand);
  assert.equal(hand.length, 1, `hand.length = ${hand.length}`);
  assert.equal(R.head(hand), cardId);
});

QUnit.test("transferOrderToHand()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const playerId = 3;
  const cardId = 1;
  const cardKey = OrderCard.ACADEMY;
  const card = CardState.create({ id: cardId, cardKey });
  const action0 = ActionCreator.addCard(card);
  const state1 = Reducer.root(state0, action0);
  const action1 = ActionCreator.setOrderDeck([cardId]);
  const state = Reducer.root(state1, action1);
  const action = ActionCreator.transferOrderToHand(playerId);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  const { orderDeck, playerToHand } = result;
  assert.ok(orderDeck);
  assert.equal(orderDeck.length, 0, `orderDeck.length = ${orderDeck.length}`);
  const hand = playerToHand[playerId];
  assert.ok(hand);
  assert.equal(hand.length, 1, `hand.length = ${hand.length}`);
  assert.equal(R.head(hand), cardId);
});

QUnit.test("transferOrderToPool()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const cardId = 1;
  const cardKey = OrderCard.ACADEMY;
  const card = CardState.create({ id: cardId, cardKey });
  const action0 = ActionCreator.addCard(card);
  const state1 = Reducer.root(state0, action0);
  const action1 = ActionCreator.setOrderDeck([cardId]);
  const state = Reducer.root(state1, action1);
  const action = ActionCreator.transferOrderToPool();

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  const { cardPool, orderDeck } = result;
  assert.ok(orderDeck);
  assert.equal(orderDeck.length, 0, `orderDeck.length = ${orderDeck.length}`);
  assert.ok(cardPool);
  assert.equal(cardPool.length, 1, `cardPool.length = ${cardPool.length}`);
  assert.equal(R.head(cardPool), cardId);
});

QUnit.test("transferPoolToHand()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const playerId = 3;
  const cardId = 1;
  const cardKey = OrderCard.ACADEMY;
  const card = CardState.create({ id: cardId, cardKey });
  const action0 = ActionCreator.addCard(card);
  const state1 = Reducer.root(state0, action0);
  const action1 = ActionCreator.setOrderDeck([cardId]);
  const state = Reducer.root(state1, action1);
  const action = ActionCreator.transferPoolToHand(playerId, cardId);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  const { cardPool, playerToHand } = result;
  assert.ok(cardPool);
  assert.equal(cardPool.length, 0, `cardPool.length = ${cardPool.length}`);
  const hand = playerToHand[playerId];
  assert.ok(hand);
  assert.equal(hand.length, 1);
  assert.equal(R.head(hand), cardId);
});

const ReducerTest = {};
export default ReducerTest;
