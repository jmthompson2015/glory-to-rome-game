import CardsUI from "./CardsUI.js";
import Endpoint from "./Endpoint.js";

const { CollapsiblePane, ReactUtilities: RU } = ReactComponent;

const createSlicing = (type) => ({ type, value: 0.2 });

const createCell = (
  title,
  cardStates,
  playerId,
  resourceBase,
  width,
  slicing
) => {
  const element = React.createElement(CardsUI, {
    cardStates,
    customKey: `CardsUI${title}-${playerId}`,
    resourceBase,
    slicing,
    width,
  });

  const cardsPane = React.createElement(CollapsiblePane, {
    key: `CardsPane${title}`,
    element,
    isExpanded: true,
    title,
    titleClass: "b bg-gray f5 ph1 pt1 tc",
  });

  return RU.createCell(cardsPane, `CardsCell${title}`, "tc");
};

class TableauUI extends React.PureComponent {
  render() {
    const {
      campCards,
      className,
      clienteleCards,
      handCards,
      influenceCards,
      player,
      resourceBase,
      stockpileCards,
      structures,
      vaultCards,
      width,
    } = this.props;

    const campCell = createCell(
      "Camp",
      campCards,
      player.id,
      resourceBase,
      width
    );
    const clienteleCell = createCell(
      "Clientele",
      clienteleCards,
      player.id,
      resourceBase,
      width,
      createSlicing("left")
    );
    const handCell = createCell(
      "Hand",
      handCards,
      player.id,
      resourceBase,
      width
    );
    const influenceCell = createCell(
      "Influence",
      influenceCards,
      player.id,
      resourceBase,
      width,
      createSlicing("top")
    );
    const stockpileCell = createCell(
      "Stockpile",
      stockpileCards,
      player.id,
      resourceBase,
      width,
      createSlicing("bottom")
    );
    const structureCell = createCell(
      "Structure",
      structures,
      player.id,
      resourceBase,
      width
    );
    const vaultCell = createCell(
      "Vault",
      vaultCards,
      player.id,
      resourceBase,
      width,
      createSlicing("right")
    );

    const middleCell = RU.createCell(
      RU.createTable(RU.createRow([clienteleCell, campCell, vaultCell])),
      "middleCell",
      "tc"
    );

    const rows = [
      RU.createRow(influenceCell, "influenceRow"),
      RU.createRow(middleCell, "middleRow"),
      RU.createRow(stockpileCell, "stockpileRow"),
      RU.createRow(handCell, "handRow"),
      RU.createRow(structureCell, "structureRow"),
    ];

    const tableauTable = RU.createTable(rows, `TableauTable${player.id}`);

    return React.createElement(CollapsiblePane, {
      key: `TableauPane${player.id}`,
      className,
      element: tableauTable,
      isExpanded: true,
      title: player.name,
      titleClass: "b bg-light-gray f5 ph1 pt1 tc",
    });
  }
}

TableauUI.propTypes = {
  player: PropTypes.shape().isRequired,

  campCards: PropTypes.arrayOf(PropTypes.shape()),
  className: PropTypes.string,
  clienteleCards: PropTypes.arrayOf(PropTypes.shape()),
  handCards: PropTypes.arrayOf(PropTypes.shape()),
  influenceCards: PropTypes.arrayOf(PropTypes.shape()),
  resourceBase: PropTypes.string,
  stockpileCards: PropTypes.arrayOf(PropTypes.shape()),
  structures: PropTypes.arrayOf(PropTypes.shape()),
  vaultCards: PropTypes.arrayOf(PropTypes.shape()),
  width: PropTypes.number,
};

TableauUI.defaultProps = {
  campCards: [],
  className: undefined,
  clienteleCards: [],
  handCards: [],
  influenceCards: [],
  resourceBase: Endpoint.NETWORK_RESOURCE,
  stockpileCards: [],
  structures: [],
  vaultCards: [],
  width: 200,
};

Object.freeze(TableauUI);

export default TableauUI;
