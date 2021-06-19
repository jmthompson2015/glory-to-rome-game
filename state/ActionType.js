const ActionType = {};

ActionType.ADD_BONUS_CARD = "addBonusCard";
ActionType.ADD_GAME_RECORD = "addGameRecord";
ActionType.ADD_ORDER_CARD = "addOrderCard";
ActionType.ADD_POOL_CARD = "addPoolCard";
ActionType.ADD_SITE_CARD = "addSiteCard";
ActionType.ADD_STRUCTURE = "addStructure";
ActionType.ADD_TO_PLAYER_ARRAY = "addToPlayerArray";
ActionType.LAY_FOUNDATION = "layFoundation";
ActionType.SET_CARD_POOL = "setCardPool";
ActionType.SET_CURRENT_INPUT_CALLBACK = "setCurrentInputCallback";
ActionType.SET_CURRENT_MOVE = "setCurrentMove";
ActionType.SET_CURRENT_MOVES = "setCurrentMoves";
ActionType.SET_CURRENT_PHASE = "setCurrentPhase";
ActionType.SET_CURRENT_PLAYER = "setCurrentPlayer";
ActionType.SET_CURRENT_ROUND = "setCurrentRound";
ActionType.SET_CURRENT_STEP = "setCurrentStep";
ActionType.SET_DELAY = "setDelay";
ActionType.SET_JACK_DECK = "setJackDeck";
ActionType.SET_LEAD_ROLE = "setLeadRole";
ActionType.SET_LEADER = "setLeader";
ActionType.SET_MCTS_ROOT = "setMctsRoot";
ActionType.SET_ORDER_DECK = "setOrderDeck";
ActionType.SET_ORDER_FACEUP = "setOrderFaceup";
ActionType.SET_ORDERS_FACEUP = "setOrdersFaceup";
ActionType.SET_ORDER_HIGHLIGHTED = "setOrderHighlighted";
ActionType.SET_OUT_OF_TOWN_SITE_DECK = "setOutOfTownSiteDeck";
ActionType.SET_PLAYERS = "setPlayers";
ActionType.SET_PLAYER_STRATEGY = "setPlayerStrategy";
ActionType.SET_SITE_DECK = "setSiteDeck";
ActionType.SET_SITE_FACEUP = "setSiteFaceup";
ActionType.SET_SITE_HIGHLIGHTED = "setSiteHighlighted";
ActionType.SET_USER_MESSAGE = "setUserMessage";
ActionType.SET_VERBOSE = "setVerbose";
ActionType.SET_VERSION = "setVersion";
ActionType.SET_WINNER = "setWinner";
ActionType.TRANSFER_CAMP_TO_JACK = "transferCampToJack";
ActionType.TRANSFER_CAMP_TO_POOL = "transferCampToPool";
ActionType.TRANSFER_HAND_TO_CAMP = "transferHandToCamp";
ActionType.TRANSFER_HAND_TO_HAND = "transferHandToHand";
ActionType.TRANSFER_HAND_TO_STOCKPILE = "transferHandToStockpile";
ActionType.TRANSFER_HAND_TO_STRUCTURE = "transferHandToStructure";
ActionType.TRANSFER_JACK_TO_HAND = "transferJackToHand";
ActionType.TRANSFER_ORDER_TO_HAND = "transferOrderToHand";
ActionType.TRANSFER_ORDER_TO_POOL = "transferOrderToPool";
ActionType.TRANSFER_POOL_TO_CLIENTELE = "transferPoolToClientele";
ActionType.TRANSFER_POOL_TO_STOCKPILE = "transferPoolToStockpile";
ActionType.TRANSFER_STOCKPILE_TO_STRUCTURE = "transferStockpileToStructure";
ActionType.TRANSFER_STOCKPILE_TO_VAULT = "transferStockpileToVault";

Object.freeze(ActionType);

export default ActionType;
