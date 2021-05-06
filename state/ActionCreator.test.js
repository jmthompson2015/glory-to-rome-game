import ActionCreator from "./ActionCreator.js";
import ActionType from "./ActionType.js";
import PlayerState from "./PlayerState.js";

QUnit.module("ActionCreator");

QUnit.test("all action types", (assert) => {
  // Setup.
  const actionTypeKeys = Object.getOwnPropertyNames(ActionType);
  assert.equal(actionTypeKeys.length, 42);

  // Run / Verify.
  actionTypeKeys.forEach((key) => {
    assert.ok(
      ActionCreator[ActionType[key]],
      `actionType = ${key} ${ActionType[key]}`
    );
  });
});

QUnit.test("addGameRecord()", (assert) => {
  // Setup.
  const message = 12;

  // Run.
  const result = ActionCreator.addGameRecord(message);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.ADD_GAME_RECORD);
  assert.equal(result.message, message);
});

QUnit.test("addOrderCard()", (assert) => {
  // Setup.
  const orderCardState = 12;

  // Run.
  const result = ActionCreator.addOrderCard(orderCardState);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.ADD_ORDER_CARD);
  assert.equal(result.orderCardState, orderCardState);
});

QUnit.test("addPoolCard()", (assert) => {
  // Setup.
  const cardId = 12;

  // Run.
  const result = ActionCreator.addPoolCard(cardId);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.ADD_POOL_CARD);
  assert.equal(result.cardId, cardId);
});

QUnit.test("addSiteCard()", (assert) => {
  // Setup.
  const siteCardState = 12;

  // Run.
  const result = ActionCreator.addSiteCard(siteCardState);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.ADD_SITE_CARD);
  assert.equal(result.siteCardState, siteCardState);
});

QUnit.test("addStructure()", (assert) => {
  // Setup.
  const structureState = 12;

  // Run.
  const result = ActionCreator.addStructure(structureState);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.ADD_STRUCTURE);
  assert.equal(result.structureState, structureState);
});

QUnit.test("addToPlayerArray()", (assert) => {
  // Setup.
  const playerId = 3;
  const cardId = 12;

  // Run.
  const result = ActionCreator.addToPlayerArray(
    "playerToHand",
    playerId,
    cardId
  );

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.ADD_TO_PLAYER_ARRAY);
  assert.equal(result.arrayName, "playerToHand");
  assert.equal(result.playerId, playerId);
  assert.equal(result.cardId, cardId);
});

QUnit.test("layFoundation()", (assert) => {
  // Setup.
  const playerId = 3;
  const foundationId = 12;
  const siteId = 4;

  // Run.
  const result = ActionCreator.layFoundation(playerId, foundationId, siteId);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.LAY_FOUNDATION);
  assert.equal(result.playerId, playerId);
  assert.equal(result.foundationId, foundationId);
  assert.equal(result.siteId, siteId);
});

QUnit.test("setCurrentPhase()", (assert) => {
  // Setup.
  const phaseKey = 12;

  // Run.
  const result = ActionCreator.setCurrentPhase(phaseKey);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.SET_CURRENT_PHASE);
  assert.equal(result.phaseKey, phaseKey);
});

QUnit.test("setCurrentPlayer()", (assert) => {
  // Setup.
  const playerId = 3;

  // Run.
  const result = ActionCreator.setCurrentPlayer(playerId);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.SET_CURRENT_PLAYER);
  assert.equal(result.playerId, playerId);
});

QUnit.test("setCurrentRound()", (assert) => {
  // Setup.
  const round = 12;

  // Run.
  const result = ActionCreator.setCurrentRound(round);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.SET_CURRENT_ROUND);
  assert.equal(result.round, round);
});

QUnit.test("setCurrentStep()", (assert) => {
  // Setup.
  const stepKey = 12;

  // Run.
  const result = ActionCreator.setCurrentStep(stepKey);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.SET_CURRENT_STEP);
  assert.equal(result.stepKey, stepKey);
});

QUnit.test("setDelay()", (assert) => {
  // Setup.
  const delay = 12;

  // Run.
  const result = ActionCreator.setDelay(delay);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.SET_DELAY);
  assert.equal(result.delay, delay);
});

QUnit.test("setJackDeck()", (assert) => {
  // Setup.
  const jackDeck = 12;

  // Run.
  const result = ActionCreator.setJackDeck(jackDeck);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.SET_JACK_DECK);
  assert.equal(result.jackDeck, jackDeck);
});

QUnit.test("setLeadRole()", (assert) => {
  // Setup.
  const leadRoleKey = 3;

  // Run.
  const result = ActionCreator.setLeadRole(leadRoleKey);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.SET_LEAD_ROLE);
  assert.equal(result.leadRoleKey, leadRoleKey);
});

QUnit.test("setMctsRoot()", (assert) => {
  // Setup.
  const mctsRoot = 12;

  // Run.
  const result = ActionCreator.setMctsRoot(mctsRoot);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.SET_MCTS_ROOT);
  assert.equal(result.mctsRoot, mctsRoot);
});

QUnit.test("setOrderDeck()", (assert) => {
  // Setup.
  const orderDeck = 12;

  // Run.
  const result = ActionCreator.setOrderDeck(orderDeck);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.SET_ORDER_DECK);
  assert.equal(result.orderDeck, orderDeck);
});

QUnit.test("setOutOfTownSiteDeck()", (assert) => {
  // Setup.
  const siteDeck = 12;

  // Run.
  const result = ActionCreator.setOutOfTownSiteDeck(siteDeck);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.SET_OUT_OF_TOWN_SITE_DECK);
  assert.equal(result.siteDeck, siteDeck);
});

QUnit.test("setPlayers()", (assert) => {
  // Setup.
  const player0 = PlayerState.create({ id: 1, name: "Alfred" });
  const player1 = PlayerState.create({ id: 2, name: "Bruce" });
  const players = [player0, player1];

  // Run.
  const result = ActionCreator.setPlayers(players);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.SET_PLAYERS);
  const resultPlayers = result.players;
  assert.ok(resultPlayers);
  assert.equal(resultPlayers.length, 2);
  assert.equal(R.head(resultPlayers), player0);
  assert.equal(R.last(resultPlayers), player1);
});

QUnit.test("setPlayerStrategy()", (assert) => {
  // Setup.
  const playerId = 3;
  const strategy = 12;

  // Run.
  const result = ActionCreator.setPlayerStrategy(playerId, strategy);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.SET_PLAYER_STRATEGY);
  assert.equal(result.playerId, playerId);
  assert.equal(result.strategy, strategy);
});

QUnit.test("setSiteDeck()", (assert) => {
  // Setup.
  const siteDeck = 12;

  // Run.
  const result = ActionCreator.setSiteDeck(siteDeck);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.SET_SITE_DECK);
  assert.equal(result.siteDeck, siteDeck);
});

QUnit.test("setUserMessage()", (assert) => {
  // Setup.
  const userMessage = 12;

  // Run.
  const result = ActionCreator.setUserMessage(userMessage);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.SET_USER_MESSAGE);
  assert.equal(result.userMessage, userMessage);
});

QUnit.test("setVerbose()", (assert) => {
  // Setup.
  const isVerbose = 12;

  // Run.
  const result = ActionCreator.setVerbose(isVerbose);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.SET_VERBOSE);
  assert.equal(result.isVerbose, isVerbose);
});

QUnit.test("setVersion()", (assert) => {
  // Setup.
  const versionKey = "bogus";

  // Run.
  const result = ActionCreator.setVersion(versionKey);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.SET_VERSION);
  assert.equal(result.versionKey, versionKey);
});

QUnit.test("setWinner()", (assert) => {
  // Setup.
  const winnerId = 12;

  // Run.
  const result = ActionCreator.setWinner(winnerId);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.SET_WINNER);
  assert.equal(result.winnerId, winnerId);
});

QUnit.test("transferCampToPool()", (assert) => {
  // Setup.
  const playerId = 3;
  const cardId = 12;

  // Run.
  const result = ActionCreator.transferCampToPool(playerId, cardId);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.TRANSFER_CAMP_TO_POOL);
  assert.equal(result.playerId, playerId);
  assert.equal(result.cardId, cardId);
});

QUnit.test("transferHandToCamp()", (assert) => {
  // Setup.
  const playerId = 3;
  const cardId = 12;

  // Run.
  const result = ActionCreator.transferHandToCamp(playerId, cardId);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.TRANSFER_HAND_TO_CAMP);
  assert.equal(result.playerId, playerId);
  assert.equal(result.cardId, cardId);
});

QUnit.test("transferHandToStructure()", (assert) => {
  // Setup.
  const playerId = 3;
  const cardId = 12;
  const structureId = 4;

  // Run.
  const result = ActionCreator.transferHandToStructure(
    playerId,
    cardId,
    structureId
  );

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.TRANSFER_HAND_TO_STRUCTURE);
  assert.equal(result.playerId, playerId);
  assert.equal(result.cardId, cardId);
  assert.equal(result.structureId, structureId);
});

QUnit.test("transferJackToHand()", (assert) => {
  // Setup.
  const playerId = 3;

  // Run.
  const result = ActionCreator.transferJackToHand(playerId);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.TRANSFER_JACK_TO_HAND);
  assert.equal(result.playerId, playerId);
});

QUnit.test("transferOrderToHand()", (assert) => {
  // Setup.
  const playerId = 3;

  // Run.
  const result = ActionCreator.transferOrderToHand(playerId);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.TRANSFER_ORDER_TO_HAND);
  assert.equal(result.playerId, playerId);
});

QUnit.test("transferOrderToPool()", (assert) => {
  // Setup.
  const playerId = 3;

  // Run.
  const result = ActionCreator.transferOrderToPool(playerId);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.TRANSFER_ORDER_TO_POOL);
});

QUnit.test("transferPoolToClientele()", (assert) => {
  // Setup.
  const playerId = 3;
  const cardId = 12;

  // Run.
  const result = ActionCreator.transferPoolToClientele(playerId, cardId);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.TRANSFER_POOL_TO_CLIENTELE);
  assert.equal(result.playerId, playerId);
  assert.equal(result.cardId, cardId);
});

QUnit.test("transferPoolToStockpile()", (assert) => {
  // Setup.
  const playerId = 3;
  const cardId = 12;

  // Run.
  const result = ActionCreator.transferPoolToStockpile(playerId, cardId);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.TRANSFER_POOL_TO_STOCKPILE);
  assert.equal(result.playerId, playerId);
  assert.equal(result.cardId, cardId);
});

QUnit.test("transferStockpileToVault()", (assert) => {
  // Setup.
  const playerId = 3;
  const cardId = 12;

  // Run.
  const result = ActionCreator.transferStockpileToVault(playerId, cardId);

  // Verify.
  assert.ok(result);
  assert.equal(result.type, ActionType.TRANSFER_STOCKPILE_TO_VAULT);
  assert.equal(result.playerId, playerId);
  assert.equal(result.cardId, cardId);
});

const ActionCreatorTest = {};
export default ActionCreatorTest;
