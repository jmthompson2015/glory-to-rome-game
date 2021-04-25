const ActionType = {};

ActionType.ADD_CARD = "addCard";
ActionType.ADD_GAME_RECORD = "addGameRecord";
ActionType.ADD_STRUCTURE = "addStructure";
ActionType.ADD_TO_PLAYER_ARRAY = "addToPlayerArray";
ActionType.SET_CURRENT_PHASE = "setCurrentPhase";
ActionType.SET_CURRENT_PLAYER = "setCurrentPlayer";
ActionType.SET_CURRENT_PLAYER_ORDER = "setCurrentPlayerOrder";
ActionType.SET_CURRENT_ROUND = "setCurrentRound";
ActionType.SET_CURRENT_STEP = "setCurrentStep";
ActionType.SET_DELAY = "setDelay";
ActionType.SET_INITIATIVE_PLAYER = "setInitiativePlayer";
ActionType.SET_JACK_DECK = "setJackDeck";
ActionType.SET_MCTS_ROOT = "setMctsRoot";
ActionType.SET_ORDER_DECK = "setOrderDeck";
ActionType.SET_PLAYERS = "setPlayers";
ActionType.SET_PLAYER_STRATEGY = "setPlayerStrategy";
ActionType.SET_SITE_TO_DECK = "setSiteToDeck";
ActionType.SET_SITE_TO_OUT_OF_TOWN_DECK = "setSiteToOutOfTownDeck";
ActionType.SET_USER_MESSAGE = "setUserMessage";
ActionType.SET_VERBOSE = "setVerbose";
ActionType.SET_VERSION = "setVersion";
ActionType.SET_WINNER = "setWinner";
ActionType.TRANSFER_CAMP_TO_POOL = "transferCampToPool";
ActionType.TRANSFER_HAND_TO_CAMP = "transferHandToCamp";
ActionType.TRANSFER_HAND_TO_CLIENTELE = "transferHandToClientele";
ActionType.TRANSFER_HAND_TO_INFLUENCE = "transferHandToInfluence";
ActionType.TRANSFER_HAND_TO_STOCKPILE = "transferHandToStockpile";
ActionType.TRANSFER_HAND_TO_VAULT = "transferHandToVault";
ActionType.TRANSFER_JACK_TO_HAND = "transferJackToHand";
ActionType.TRANSFER_ORDER_TO_HAND = "transferOrderToHand";
ActionType.TRANSFER_ORDER_TO_POOL = "transferOrderToPool";
ActionType.TRANSFER_POOL_TO_HAND = "transferPoolToHand";

Object.freeze(ActionType);

export default ActionType;
