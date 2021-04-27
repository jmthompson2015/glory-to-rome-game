/* eslint no-console: ["error", { allow: ["error", "log", "warn"] }] */

import ActionType from "./ActionType.js";
import AppState from "./AppState.js";

const Reducer = {};

const addToArray = (state, arrayName, playerId, cardId) => {
  const map = state[arrayName] || {};
  const oldArray = map[playerId] || [];
  const newArray = [...oldArray, cardId];
  const newPlayer2To = { ...map, [playerId]: newArray };

  return { ...state, [arrayName]: newPlayer2To };
};

const log = (message, state) => {
  if (state.isVerbose) {
    console.log(message);
  }
};

const transferBetweenArrays = (state, fromKey, toKey, playerId, cardId) => {
  const oldFrom = state[fromKey][playerId] || [];
  const oldTo = state[toKey][playerId] || [];

  const newFrom = R.without([cardId], oldFrom);
  const newTo = R.append(cardId, oldTo);

  const newPlayerToFrom = { ...state[fromKey], [playerId]: newFrom };
  const newPlayerToTo = { ...state[toKey], [playerId]: newTo };

  return { ...state, [fromKey]: newPlayerToFrom, [toKey]: newPlayerToTo };
};

const transferCampToPool = (state, playerId, cardId) => {
  const oldCamp = state.playerToCamp[playerId] || [];
  const newCamp = R.without([cardId], oldCamp);
  const newPlayerToCamp = { ...state.playerToCamp, [playerId]: newCamp };
  const oldPool = state.cardPool || [];
  const newPool = [...oldPool, cardId];

  return {
    ...state,
    playerToCamp: newPlayerToCamp,
    cardPool: newPool,
  };
};

const transferJackToHand = (state, playerId) => {
  const [cardId] = state.jackDeck;
  const newJackDeck = R.without([cardId], state.jackDeck);
  const oldHand = state.playerToHand[playerId] || [];
  const newHand = [...oldHand, cardId];
  const newPlayerToHand = { ...state.playerToHand, [playerId]: newHand };

  return {
    ...state,
    jackDeck: newJackDeck,
    playerToHand: newPlayerToHand,
  };
};

const transferOrderToHand = (state, playerId) => {
  const [cardId] = state.orderDeck;
  const newOrderDeck = R.without([cardId], state.orderDeck);
  const oldHand = state.playerToHand[playerId] || [];
  const newHand = [...oldHand, cardId];
  const newPlayerToHand = { ...state.playerToHand, [playerId]: newHand };

  return {
    ...state,
    orderDeck: newOrderDeck,
    playerToHand: newPlayerToHand,
  };
};

const transferOrderToPool = (state) => {
  const [cardId] = state.orderDeck;
  const newOrderDeck = R.without([cardId], state.orderDeck);
  const oldPool = state.cardPool || [];
  const newPool = [...oldPool, cardId];

  return {
    ...state,
    orderDeck: newOrderDeck,
    cardPool: newPool,
  };
};

const transferPoolToHand = (state, playerId, cardId) => {
  const newPool = R.without([cardId], state.cardPool);
  const oldHand = state.playerToHand[playerId] || [];
  const newHand = [...oldHand, cardId];
  const newPlayerToHand = { ...state.playerToHand, [playerId]: newHand };

  return {
    ...state,
    cardPool: newPool,
    playerToHand: newPlayerToHand,
  };
};

Reducer.root = (state, action) => {
  // LOGGER.debug(`root() type = ${action.type}`);

  if (typeof state === "undefined") {
    return AppState.create();
  }

  if (action.type && action.type.startsWith("@@redux/INIT")) {
    // Nothing to do.
    return state;
  }

  let newCards;
  let newGameRecords;
  let newPlayers;
  let newPlayerToStrategy;
  let newSiteDeck;
  let newSiteToDeck;
  let newStructures;

  switch (action.type) {
    case ActionType.ADD_GAME_RECORD:
      log(`Reducer ADD_GAME_RECORD message = ${action.message}`, state);
      newGameRecords = [
        ...state.gameRecords,
        { round: state.currentRound, message: action.message },
      ];
      return { ...state, gameRecords: newGameRecords };
    case ActionType.ADD_MISC_CARD:
      newCards = {
        ...state.miscCardInstances,
        [action.miscCardState.id]: action.miscCardState,
      };
      return { ...state, miscCardInstances: newCards };
    case ActionType.ADD_ORDER_CARD:
      newCards = {
        ...state.orderCardInstances,
        [action.orderCardState.id]: action.orderCardState,
      };
      return { ...state, orderCardInstances: newCards };
    case ActionType.ADD_SITE_CARD:
      newCards = {
        ...state.siteCardInstances,
        [action.siteCardState.id]: action.siteCardState,
      };
      return { ...state, siteCardInstances: newCards };
    case ActionType.ADD_STRUCTURE:
      newStructures = {
        ...state.structureInstances,
        [action.structureState.id]: action.structureState,
      };
      return { ...state, structureInstances: newStructures };
    case ActionType.ADD_TO_PLAYER_ARRAY:
      return addToArray(
        state,
        action.arrayName,
        action.playerId,
        action.cardId
      );
    case ActionType.SET_CURRENT_PHASE:
      log(`Reducer SET_CURRENT_PHASE phaseKey = ${action.phaseKey}`, state);
      return { ...state, currentPhaseKey: action.phaseKey };
    case ActionType.SET_CURRENT_PLAYER:
      log(
        `Reducer SET_CURRENT_PLAYER playerId = ${JSON.stringify(
          action.playerId
        )}`,
        state
      );
      return { ...state, currentPlayerId: action.playerId, userMessage: null };
    case ActionType.SET_CURRENT_PLAYER_ORDER:
      log(
        `Reducer SET_CURRENT_PLAYER_ORDER playerIds = ${JSON.stringify(
          action.playerIds
        )}`,
        state
      );
      return { ...state, currentPlayerOrder: action.playerIds };
    case ActionType.SET_CURRENT_ROUND:
      log(`Reducer SET_CURRENT_ROUND round = ${action.round}`, state);
      return { ...state, currentRound: action.round };
    case ActionType.SET_CURRENT_STEP:
      log(`Reducer SET_CURRENT_STEP stepKey = ${action.stepKey}`, state);
      return { ...state, currentStepKey: action.stepKey };
    case ActionType.SET_DELAY:
      log(`Reducer SET_DELAY delay = ${action.delay}`, state);
      return { ...state, delay: action.delay };
    case ActionType.SET_INITIATIVE_PLAYER:
      log(`Reducer SET_INITIATIVE_PLAYER playerId = ${action.playerId}`, state);
      return { ...state, initiativePlayerId: action.playerId };
    case ActionType.SET_JACK_DECK:
      return { ...state, jackDeck: action.jackDeck };
    case ActionType.SET_MCTS_ROOT:
      log(`Reducer SET_MCTS_ROOT mctsRoot = ${action.mctsRoot}`, state);
      return { ...state, mctsRoot: action.mctsRoot };
    case ActionType.SET_ORDER_DECK:
      return { ...state, orderDeck: action.orderDeck };
    case ActionType.SET_PLAYERS:
      log(
        `Reducer SET_PLAYERS players.length = ${action.players.length}`,
        state
      );
      newPlayers = R.reduce(
        (accum, p) => ({ ...accum, [p.id]: p }),
        {},
        action.players
      );
      return { ...state, playerInstances: newPlayers };
    case ActionType.SET_PLAYER_STRATEGY:
      log(
        `Reducer SET_PLAYER_STRATEGY playerId = ${action.playerId} strategy = ${action.strategy}`,
        state
      );
      newPlayerToStrategy = {
        ...state.playerToStrategy,
        [action.playerId]: action.strategy,
      };
      return { ...state, playerToStrategy: newPlayerToStrategy };
    case ActionType.SET_ROUND:
      log(`Reducer SET_ROUND round = ${action.round}`, state);
      return { ...state, round: action.round };
    case ActionType.SET_SITE_TO_DECK:
      log(
        `Reducer SET_SITE_TO_DECK siteKey = ${action.siteKey} siteDeck = ${action.siteDeck}`,
        state
      );
      newSiteDeck = action.siteDeck || [];
      newSiteToDeck = { ...state.siteToDeck, [action.siteKey]: newSiteDeck };
      return { ...state, siteToDeck: newSiteToDeck };
    case ActionType.SET_SITE_TO_OUT_OF_TOWN_DECK:
      log(
        `Reducer SET_SITE_TO_OUT_OF_TOWN_DECK siteKey = ${action.siteKey} ` +
          `outOfTownDeck = ${action.outOfTownDeck}`,
        state
      );
      newSiteDeck = action.outOfTownDeck || [];
      newSiteToDeck = {
        ...state.siteToDeck,
        [action.siteKey]: newSiteDeck,
      };
      return { ...state, siteToOutOfTownDeck: newSiteToDeck };
    case ActionType.SET_USER_MESSAGE:
      log(
        `Reducer SET_USER_MESSAGE userMessage = ${action.userMessage}`,
        state
      );
      return { ...state, userMessage: action.userMessage };
    case ActionType.SET_VERBOSE:
      log(`Reducer SET_VERBOSE isVerbose = ${action.isVerbose}`, state);
      return { ...state, isVerbose: action.isVerbose };
    case ActionType.SET_VERSION:
      log(`Reducer SET_VERSION versionKey = ${action.versionKey}`, state);
      return { ...state, versionKey: action.versionKey };
    case ActionType.SET_WINNER:
      log(`Reducer SET_WINNER winnerId = ${action.winnerId}`, state);
      return { ...state, winnerId: action.winnerId };
    case ActionType.TRANSFER_CAMP_TO_POOL:
      return transferCampToPool(state, action.playerId, action.cardId);
    case ActionType.TRANSFER_HAND_TO_CAMP:
      return transferBetweenArrays(
        state,
        "playerToHand",
        "playerToCamp",
        action.playerId,
        action.cardId
      );
    case ActionType.TRANSFER_HAND_TO_CLIENTELE:
      return transferBetweenArrays(
        state,
        "playerToHand",
        "playerToClientele",
        action.playerId,
        action.cardId
      );
    case ActionType.TRANSFER_HAND_TO_INFLUENCE:
      return transferBetweenArrays(
        state,
        "playerToHand",
        "playerToInfluence",
        action.playerId,
        action.cardId
      );
    case ActionType.TRANSFER_HAND_TO_STOCKPILE:
      return transferBetweenArrays(
        state,
        "playerToHand",
        "playerToStockpile",
        action.playerId,
        action.cardId
      );
    case ActionType.TRANSFER_HAND_TO_VAULT:
      return transferBetweenArrays(
        state,
        "playerToHand",
        "playerToVault",
        action.playerId,
        action.cardId
      );
    case ActionType.TRANSFER_JACK_TO_HAND:
      return transferJackToHand(state, action.playerId);
    case ActionType.TRANSFER_ORDER_TO_HAND:
      return transferOrderToHand(state, action.playerId);
    case ActionType.TRANSFER_ORDER_TO_POOL:
      return transferOrderToPool(state);
    case ActionType.TRANSFER_POOL_TO_HAND:
      return transferPoolToHand(state, action.playerId, action.cardId);
    default:
      console.warn(`Reducer.root: Unhandled action type: ${action.type}`);
      return state;
  }
};

Object.freeze(Reducer);

export default Reducer;
