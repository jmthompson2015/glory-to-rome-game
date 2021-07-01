import Sorter from "../state/Sorter.js";

import CardsUI from "./CardsUI.js";
import Endpoint from "./Endpoint.js";

const { CollapsiblePane, ReactUtilities: RU } = ReactComponent;

const TITLE_CLASS = "b bg-gray f5 ph1 pt1 tc v-mid";

const createSlicing = (type) => ({ type, value: 0.2 });

const createCell = ({
  cardStates,
  isFaceup,
  playerId,
  resourceBase,
  slicing,
  sorter,
  title,
  width,
}) => {
  const element = React.createElement(CardsUI, {
    cardStates,
    customKey: `CampUI-${playerId}-${title}`,
    isFaceup,
    resourceBase,
    slicing,
    sorter,
    width,
  });

  const cardsPane = React.createElement(CollapsiblePane, {
    key: `CardsPane${title}`,
    className: "bg-light-gray center",
    element,
    isExpanded: true,
    title,
    titleClass: TITLE_CLASS,
  });

  return RU.createCell(cardsPane, `CardsCell${title}`, "ph1 pt1");
};

class CampUI extends React.PureComponent {
  render() {
    const {
      className,
      clienteleCards,
      influenceCards,
      isLeader,
      leadCards,
      player,
      resourceBase,
      stockpileCards,
      vaultCards,
      width,
    } = this.props;
    const inputProps0 = { playerId: player.id, resourceBase, width };

    const campCell = createCell({
      ...inputProps0,
      cardStates: leadCards,
      isFaceup: true,
      title: isLeader ? "Lead" : "Follow",
    });
    const clienteleCell = createCell({
      ...inputProps0,
      cardStates: clienteleCards,
      isFaceup: true,
      title: "Clientele",
      sorter: Sorter.Order.roleNameSort,
      slicing: createSlicing("left"),
    });
    const influenceCell = createCell({
      ...inputProps0,
      cardStates: influenceCards,
      isFaceup: true,
      slicing: createSlicing("top"),
      sorter: Sorter.Site.valueMaterialSort,
      title: "Influence",
    });
    const stockpileCell = createCell({
      ...inputProps0,
      cardStates: stockpileCards,
      isFaceup: true,
      slicing: createSlicing("bottom"),
      sorter: Sorter.Order.valueMaterialSort,
      title: "Stockpile",
    });
    const vaultCell = createCell({
      ...inputProps0,
      cardStates: vaultCards,
      slicing: createSlicing("right"),
      title: "Vault",
    });

    const middleRow = RU.createRow([clienteleCell, campCell, vaultCell]);
    const middleCell = RU.createCell(RU.createTable(middleRow), "middleCell");

    const rows = [
      RU.createRow(influenceCell, "influenceRow"),
      RU.createRow(middleCell, "middleRow"),
      RU.createRow(stockpileCell, "stockpileRow"),
    ];

    return RU.createTable(rows, `CampUI-${player.id}`, className);
  }
}

CampUI.propTypes = {
  player: PropTypes.shape().isRequired,

  clienteleCards: PropTypes.arrayOf(PropTypes.shape()),
  influenceCards: PropTypes.arrayOf(PropTypes.shape()),
  leadCards: PropTypes.arrayOf(PropTypes.shape()),
  stockpileCards: PropTypes.arrayOf(PropTypes.shape()),
  vaultCards: PropTypes.arrayOf(PropTypes.shape()),

  className: PropTypes.string,
  isLeader: PropTypes.bool,
  resourceBase: PropTypes.string,
  width: PropTypes.number,
};

CampUI.defaultProps = {
  clienteleCards: [],
  influenceCards: [],
  leadCards: [],
  stockpileCards: [],
  vaultCards: [],

  className: "tc v-mid",
  isLeader: false,
  resourceBase: Endpoint.NETWORK_RESOURCE,
  width: 80,
};

Object.freeze(CampUI);

export default CampUI;
