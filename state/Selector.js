import IV from "../utility/InputValidator.js";

import OrderCard from "../artifact/OrderCard.js";
import SiteCard from "../artifact/SiteCard.js";

const Selector = {};

Selector.bonusCard = (cardId, state) => state.bonusCardInstances[cardId];

Selector.bonusCards = (cardIds, state) => {
  const mapFunction = (id) => state.bonusCardInstances[id];

  return R.map(mapFunction, cardIds);
};

Selector.cardPool = (state) => state.cardPool || [];

Selector.currentPlayer = (state) =>
  Selector.player(state.currentPlayerId, state);

Selector.currentPlayerOrder = (state) => state.currentPlayerOrder;

Selector.currentRound = (state) => state.currentRound;

Selector.delay = (state) => state.delay;

Selector.gameRecords = (state) => state.gameRecords;

Selector.isComputerPlayer = (playerId, state) => {
  const player = Selector.player(playerId, state);

  return player && player.isComputer;
};

Selector.isGameOver = (state) => state.isGameOver;

Selector.isHumanPlayer = (playerId, state) => {
  const player = Selector.player(playerId, state);

  return player && !player.isComputer;
};

Selector.isLeader = (playerId, state) => playerId === Selector.leaderId(state);

Selector.isVerbose = (state) => state.isVerbose;

Selector.leaderCard = (state) => {
  IV.validateNotNil("state", state);
  const filterFunction = (card) => card.cardType.key === OrderCard.LEADER;
  const cards = R.filter(
    filterFunction,
    Object.values(state.orderCardInstances)
  );

  return cards.length > 0 ? cards[0] : null;
};

Selector.leaderId = (state) => R.head(state.currentPlayerOrder);

Selector.leadRole = (state) => state.leadRoleKey;

Selector.mctsRoot = (state) => state.mctsRoot;

Selector.orderCard = (cardId, state) => {
  IV.validateNotNil("cardId", cardId);
  IV.validateNotNil("state", state);
  return state.orderCardInstances[cardId];
};

Selector.orderCards = (cardIds, state) => {
  IV.validateNotIncludesNil("cardIds", cardIds);
  IV.validateNotNil("state", state);
  const mapFunction = (id) => state.orderCardInstances[id];

  return R.map(mapFunction, cardIds);
};

Selector.player = (playerId, state) => state.playerInstances[playerId];

Selector.playerCount = (state) => Object.keys(state.playerInstances).length;

Selector.playerStrategy = (playerId, state) => state.playerToStrategy[playerId];

Selector.players = (state) => Object.values(state.playerInstances);

Selector.playersInOrder = (state) => {
  const { currentPlayerOrder, playerInstances } = state;
  const mapFunction = (id) => playerInstances[id];

  return R.map(mapFunction, currentPlayerOrder);
};

Selector.refillLimit = (/* playerId, state */) => 5;

Selector.sitesByMaterial = (materialKey, state) => {
  IV.validateNotNil("materialKey", materialKey);
  IV.validateNotNil("state", state);
  const filterFunction = (siteCard) =>
    siteCard.cardType.materialKey === materialKey;

  return R.filter(filterFunction, Object.values(state.siteCardInstances));
};

Selector.siteCard = (cardId, state) => state.siteCardInstances[cardId];

Selector.siteCards = (cardIds, state) => {
  const mapFunction = (id) => state.siteCardInstances[id];

  return R.map(mapFunction, cardIds);
};

Selector.structures = (structureIds, state) => {
  IV.validateNotIncludesNil("structureIds", structureIds);
  IV.validateNotNil("state", state);
  const mapFunction = (id) => state.structureInstances[id];

  return R.map(mapFunction, structureIds);
};

Selector.userMessage = (state) => state.userMessage;

Selector.unfinishedStructures = (playerId, state) => {
  const filterFunction = (structureId) => {
    const structure = state.structureInstances[structureId];
    const { materialIds, siteId } = structure;
    const site = state.siteCardInstances[siteId];
    const siteCard = SiteCard.value(site.cardKey);
    return materialIds.length < siteCard.materialValue;
  };
  const structureIds = Selector.structureIds(playerId, state);

  return R.filter(filterFunction, structureIds);
};

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
  Selector.orderCards(Selector.campIds(playerId, state));

Selector.campIds = (playerId, state) => state.playerToCamp[playerId] || [];

Selector.clienteleCards = (playerId, state) =>
  Selector.orderCards(Selector.clienteleIds(playerId, state));

Selector.clienteleIds = (playerId, state) =>
  state.playerToClientele[playerId] || [];

Selector.handCards = (playerId, state) =>
  Selector.orderCards(Selector.handIds(playerId, state));

Selector.handIds = (playerId, state) => state.playerToHand[playerId] || [];

Selector.influenceCards = (playerId, state) =>
  Selector.orderCards(Selector.influenceIds(playerId, state));

Selector.influenceIds = (playerId, state) =>
  state.playerToInfluence[playerId] || [];

Selector.stockpileCards = (playerId, state) =>
  Selector.orderCards(Selector.stockpileIds(playerId, state));

Selector.stockpileIds = (playerId, state) =>
  state.playerToStockpile[playerId] || [];

Selector.structureIds = (playerId, state) =>
  state.playerToStructures[playerId] || [];

Selector.vaultCards = (playerId, state) =>
  Selector.orderCards(Selector.handIds(playerId, state));

Selector.vaultIds = (playerId, state) => state.playerToVault[playerId] || [];

Object.freeze(Selector);

export default Selector;
