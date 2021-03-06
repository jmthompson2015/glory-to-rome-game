import IV from "../utility/InputValidator.js";

import OrderCard from "../artifact/OrderCard.js";
import Role from "../artifact/Role.js";

const Selector = {};

const filterByMaterial = (materialKey) => (cardInstance) =>
  cardInstance.cardType.materialKey === materialKey;

const filterByRole = (roleKey) => (cardInstance) =>
  cardInstance.cardType.roleKey === roleKey;

const mapToId = (cardInstance) => cardInstance.id;

Selector.bonusCard = (cardId, state) => state.bonusCardInstances[cardId];

Selector.bonusCards = (cardIds, state) => {
  IV.validateIsArray("cardIds", cardIds);
  IV.validateNotNil("state", state);
  const mapFunction = (id) => state.bonusCardInstances[id];

  return R.map(mapFunction, cardIds);
};

Selector.bonusDeck = (state) => state.bonusDeck;

Selector.cardPool = (state) => state.cardPool || [];

Selector.clienteleCardsByRole = (roleKey, playerId, state) => {
  IV.validateIsString("roleKey", roleKey);
  IV.validateIsNumber("playerId", playerId);
  IV.validateNotNil("state", state);
  const cardInstances = Selector.clienteleCards(playerId, state);

  return R.filter(filterByRole(roleKey), cardInstances);
};

Selector.clienteleIdsByRole = (roleKey, playerId, state) => {
  IV.validateIsString("roleKey", roleKey);
  IV.validateIsNumber("playerId", playerId);
  IV.validateNotNil("state", state);
  const cardInstances = Selector.clienteleCardsByRole(roleKey, playerId, state);

  return R.map(mapToId, cardInstances);
};

Selector.computeInfluence = (playerId, state) => {
  IV.validateIsNumber("playerId", playerId);
  IV.validateNotNil("state", state);
  const influenceCards = Selector.influenceCards(playerId, state);
  const reduceFunction = (accum, card) => accum + card.cardType.materialValue;

  return R.reduce(reduceFunction, 2, influenceCards);
};

Selector.currentInputCallback = (state) => state.currentInputCallback;

Selector.currentMove = (state) => state.currentMove;

Selector.currentMoves = (state) => state.currentMoves;

Selector.currentPlayer = (state) =>
  Selector.player(state.currentPlayerId, state);

Selector.currentPlayerId = (state) => state.currentPlayerId;

Selector.currentPhaseKey = (state) => state.currentPhaseKey;

Selector.currentPlayerOrder = (state) => state.currentPlayerOrder;

Selector.currentRound = (state) => state.currentRound;

Selector.currentStepKey = (state) => state.currentStepKey;

Selector.delay = (state) => state.delay;

Selector.gameRecords = (state) => state.gameRecords;

Selector.handCardsByMaterial = (materialKey, playerId, state) => {
  IV.validateIsString("materialKey", materialKey);
  IV.validateIsNumber("playerId", playerId);
  IV.validateNotNil("state", state);
  const cardInstances = Selector.handCards(playerId, state);

  return R.filter(filterByMaterial(materialKey), cardInstances);
};

Selector.handCardsByRole = (roleKey, playerId, state) => {
  IV.validateIsString("roleKey", roleKey);
  IV.validateIsNumber("playerId", playerId);
  IV.validateNotNil("state", state);
  const cardInstances = Selector.handCards(playerId, state);

  return R.filter(filterByRole(roleKey), cardInstances);
};

Selector.handIdsByMaterial = (materialKey, playerId, state) => {
  IV.validateIsString("materialKey", materialKey);
  IV.validateIsNumber("playerId", playerId);
  IV.validateNotNil("state", state);
  const cardInstances = Selector.handCardsByMaterial(
    materialKey,
    playerId,
    state
  );

  return R.map(mapToId, cardInstances);
};

Selector.handIdsByRole = (roleKey, playerId, state) => {
  IV.validateIsString("roleKey", roleKey);
  IV.validateIsNumber("playerId", playerId);
  IV.validateNotNil("state", state);
  const cardInstances = Selector.handCardsByRole(roleKey, playerId, state);

  return R.map(mapToId, cardInstances);
};

Selector.handShortfall = (playerId, state) => {
  IV.validateIsNumber("playerId", playerId);
  IV.validateNotNil("state", state);
  const handIds = Selector.handIds(playerId, state);
  const refillLimit = Selector.refillLimit(playerId, state);

  return refillLimit - handIds.length;
};

Selector.isComputerPlayer = (playerId, state) => {
  IV.validateIsNumber("playerId", playerId);
  IV.validateNotNil("state", state);
  const player = Selector.player(playerId, state);

  return player && player.isComputer;
};

Selector.isGameOver = (state) => state.isGameOver;

Selector.isHumanPlayer = (playerId, state) => {
  IV.validateIsNumber("playerId", playerId);
  IV.validateNotNil("state", state);
  const player = Selector.player(playerId, state);

  return player && !player.isComputer;
};

Selector.isJack = (cardId, state) => {
  const cardState = Selector.orderCard(cardId, state);

  return cardState ? OrderCard.isJack(cardState.cardKey) : false;
};

Selector.isLeader = (playerId, state) => playerId === Selector.leaderId(state);

Selector.isStructureComplete = (structureId, state) => {
  IV.validateIsNumber("structureId", structureId);
  IV.validateNotNil("state", state);
  const structure = state.structureInstances[structureId];
  IV.validateNotNil("structure", structure);
  const { foundationId, materialIds } = structure;
  IV.validateIsNumber("foundationId", foundationId);
  IV.validateIsArray("materialIds", materialIds);
  const foundation = Selector.orderCard(foundationId, state);
  IV.validateNotNil("foundation", foundation);

  return materialIds.length === foundation.cardType.materialValue;
};

Selector.isVerbose = (state) => state.isVerbose;

Selector.jackCards = (state) => {
  const cardIds = Selector.jackDeck(state);

  return Selector.orderCards(cardIds, state);
};

Selector.jackDeck = (state) => state.jackDeck;

Selector.leaderCard = (state) => {
  IV.validateNotNil("state", state);
  const filterFunction = (card) => card.cardType.key === OrderCard.LEADER;
  const cards = R.filter(
    filterFunction,
    Object.values(state.orderCardInstances)
  );

  return cards.length > 0 ? cards[0] : null;
};

Selector.leaderCardId = (state) => state.leaderCardId;

Selector.leaderId = (state) => state.leaderId;

Selector.leadRole = (state) => Role.value(state.leadRoleKey);

Selector.leadRoleKey = (state) => state.leadRoleKey;

Selector.mctsRoot = (state) => state.mctsRoot;

Selector.orderCard = (cardId, state) => {
  IV.validateIsNumber("cardId", cardId);
  IV.validateNotNil("state", state);
  return state.orderCardInstances[cardId];
};

Selector.orderCards = (cardIds, state) => {
  IV.validateNotIncludesNil("cardIds", cardIds);
  IV.validateNotNil("state", state);
  const mapFunction = (id) => state.orderCardInstances[id];

  return R.map(mapFunction, cardIds);
};

Selector.orderDeck = (state) => state.orderDeck;

Selector.outOfTownSiteDeck = (state) => state.outOfTownSiteDeck;

Selector.player = (playerId, state) => state.playerInstances[playerId];

Selector.playerIds = (state) => {
  const mapFunction = (id) => parseInt(id, 10);

  return R.map(mapFunction, Object.keys(state.playerInstances));
};

Selector.playerCount = (state) => Object.keys(state.playerInstances).length;

Selector.playerStrategy = (playerId, state) => state.playerToStrategy[playerId];

Selector.players = (state) => Object.values(state.playerInstances);

Selector.playersInOrder = (state) => {
  IV.validateNotNil("state", state);
  const { currentPlayerOrder, playerInstances } = state;
  const mapFunction = (id) => playerInstances[id];

  return R.map(mapFunction, currentPlayerOrder);
};

Selector.poolCardsByMaterial = (materialKey, state) => {
  IV.validateIsString("materialKey", materialKey);
  IV.validateNotNil("state", state);
  const cardInstances = Selector.orderCards(state.cardPool, state);

  return R.filter(filterByMaterial(materialKey), cardInstances);
};

Selector.poolCardsByRole = (roleKey, state) => {
  IV.validateIsString("roleKey", roleKey);
  IV.validateNotNil("state", state);
  const cardInstances = Selector.orderCards(state.cardPool);

  return R.filter(filterByRole(roleKey), cardInstances);
};

Selector.poolIdsByMaterial = (materialKey, state) => {
  IV.validateIsString("materialKey", materialKey);
  IV.validateNotNil("state", state);
  const cardInstances = Selector.poolCardsByMaterial(materialKey, state);

  return R.map(mapToId, cardInstances);
};

Selector.poolIdsByRole = (roleKey, state) => {
  IV.validateIsString("roleKey", roleKey);
  IV.validateNotNil("state", state);
  const cardInstances = Selector.poolCardsByRole(roleKey, state);

  return R.map(mapToId, cardInstances);
};

Selector.refillLimit = (/* playerId, state */) => 5;

Selector.score = (playerId, state) => {
  IV.validateIsNumber("playerId", playerId);
  IV.validateNotNil("state", state);

  const influence = Selector.computeInfluence(playerId, state);
  const vaultCards = Selector.vaultCards(playerId, state);
  const suffix = vaultCards.length > 0 ? ` + Vault` : "";

  return influence + suffix;
};

Selector.siteCard = (cardId, state) => {
  IV.validateIsNumber("cardId", cardId);
  IV.validateNotNil("state", state);

  return state.siteCardInstances[cardId];
};

Selector.siteCards = (cardIds, state) => {
  IV.validateIsArray("cardIds", cardIds);
  IV.validateNotNil("state", state);
  const mapFunction = (id) => state.siteCardInstances[id];

  return R.map(mapFunction, cardIds);
};

Selector.siteCardsByMaterial = (materialKey, state) => {
  IV.validateIsString("materialKey", materialKey);
  IV.validateNotNil("state", state);
  const cardInstances = Selector.siteCards(state.siteDeck, state);

  return R.filter(filterByMaterial(materialKey), cardInstances);
};

Selector.siteDeck = (state) => state.siteDeck;

Selector.siteIdsByMaterial = (materialKey, state) => {
  IV.validateIsString("materialKey", materialKey);
  IV.validateNotNil("state", state);
  const cardInstances = Selector.siteCardsByMaterial(materialKey, state);

  return R.map(mapToId, cardInstances);
};

Selector.structure = (structureId, state) => {
  IV.validateIsNumber("structureId", structureId);
  IV.validateNotNil("state", state);

  return state.structureInstances[structureId];
};

Selector.structures = (structureIds, state) => {
  IV.validateNotIncludesNil("structureIds", structureIds);
  IV.validateNotNil("state", state);
  const mapFunction = (id) => state.structureInstances[id];

  return R.map(mapFunction, structureIds);
};

Selector.userMessage = (state) => state.userMessage;

Selector.unfinishedStructureIds = (playerId, state) => {
  IV.validateIsNumber("playerId", playerId);
  IV.validateNotNil("state", state);
  const filterFunction = (structureId) =>
    R.not(Selector.isStructureComplete(structureId, state));
  const structureIds = Selector.structureIds(playerId, state);

  return R.filter(filterFunction, structureIds);
};

Selector.unfinishedStructureIdsByMaterial = (materialKey, playerId, state) => {
  IV.validateIsString("materialKey", materialKey);
  IV.validateIsNumber("playerId", playerId);
  IV.validateNotNil("state", state);
  const filterFunction = (structureId) => {
    const structure = state.structureInstances[structureId];
    const { siteId } = structure;
    const siteCard = Selector.siteCard(siteId, state);
    return materialKey === siteCard.cardType.materialKey;
  };
  const structureIds = Selector.unfinishedStructureIds(playerId, state);

  return R.filter(filterFunction, structureIds);
};

Selector.winner = (state) => Selector.player(state.winnerId, state);

// /////////////////////////////////////////////////////////////////////////////////////////////////
const nextId = (instanceMap) => {
  const reduceFunction = (accum, key) => Math.max(accum, key);
  const maxId = R.reduce(reduceFunction, 0, Object.keys(instanceMap));

  return (maxId !== undefined ? maxId : 0) + 1;
};

Selector.nextBonusCardId = (state) => nextId(state.bonusCardInstances);

Selector.nextOrderCardId = (state) => nextId(state.orderCardInstances);

Selector.nextPlayerId = (state) => nextId(state.playerInstances);

Selector.nextSiteCardId = (state) => nextId(state.siteCardInstances);

Selector.nextStructureId = (state) => nextId(state.structureInstances);

// /////////////////////////////////////////////////////////////////////////////////////////////////
// Player collections.
Selector.campCards = (playerId, state) =>
  Selector.orderCards(Selector.campIds(playerId, state), state);

Selector.campIds = (playerId, state) => state.playerToCamp[playerId] || [];

Selector.clienteleCards = (playerId, state) =>
  Selector.orderCards(Selector.clienteleIds(playerId, state), state);

Selector.clienteleIds = (playerId, state) =>
  state.playerToClientele[playerId] || [];

Selector.handCards = (playerId, state) =>
  Selector.orderCards(Selector.handIds(playerId, state), state);

Selector.handIds = (playerId, state) => state.playerToHand[playerId] || [];

Selector.influenceCards = (playerId, state) =>
  Selector.siteCards(Selector.influenceIds(playerId, state), state);

Selector.influenceIds = (playerId, state) =>
  state.playerToInfluence[playerId] || [];

Selector.stockpileCards = (playerId, state) =>
  Selector.orderCards(Selector.stockpileIds(playerId, state), state);

Selector.stockpileIds = (playerId, state) =>
  state.playerToStockpile[playerId] || [];

Selector.structureIds = (playerId, state) =>
  state.playerToStructures[playerId] || [];

Selector.vaultCards = (playerId, state) =>
  Selector.orderCards(Selector.vaultIds(playerId, state), state);

Selector.vaultIds = (playerId, state) => state.playerToVault[playerId] || [];

Object.freeze(Selector);

export default Selector;
