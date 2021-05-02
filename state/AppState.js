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
  leadRoleKey,
  mctsRoot = null,
  orderDeck = [],
  orderDiscard = [],
  outOfTownSiteDeck = [],
  siteDeck = [],
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

  bonusCardInstances = {},
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
    leadRoleKey,
    mctsRoot,
    orderDeck,
    orderDiscard,
    outOfTownSiteDeck,
    siteDeck,
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

    bonusCardInstances,
    orderCardInstances,
    playerInstances,
    siteCardInstances,
    structureInstances,
  });

Object.freeze(AppState);

export default AppState;
