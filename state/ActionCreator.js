import ActionType from "./ActionType.js";

const ActionCreator = {};

// See https://redux.js.org/recipes/reducing-boilerplate
const makeActionCreator = (type, ...argNames) => (...args) => {
  const action = { type };
  argNames.forEach((arg, index) => {
    action[argNames[index]] = args[index];
  });
  return action;
};

ActionCreator.addGameRecord = makeActionCreator(
  ActionType.ADD_GAME_RECORD,
  "message"
);

ActionCreator.addMiscCard = makeActionCreator(
  ActionType.ADD_MISC_CARD,
  "miscCardState"
);

ActionCreator.addOrderCard = makeActionCreator(
  ActionType.ADD_ORDER_CARD,
  "orderCardState"
);

ActionCreator.addSiteCard = makeActionCreator(
  ActionType.ADD_SITE_CARD,
  "siteCardState"
);

ActionCreator.addStructure = makeActionCreator(
  ActionType.ADD_STRUCTURE,
  "structureState"
);

ActionCreator.addToPlayerArray = (arrayName, playerId, cardId) => ({
  type: ActionType.ADD_TO_PLAYER_ARRAY,
  arrayName,
  playerId,
  cardId,
});

ActionCreator.setCurrentPhase = makeActionCreator(
  ActionType.SET_CURRENT_PHASE,
  "phaseKey"
);

ActionCreator.setCurrentPlayer = makeActionCreator(
  ActionType.SET_CURRENT_PLAYER,
  "playerId"
);

ActionCreator.setCurrentRound = makeActionCreator(
  ActionType.SET_CURRENT_ROUND,
  "round"
);

ActionCreator.setCurrentStep = makeActionCreator(
  ActionType.SET_CURRENT_STEP,
  "stepKey"
);

ActionCreator.setDelay = makeActionCreator(ActionType.SET_DELAY, "delay");

ActionCreator.setJackDeck = makeActionCreator(
  ActionType.SET_JACK_DECK,
  "jackDeck"
);

ActionCreator.setLeader = makeActionCreator(ActionType.SET_LEADER, "leaderId");

ActionCreator.setMctsRoot = makeActionCreator(
  ActionType.SET_MCTS_ROOT,
  "mctsRoot"
);

ActionCreator.setOrderDeck = makeActionCreator(
  ActionType.SET_ORDER_DECK,
  "orderDeck"
);

ActionCreator.setPlayers = makeActionCreator(ActionType.SET_PLAYERS, "players");

ActionCreator.setPlayerStrategy = makeActionCreator(
  ActionType.SET_PLAYER_STRATEGY,
  "playerId",
  "strategy"
);

ActionCreator.setSiteToDeck = makeActionCreator(
  ActionType.SET_SITE_TO_DECK,
  "siteKey",
  "siteDeck"
);

ActionCreator.setSiteToOutOfTownDeck = makeActionCreator(
  ActionType.SET_SITE_TO_OUT_OF_TOWN_DECK,
  "siteKey",
  "outOfTownDeck"
);

ActionCreator.setUserMessage = makeActionCreator(
  ActionType.SET_USER_MESSAGE,
  "userMessage"
);

ActionCreator.setVerbose = makeActionCreator(
  ActionType.SET_VERBOSE,
  "isVerbose"
);

ActionCreator.setVersion = makeActionCreator(
  ActionType.SET_VERSION,
  "versionKey"
);

ActionCreator.setWinner = makeActionCreator(ActionType.SET_WINNER, "winnerId");

ActionCreator.transferCampToPool = makeActionCreator(
  ActionType.TRANSFER_CAMP_TO_POOL,
  "playerId",
  "cardId"
);

ActionCreator.transferHandToCamp = makeActionCreator(
  ActionType.TRANSFER_HAND_TO_CAMP,
  "playerId",
  "cardId"
);

ActionCreator.transferHandToClientele = makeActionCreator(
  ActionType.TRANSFER_HAND_TO_CLIENTELE,
  "playerId",
  "cardId"
);

ActionCreator.transferHandToInfluence = makeActionCreator(
  ActionType.TRANSFER_HAND_TO_INFLUENCE,
  "playerId",
  "cardId"
);

ActionCreator.transferHandToStockpile = makeActionCreator(
  ActionType.TRANSFER_HAND_TO_STOCKPILE,
  "playerId",
  "cardId"
);

ActionCreator.transferHandToVault = makeActionCreator(
  ActionType.TRANSFER_HAND_TO_VAULT,
  "playerId",
  "cardId"
);

ActionCreator.transferJackToHand = makeActionCreator(
  ActionType.TRANSFER_JACK_TO_HAND,
  "playerId"
);

ActionCreator.transferOrderToHand = makeActionCreator(
  ActionType.TRANSFER_ORDER_TO_HAND,
  "playerId"
);

ActionCreator.transferOrderToPool = makeActionCreator(
  ActionType.TRANSFER_ORDER_TO_POOL,
  "playerId"
);

ActionCreator.transferPoolToHand = makeActionCreator(
  ActionType.TRANSFER_POOL_TO_HAND,
  "playerId",
  "cardId"
);

Object.freeze(ActionCreator);

export default ActionCreator;
