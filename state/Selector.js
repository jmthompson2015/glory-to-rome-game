const Selector = {};

Selector.card = (cardId, state) => state.cardInstances[cardId];

Selector.cards = (cardIds, state) => {
  const mapFunction = (id) => state.cardInstances[id];

  return R.map(mapFunction, cardIds);
};

Selector.currentPlayer = (state) =>
  Selector.player(state.currentPlayerId, state);

Selector.currentPlayerOrder = (state) => state.currentPlayerOrder;

Selector.delay = (state) => state.delay;

Selector.gameRecords = (state) => state.gameRecords;

Selector.initiativePlayer = (state) => {
  const id = state.initiativePlayerId;
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

Selector.isInitiativePlayer = (playerId, state) =>
  playerId === state.initiativePlayerId;

Selector.isVerbose = (state) => state.isVerbose;

Selector.mctsRoot = (state) => state.mctsRoot;

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
  const count = Selector.playerCount(state);
  const players0 = Object.values(state.playerInstances);
  const index0 = R.findIndex(R.propEq("id", state.initiativePlayerId))(
    players0
  );
  const first = R.slice(index0, count, players0);
  const second = R.slice(0, index0, players0);

  return [...first, ...second];
};

Selector.userMessage = (state) => state.userMessage;

// /////////////////////////////////////////////////////////////////////////////////////////////////
const nextId = (instanceMap) => {
  const reduceFunction = (accum, key) => Math.max(accum, key);
  const maxId = R.reduce(reduceFunction, 0, Object.keys(instanceMap));

  return (maxId !== undefined ? maxId : 0) + 1;
};

Selector.nextCardId = (state) => nextId(state.cardInstances);

Selector.nextPlayerId = (state) => nextId(state.playerInstances);

Selector.nextStructureId = (state) => nextId(state.structureInstances);

// /////////////////////////////////////////////////////////////////////////////////////////////////
// Player collections.

Selector.hand = (playerId, state) => state.playerToHand[playerId] || [];

Object.freeze(Selector);

export default Selector;
