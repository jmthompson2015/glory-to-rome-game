import Material from "../artifact/Material.js";
import Role from "../artifact/Role.js";
import Selector from "../state/Selector.js";

import CardsUI from "./CardsUI.js";
import DeckUI from "./DeckUI.js";
import DecksUI from "./DecksUI.js";
import Endpoint from "./Endpoint.js";
import TableauUI from "./TableauUI.js";

const { CollapsiblePane, ReactUtilities: RU } = ReactComponent;

const BACKGROUND = ["bg-maroon", "bg-green", "bg-navy", "bg-olive", "bg-teal"];
const WIDTH = 150;

const createJackDeckCell = (state, resourceBase, width) => {
  const deck = Selector.orderCards(state.jackDeck, state);
  const element = React.createElement(DeckUI, {
    key: `JackDeck`,
    deck,
    resourceBase,
    width,
  });
  const cardsPane = React.createElement(CollapsiblePane, {
    key: `JackDeckPane`,
    element,
    isExpanded: true,
    title: "Jack Deck",
    titleClass: "b bg-light-gray f5 ph1 pt1 tc",
  });

  return RU.createCell(cardsPane, "JackDeckCell", "tc");
};

const createOrderDeckCell = (state, resourceBase, width) => {
  const deck = Selector.orderCards(state.orderDeck, state);
  const element = React.createElement(DeckUI, {
    key: `OrderDeck`,
    deck,
    resourceBase,
    width,
  });
  const cardsPane = React.createElement(CollapsiblePane, {
    key: `OrderDeckPane`,
    element,
    isExpanded: true,
    title: "Order Deck",
    titleClass: "b bg-light-gray f5 ph1 pt1 tc",
  });

  return RU.createCell(cardsPane, "OrderDeckCell", "tc");
};

const createPoolCell = (state, resourceBase, width) => {
  const poolCards = Selector.orderCards(state.cardPool, state);
  const element = React.createElement(CardsUI, {
    key: `CardPool`,
    cardStates: poolCards,
    resourceBase,
    width,
  });
  const cardsPane = React.createElement(CollapsiblePane, {
    key: `CardPoolPane`,
    element,
    isExpanded: true,
    title: "Pool",
    titleClass: "b bg-light-gray f5 ph1 pt1 tc",
  });

  return RU.createCell(cardsPane, "CardPoolCell", "tc");
};

const createSitesCell0 = (
  title,
  siteCards0,
  isFaceup,
  resourceBase,
  width,
  isExpanded = true
) => {
  const reduceFunction = (accum, materialKey) => {
    const deck = R.filter(
      (c) => c.cardType.materialKey === materialKey,
      siteCards0
    );
    accum.push(deck);
    return accum;
  };
  const siteDecks = R.reduce(reduceFunction, [], Material.keys());

  const element = React.createElement(DecksUI, {
    key: `SiteDecks${title}`,
    countFillStyle: "black",
    decks: siteDecks,
    isFaceup,
    resourceBase,
    width,
  });
  const decksPane = React.createElement(CollapsiblePane, {
    key: `SiteDecksPane${title}`,
    element,
    isExpanded,
    title,
    titleClass: "b bg-light-gray f5 ph1 pt1 tc",
  });

  return RU.createCell(decksPane, `SiteCardsCell${title}`, "tc");
};

const createSitesCell = (state, resourceBase) => {
  const siteCards = Selector.siteCards(state.siteDeck, state);

  return createSitesCell0("Sites", siteCards, true, resourceBase, WIDTH);
};

const createOutOfTownSitesCell = (state, resourceBase) => {
  const ootSiteCards = Selector.siteCards(state.outOfTownSiteDeck, state);

  return createSitesCell0(
    "Out of Town Sites",
    ootSiteCards,
    false,
    resourceBase,
    WIDTH,
    false
  );
};

const createTableau = (playerId, resourceBase, className, state) => {
  const isCurrentPlayer = playerId === Selector.currentPlayerId(state);
  const inputCallback = isCurrentPlayer
    ? Selector.currentInputCallback(state)
    : undefined;
  const moveStates = isCurrentPlayer ? Selector.currentMoves(state) : undefined;

  return React.createElement(TableauUI, {
    campCards: Selector.campCards(playerId, state),
    className,
    clienteleCards: Selector.clienteleCards(playerId, state),
    handCards: Selector.handCards(playerId, state),
    influenceCards: Selector.influenceCards(playerId, state),
    inputCallback,
    moveStates,
    player: Selector.player(playerId, state),
    resourceBase,
    role: Role.value(Selector.leadRoleKey(state)),
    stockpileCards: Selector.stockpileCards(playerId, state),
    structures: Selector.structures(
      Selector.structureIds(playerId, state),
      state
    ),
    vaultCards: Selector.vaultCards(playerId, state),
    width: WIDTH,
  });
};

// /////////////////////////////////////////////////////////////////////////////
class GameUI extends React.PureComponent {
  render() {
    const { resourceBase, state } = this.props;
    const reduceFunction = (accum, playerId) => {
      const className = BACKGROUND[playerId - 1];
      const tableau = createTableau(playerId, resourceBase, className, state);
      return { ...accum, [playerId]: tableau };
    };
    const playerIds = Selector.playerIds(state);
    const playerToTableau = R.reduce(reduceFunction, {}, playerIds);

    const orderDeckCell = createOrderDeckCell(state, resourceBase, WIDTH);
    const jackDeckCell = createJackDeckCell(state, resourceBase, WIDTH);
    const poolCell = createPoolCell(state, resourceBase, WIDTH);
    const sitesCell = createSitesCell(state, resourceBase);
    const ootSitesCell = createOutOfTownSitesCell(state, resourceBase);

    const mapFunction = (playerId) =>
      RU.createCell(playerToTableau[playerId], `tableauCell${playerId}`);
    const cells0 = R.map(mapFunction, playerIds);
    const cells = [
      ...cells0,
      orderDeckCell,
      jackDeckCell,
      poolCell,
      sitesCell,
      ootSitesCell,
    ];

    return RU.createFlexboxWrap(cells, "GameUI", "tc");
  }
}

GameUI.propTypes = {
  state: PropTypes.shape().isRequired,

  resourceBase: PropTypes.string,
};

GameUI.defaultProps = {
  resourceBase: Endpoint.NETWORK_RESOURCE,
};

Object.freeze(GameUI);

export default GameUI;
