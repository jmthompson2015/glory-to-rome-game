const AppState = {};

AppState.create = ({
  appName = "Glory to Rome App",
  cardPool = [],
  delay = 1000,
  gameRecords = [],
  isGameOver = false,
  isVerbose = false,
  jackDeck = [],
  leaderId,
  mctsRoot = null,
  orderDeck = [],
  orderDiscard = [],
  siteToDeck = {},
  siteToOutOfTownDeck = {},
  userMessage = null,
  versionKey = "republic",
  winnerId = null,

  currentRound = 0,
  currentPlayerOrder = null,
  currentPhaseKey = null,
  currentPlayerId = null,
  currentStepKey = null,

  playerToCamp = {},
  playerToClientele = {},
  playerToHand = {},
  playerToInfluence = {},
  playerToStockpile = {},
  playerToStrategy = {},
  playerToStructures = {},
  playerToVault = {},

  miscCardInstances = {},
  orderCardInstances = {},
  playerInstances = {},
  siteCardInstances = {},
  structureInstances = {},
} = {}) =>
  Immutable({
    appName,
    cardPool,
    delay,
    gameRecords,
    isGameOver,
    isVerbose,
    jackDeck,
    leaderId,
    mctsRoot,
    orderDeck,
    orderDiscard,
    siteToDeck,
    siteToOutOfTownDeck,
    userMessage,
    versionKey,
    winnerId,

    currentRound,
    currentPlayerOrder,
    currentPhaseKey,
    currentPlayerId,
    currentStepKey,

    playerToCamp,
    playerToClientele,
    playerToHand,
    playerToInfluence,
    playerToStockpile,
    playerToStrategy,
    playerToStructures,
    playerToVault,

    miscCardInstances,
    orderCardInstances,
    playerInstances,
    siteCardInstances,
    structureInstances,
  });

Object.freeze(AppState);

export default AppState;
