import IV from "../utility/InputValidator.js";

import SiteCard from "../artifact/SiteCard.js";

const Selector = {};

Selector.cardPool = (state) => state.cardPool || [];

Selector.currentPlayer = (state) =>
  Selector.player(state.currentPlayerId, state);

Selector.currentPlayerOrder = (state) => state.currentPlayerOrder;

Selector.currentRound = (state) => state.currentRound;

Selector.delay = (state) => state.delay;

Selector.gameRecords = (state) => state.gameRecords;

Selector.initiativePlayer = (state) => {
  const id = state.leaderId;
  return state.playerInstances[id];
};

Selector.isComputerPlayer = (playerId, state) => {
  const player = Selector.player(playerId, state);

  return player && player.isComputer;
};

Selector.isCurrentPlayer = (playerId, state) =>
  playerId === state.currentPlayerId;

Selector.isGameOver = (state) => state.isGameOver;

Selector.isHumanPlayer = (playerId, state) => {
  const player = Selector.player(playerId, state);

  return player && !player.isComputer;
};

Selector.isInHand = (playerId, cardId, state) => {
  const hand = Selector.hand(playerId, state);

  return R.contains(cardId, hand);
};

Selector.isInitiativePlayer = (playerId, state) => playerId === state.leaderId;

Selector.isVerbose = (state) => state.isVerbose;

Selector.leaderId = (state) => R.head(state.currentPlayerOrder);

Selector.mctsRoot = (state) => state.mctsRoot;

Selector.miscCard = (cardId, state) => state.miscCardInstances[cardId];

Selector.miscCards = (cardIds, state) => {
  const mapFunction = (id) => state.miscCardInstances[id];

  return R.map(mapFunction, cardIds);
};

Selector.orderCard = (cardId, state) => {
  IV.validateNotNil("cardId", cardId);
  IV.validateNotNil("state", state);
  return state.orderCardInstances[cardId];
};

Selector.orderCards = (cardIds, state) => {
  IV.validateNotIncludesNil("cardIds", cardIds);
  IV.validateNotNil("state", state);
  const mapFunction = (id) => {
    const answer = state.orderCardInstances[id];
    IV.validateNotNil("card", answer);
    return answer;
  };

  return R.map(mapFunction, cardIds);
};

Selector.player = (playerId, state) => state.playerInstances[playerId];

Selector.playerCount = (state) => Object.keys(state.playerInstances).length;

Selector.playerForCard = (cardKey, state) => {
  const filterFunction = (player) => {
    const tableau = Selector.tableau(player.id, state);
    return tableau.includes(cardKey);
  };
  const players = R.filter(filterFunction, Selector.players(state));

  return players.length > 0 ? players[0] : undefined;
};

Selector.playerStrategy = (playerId, state) => state.playerToStrategy[playerId];

Selector.players = (state) => Object.values(state.playerInstances);

Selector.playersInOrder = (state) => {
  const { currentPlayerOrder, playerInstances } = state;
  const mapFunction = (id) => playerInstances[id];

  return R.map(mapFunction, currentPlayerOrder);
};

Selector.refillLimit = (/* playerId, state */) => 5;

Selector.siteCard = (cardId, state) => state.siteCardInstances[cardId];

Selector.siteCards = (cardIds, state) => {
  const mapFunction = (id) => state.siteCardInstances[id];

  return R.map(mapFunction, cardIds);
};

Selector.sitesAvailable = (state) => {
  const reduceFunction = (accum, siteKey) => {
    const siteIds = state.siteToDeck[siteKey] || [];

    return siteIds.length > 0 ? R.append(siteKey, accum) : accum;
  };
  const siteKeys = SiteCard.keys();

  return R.uniq(R.reduce(reduceFunction, [], siteKeys));
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
  const structureIds = Selector.structures(playerId, state);

  return R.filter(filterFunction, structureIds);
};

// /////////////////////////////////////////////////////////////////////////////////////////////////
const nextId = (instanceMap) => {
  const reduceFunction = (accum, key) => Math.max(accum, key);
  const maxId = R.reduce(reduceFunction, 0, Object.keys(instanceMap));

  return (maxId !== undefined ? maxId : 0) + 1;
};

Selector.nextMiscCardId = (state) => nextId(state.miscCardInstances);

Selector.nextOrderCardId = (state) => nextId(state.orderCardInstances);

Selector.nextPlayerId = (state) => nextId(state.playerInstances);

Selector.nextSiteCardId = (state) => nextId(state.siteCardInstances);

Selector.nextStructureId = (state) => nextId(state.structureInstances);

// /////////////////////////////////////////////////////////////////////////////////////////////////
// Player collections.

Selector.camp = (playerId, state) => state.playerToCamp[playerId] || [];

Selector.clientele = (playerId, state) =>
  state.playerToClientele[playerId] || [];

Selector.hand = (playerId, state) => state.playerToHand[playerId] || [];

Selector.influence = (playerId, state) =>
  state.playerToInfluence[playerId] || [];

Selector.stockpile = (playerId, state) =>
  state.playerToStockpile[playerId] || [];

Selector.structures = (playerId, state) =>
  state.playerToStructures[playerId] || [];

Selector.vault = (playerId, state) => state.playerToVault[playerId] || [];

Object.freeze(Selector);

export default Selector;
