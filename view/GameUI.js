import Selector from "../state/Selector.js";

import CardsUI from "./CardsUI.js";
import Endpoint from "./Endpoint.js";
import TableauUI from "./TableauUI.js";

const { CollapsiblePane, ReactUtilities: RU } = ReactComponent;

const BACKGROUND = ["bg-maroon", "bg-green", "bg-navy", "bg-olive", "bg-teal"];
const WIDTH = 150;

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

const createSitesCell0 = (title, siteCards0, isFaceup, resourceBase, width) => {
  const reduceFunction = (accum, siteCard) => {
    const oldSites = accum[siteCard.cardKey] || [];
    const newSites = [...oldSites, siteCard];
    return { ...accum, [siteCard.cardKey]: newSites };
  };
  const siteMap = R.reduce(reduceFunction, {}, siteCards0);
  const mapFunction = (siteKey) => R.head(siteMap[siteKey]);
  const siteCards = R.map(mapFunction, Object.keys(siteMap));
  const element = React.createElement(CardsUI, {
    key: `SiteCards${title}`,
    cardStates: siteCards,
    isFaceup,
    resourceBase,
    width,
  });
  const cardsPane = React.createElement(CollapsiblePane, {
    key: `SiteCardsPane${title}`,
    element,
    isExpanded: true,
    title,
    titleClass: "b bg-light-gray f5 ph1 pt1 tc",
  });

  return RU.createCell(cardsPane, `SiteCardsCell${title}`, "tc");
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
    WIDTH
  );
};

const createTableau = (playerId, resourceBase, className, state) =>
  React.createElement(TableauUI, {
    campCards: Selector.campCards(playerId, state),
    className,
    clienteleCards: Selector.clienteleCards(playerId, state),
    handCards: Selector.handCards(playerId, state),
    influenceCards: Selector.influenceCards(playerId, state),
    player: Selector.player(playerId, state),
    resourceBase,
    stockpileCards: Selector.stockpileCards(playerId, state),
    structures: Selector.structures(
      Selector.structureIds(playerId, state),
      state
    ),
    vaultCards: Selector.vaultCards(playerId, state),
    width: WIDTH,
  });

class GameUI extends React.PureComponent {
  render() {
    const { resourceBase, state } = this.props;

    const reduceFunction = (accum, playerId) => {
      const className = BACKGROUND[playerId - 1];
      const tableau = createTableau(playerId, resourceBase, className, state);
      return { ...accum, [playerId]: tableau };
    };
    const playerIds = Object.keys(state.playerInstances);
    const playerToTableau = R.reduce(reduceFunction, {}, playerIds);
    const poolCell = createPoolCell(state, resourceBase, WIDTH);
    const sitesCell = createSitesCell(state, resourceBase);
    const ootSitesCell = createOutOfTownSitesCell(state, resourceBase);
    const mapFunction = (playerId) =>
      RU.createCell(playerToTableau[playerId], `tableauCell${playerId}`);
    const cells0 = R.map(mapFunction, playerIds);
    const cells = [...cells0, poolCell, sitesCell, ootSitesCell];

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
