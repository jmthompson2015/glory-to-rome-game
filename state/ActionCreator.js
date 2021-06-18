import IV from "../utility/InputValidator.js";

import ActionType from "./ActionType.js";

const ActionCreator = {};

// See https://redux.js.org/recipes/reducing-boilerplate
const makeActionCreator = (type, ...argNames) => (...args) => {
  const action = { type };
  argNames.forEach((arg, index) => {
    IV.validateNotNil(argNames[index], args[index]);
    action[argNames[index]] = args[index];
  });
  return action;
};

const makeActionCreatorNilAllowed = (type, ...argNames) => (...args) => {
  const action = { type };
  argNames.forEach((arg, index) => {
    action[argNames[index]] = args[index];
  });
  return action;
};

ActionCreator.addBonusCard = makeActionCreator(
  ActionType.ADD_BONUS_CARD,
  "bonusCardState"
);

ActionCreator.addGameRecord = makeActionCreator(
  ActionType.ADD_GAME_RECORD,
  "message"
);

ActionCreator.addOrderCard = makeActionCreator(
  ActionType.ADD_ORDER_CARD,
  "orderCardState"
);

ActionCreator.addPoolCard = makeActionCreator(
  ActionType.ADD_POOL_CARD,
  "cardId"
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

ActionCreator.layFoundation = makeActionCreator(
  ActionType.LAY_FOUNDATION,
  "playerId",
  "structureState"
);

ActionCreator.setCardPool = makeActionCreator(
  ActionType.SET_CARD_POOL,
  "cardPool"
);

ActionCreator.setCurrentInputCallback = makeActionCreatorNilAllowed(
  ActionType.SET_CURRENT_INPUT_CALLBACK,
  "callback"
);

ActionCreator.setCurrentMove = makeActionCreator(
  ActionType.SET_CURRENT_MOVE,
  "moveState"
);

ActionCreator.setCurrentMoves = makeActionCreator(
  ActionType.SET_CURRENT_MOVES,
  "moveStates"
);

ActionCreator.setCurrentPhase = makeActionCreatorNilAllowed(
  ActionType.SET_CURRENT_PHASE,
  "phaseKey"
);

ActionCreator.setCurrentPlayer = makeActionCreatorNilAllowed(
  ActionType.SET_CURRENT_PLAYER,
  "playerId"
);

ActionCreator.setCurrentRound = makeActionCreator(
  ActionType.SET_CURRENT_ROUND,
  "round"
);

ActionCreator.setCurrentStep = makeActionCreatorNilAllowed(
  ActionType.SET_CURRENT_STEP,
  "stepKey"
);

ActionCreator.setDelay = makeActionCreator(ActionType.SET_DELAY, "delay");

ActionCreator.setJackDeck = makeActionCreator(
  ActionType.SET_JACK_DECK,
  "jackDeck"
);

ActionCreator.setLeader = makeActionCreator(ActionType.SET_LEADER, "leaderId");

ActionCreator.setLeadRole = makeActionCreatorNilAllowed(
  ActionType.SET_LEAD_ROLE,
  "leadRoleKey"
);

ActionCreator.setMctsRoot = makeActionCreator(
  ActionType.SET_MCTS_ROOT,
  "mctsRoot"
);

ActionCreator.setOrderDeck = makeActionCreator(
  ActionType.SET_ORDER_DECK,
  "orderDeck"
);

ActionCreator.setOrderFaceup = makeActionCreator(
  ActionType.SET_ORDER_FACEUP,
  "cardId",
  "isFaceup"
);

ActionCreator.setOrderHighlighted = makeActionCreator(
  ActionType.SET_ORDER_HIGHLIGHTED,
  "cardId",
  "isHighlighted"
);

ActionCreator.setOutOfTownSiteDeck = makeActionCreator(
  ActionType.SET_OUT_OF_TOWN_SITE_DECK,
  "siteDeck"
);

ActionCreator.setPlayers = makeActionCreator(ActionType.SET_PLAYERS, "players");

ActionCreator.setPlayerStrategy = makeActionCreator(
  ActionType.SET_PLAYER_STRATEGY,
  "playerId",
  "strategy"
);

ActionCreator.setSiteDeck = makeActionCreator(
  ActionType.SET_SITE_DECK,
  "siteDeck"
);

ActionCreator.setSiteFaceup = makeActionCreator(
  ActionType.SET_SITE_FACEUP,
  "cardId",
  "isFaceup"
);

ActionCreator.setSiteHighlighted = makeActionCreator(
  ActionType.SET_SITE_HIGHLIGHTED,
  "cardId",
  "isHighlighted"
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

ActionCreator.transferCampToJack = makeActionCreator(
  ActionType.TRANSFER_CAMP_TO_JACK,
  "playerId",
  "cardId"
);

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

ActionCreator.transferHandToHand = makeActionCreator(
  ActionType.TRANSFER_HAND_TO_HAND,
  "fromPlayerId",
  "cardId",
  "toPlayerId"
);

ActionCreator.transferHandToStockpile = makeActionCreator(
  ActionType.TRANSFER_HAND_TO_STOCKPILE,
  "fromPlayerId",
  "cardId",
  "toPlayerId"
);

ActionCreator.transferHandToStructure = makeActionCreator(
  ActionType.TRANSFER_HAND_TO_STRUCTURE,
  "playerId",
  "cardId",
  "structureId"
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
  ActionType.TRANSFER_ORDER_TO_POOL
);

ActionCreator.transferPoolToClientele = makeActionCreator(
  ActionType.TRANSFER_POOL_TO_CLIENTELE,
  "playerId",
  "cardId"
);

ActionCreator.transferPoolToStockpile = makeActionCreator(
  ActionType.TRANSFER_POOL_TO_STOCKPILE,
  "playerId",
  "cardId"
);

ActionCreator.transferStockpileToStructure = makeActionCreator(
  ActionType.TRANSFER_STOCKPILE_TO_STRUCTURE,
  "playerId",
  "cardId",
  "structureId"
);

ActionCreator.transferStockpileToVault = makeActionCreator(
  ActionType.TRANSFER_STOCKPILE_TO_VAULT,
  "playerId",
  "cardId"
);

Object.freeze(ActionCreator);

export default ActionCreator;
