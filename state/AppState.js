const AppState = {};

AppState.create = ({
  appName = "Glory to Rome App",
  cardPool = [],
  delay = 1000,
  gameRecords = [],
  initiativePlayerId,
  isGameOver = false,
  isVerbose = true,
  jackDeck = [],
  mctsRoot = null,
  orderDeck = [],
  orderDiscard = [],
  siteToDeck = {},
  siteToOutOfTownDeck = {},
  userMessage = null,
  versionKey = "republic",
  winnerId = null,

  round = 0,
  currentPlayerOrder = null,
  currentPhaseKey = null,
  currentPlayerId = null,

  playerToClientele = {},
  playerToHand = {},
  playerToInfluence = {},
  playerToStockpile = {},
  playerToStrategy = {},
  playerToVault = {},

  cardInstances = {},
  playerInstances = {},
} = {}) =>
  Immutable({
    appName,
    cardPool,
    delay,
    gameRecords,
    initiativePlayerId,
    isGameOver,
    isVerbose,
    mctsRoot,
    jackDeck,
    orderDeck,
    orderDiscard,
    siteToDeck,
    siteToOutOfTownDeck,
    userMessage,
    versionKey,
    winnerId,

    round,
    currentPlayerOrder,
    currentPhaseKey,
    currentPlayerId,

    playerToClientele,
    playerToHand,
    playerToInfluence,
    playerToStockpile,
    playerToStrategy,
    playerToVault,

    cardInstances,
    playerInstances,
  });

Object.freeze(AppState);

export default AppState;
