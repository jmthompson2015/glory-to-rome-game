import BonusCard from "../artifact/BonusCard.js";
import OrderCard from "../artifact/OrderCard.js";
import SiteCard from "../artifact/SiteCard.js";
import Version from "../artifact/Version.js";

import AppState from "./AppState.js";
import ActionCreator from "./ActionCreator.js";
import BonusCardState from "./BonusCardState.js";
import OrderCardState from "./OrderCardState.js";
import PlayerState from "./PlayerState.js";
import Reducer from "./Reducer.js";
import Selector from "./Selector.js";
import SiteCardState from "./SiteCardState.js";
import StructureState from "./StructureState.js";

QUnit.module("Reducer");

const createPlayers = () => {
  const player1 = PlayerState.create({
    id: 1,
    name: "Alfred", // Pennyworth
  });
  const player2 = PlayerState.create({
    id: 2,
    name: "Bruce", // Wayne
  });
  const player3 = PlayerState.create({
    id: 3,
    name: "Clark", // Kent
  });
  const player4 = PlayerState.create({
    id: 4,
    name: "Diana", // Prince
  });
  const player5 = PlayerState.create({
    id: 5,
    name: "Edward", // Nygma
  });

  return [player1, player2, player3, player4, player5];
};

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

QUnit.test("addBonusCard()", (assert) => {
  // Setup.
  const state = AppState.create();
  const cardKey = "knight";
  const cardState = BonusCardState.create({
    id: Selector.nextOrderCardId(state),
    cardKey,
  });
  const action = ActionCreator.addBonusCard(cardState);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  const cards = result.bonusCardInstances;
  assert.ok(cards);
  assert.equal(Object.keys(cards).length, 1);
  const card = cards[1];
  assert.ok(card);
  assert.equal(card.id, 1);
  assert.equal(card.cardKey, cardKey);
});

QUnit.test("addOrderCard()", (assert) => {
  // Setup.
  const state = AppState.create();
  const cardKey = "knight";
  const cardState = OrderCardState.create({
    id: Selector.nextOrderCardId(state),
    cardKey,
  });
  const action = ActionCreator.addOrderCard(cardState);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  const cards = result.orderCardInstances;
  assert.ok(cards);
  assert.equal(Object.keys(cards).length, 1);
  const card = cards[1];
  assert.ok(card);
  assert.equal(card.id, 1);
  assert.equal(card.cardKey, cardKey);
});

QUnit.test("addPoolCard()", (assert) => {
  // Setup.
  const state = AppState.create();
  const cardKey = "knight";
  const cardState = OrderCardState.create({
    id: Selector.nextOrderCardId(state),
    cardKey,
  });
  const cardId = cardState.id;
  const action = ActionCreator.addPoolCard(cardId);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  const cards = result.cardPool;
  assert.ok(cards);
  assert.equal(cards.length, 1);
  assert.equal(R.head(cards), cardId);
});

QUnit.test("addSiteCard()", (assert) => {
  // Setup.
  const state = AppState.create();
  const cardKey = "knight";
  const cardState = SiteCardState.create({
    id: Selector.nextSiteCardId(state),
    cardKey,
  });
  const action = ActionCreator.addSiteCard(cardState);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  const cards = result.siteCardInstances;
  assert.ok(cards);
  assert.equal(Object.keys(cards).length, 1);
  const card = cards[1];
  assert.ok(card);
  assert.equal(card.id, 1);
  assert.equal(card.cardKey, cardKey);
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

QUnit.test("layFoundation()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const playerId = 3;
  const foundationId = 1;
  const foundationCard = OrderCardState.create({
    id: foundationId,
    cardKey: OrderCard.ACADEMY,
  });
  const action0 = ActionCreator.addOrderCard(foundationCard);
  const state1 = Reducer.root(state0, action0);
  const action1 = ActionCreator.addToPlayerArray(
    "playerToHand",
    playerId,
    foundationId
  );
  const state2 = Reducer.root(state1, action1);

  const siteId = 2;
  const siteKey = SiteCard.BRICK;
  const siteCard = SiteCardState.create({
    id: siteId,
    cardKey: siteKey,
  });
  const action2 = ActionCreator.addSiteCard(siteCard);
  const state3 = Reducer.root(state2, action2);
  const action3 = ActionCreator.setSiteToDeck(siteKey, [siteCard.id]);
  const state = Reducer.root(state3, action3);
  const action = ActionCreator.layFoundation(playerId, foundationId, siteKey);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  const hand = result.playerToHand[playerId];
  assert.ok(hand);
  assert.equal(hand.length, 0, `hand.length = ${hand.length}`);
  const siteDeck = result.siteToDeck[siteKey];
  assert.ok(siteDeck);
  assert.equal(siteDeck.length, 0, `siteDeck.length = ${siteDeck.length}`);
  const structures = result.playerToStructures[playerId];
  assert.ok(structures);
  assert.equal(
    structures.length,
    1,
    `structures.length = ${structures.length}`
  );
  const structureId = R.head(structures);
  assert.equal(structureId, 1, `structureId = ${structureId}`);
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

QUnit.test("setCurrentRound()", (assert) => {
  // Setup.
  const state = AppState.create();
  const round = 12;
  const action = ActionCreator.setCurrentRound(round);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.currentRound, round);
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

QUnit.test("setLeadRole()", (assert) => {
  // Setup.
  const state = AppState.create();
  const roleKey = 12;
  const action = ActionCreator.setLeadRole(roleKey);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  assert.equal(result.leadRoleKey, roleKey);
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
  const players = createPlayers();
  const action = ActionCreator.setPlayers(players);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  const { playerInstances } = result;
  assert.ok(playerInstances);
  assert.equal(Object.keys(playerInstances).length, 5);
  assert.equal(playerInstances[1], R.head(players));
  assert.equal(playerInstances[5], R.last(players));
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
  const card = OrderCardState.create({ id: cardId, cardKey });
  const action0 = ActionCreator.addOrderCard(card);
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
  const card = OrderCardState.create({ id: cardId, cardKey });
  const action0 = ActionCreator.addOrderCard(card);
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

QUnit.test("transferHandToStructure()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const playerId = 3;
  const cardId = 2;
  const cardKey = OrderCard.ACADEMY;
  const card = OrderCardState.create({ id: cardId, cardKey });
  const action0 = ActionCreator.addOrderCard(card);
  const state1 = Reducer.root(state0, action0);
  const action1 = ActionCreator.addToPlayerArray(
    "playerToHand",
    playerId,
    cardId
  );
  const state2 = Reducer.root(state1, action1);

  const foundationId = 1;
  const siteKey = SiteCard.BRICK;
  const action2 = ActionCreator.layFoundation(playerId, foundationId, siteKey);
  const state = Reducer.root(state2, action2);
  const structureId = R.head(state.playerToStructures[playerId]);
  const action = ActionCreator.transferHandToStructure(
    playerId,
    cardId,
    structureId
  );

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  const hand = result.playerToHand[playerId];
  assert.ok(hand);
  assert.equal(hand.length, 0, `hand.length = ${hand.length}`);
  const structure = result.structureInstances[structureId];
  assert.ok(structure);
  assert.equal(structure.materialIds.length, 1);
  assert.equal(R.head(structure.materialIds), cardId);
});

QUnit.test("transferJackToHand()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const playerId = 3;
  const cardId = 1;
  const cardKey = BonusCard.JACK1;
  const card = BonusCardState.create({ id: cardId, cardKey });
  const action0 = ActionCreator.addOrderCard(card);
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
  const card = OrderCardState.create({ id: cardId, cardKey });
  const action0 = ActionCreator.addOrderCard(card);
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
  const card = OrderCardState.create({ id: cardId, cardKey });
  const action0 = ActionCreator.addOrderCard(card);
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

QUnit.test("transferPoolToClientele()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const playerId = 3;
  const cardId = 1;
  const cardKey = OrderCard.ACADEMY;
  const card = OrderCardState.create({ id: cardId, cardKey });
  const action0 = ActionCreator.addOrderCard(card);
  const state1 = Reducer.root(state0, action0);
  const action1 = ActionCreator.setCardPool([cardId]);
  const state = Reducer.root(state1, action1);
  const action = ActionCreator.transferPoolToClientele(playerId, cardId);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  const { cardPool, playerToClientele } = result;
  assert.ok(cardPool);
  assert.equal(cardPool.length, 0, `cardPool.length = ${cardPool.length}`);
  const clientele = playerToClientele[playerId];
  assert.ok(clientele);
  assert.equal(clientele.length, 1);
  assert.equal(R.head(clientele), cardId);
});

QUnit.test("transferPoolToStockpile()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const playerId = 3;
  const cardId = 1;
  const cardKey = OrderCard.ACADEMY;
  const card = OrderCardState.create({ id: cardId, cardKey });
  const action0 = ActionCreator.addOrderCard(card);
  const state1 = Reducer.root(state0, action0);
  const action1 = ActionCreator.setCardPool([cardId]);
  const state = Reducer.root(state1, action1);
  assert.equal(
    state.cardPool.length,
    1,
    `cardPool.length = ${state.cardPool.length}`
  );
  const action = ActionCreator.transferPoolToStockpile(playerId, cardId);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  const { cardPool, playerToStockpile } = result;
  assert.ok(cardPool);
  assert.equal(cardPool.length, 0, `cardPool.length = ${cardPool.length}`);
  const stockpile = playerToStockpile[playerId];
  assert.ok(stockpile);
  assert.equal(stockpile.length, 1);
  assert.equal(R.head(stockpile), cardId);
});

QUnit.test("transferStockpileToVault()", (assert) => {
  // Setup.
  const state0 = AppState.create();
  const playerId = 3;
  const cardId = 1;
  const cardKey = OrderCard.ACADEMY;
  OrderCardState.create({ id: cardId, cardKey });
  const action0 = ActionCreator.addToPlayerArray(
    "playerToStockpile",
    playerId,
    cardId
  );
  const state = Reducer.root(state0, action0);
  const action = ActionCreator.transferStockpileToVault(playerId, cardId);

  // Run.
  const result = Reducer.root(state, action);

  // Verify.
  assert.ok(result);
  const { playerToStockpile, playerToVault } = result;
  assert.ok(playerToStockpile);
  assert.equal(
    playerToStockpile[playerId].length,
    0,
    `playerToStockpile[playerId].length = ${playerToStockpile[playerId].length}`
  );
  const vault = playerToVault[playerId];
  assert.ok(vault);
  assert.equal(vault.length, 1);
  assert.equal(R.head(vault), cardId);
});

const ReducerTest = {};
export default ReducerTest;
