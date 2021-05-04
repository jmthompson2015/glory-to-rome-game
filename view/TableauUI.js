import CardsUI from "./CardsUI.js";
import Endpoint from "./Endpoint.js";

const { CollapsiblePane, ReactUtilities: RU } = ReactComponent;

const createCell = (title, cards, resourceBase, width, slicing, isFaceUp) => {
  const element = React.createElement(CardsUI, {
    key: `CardsUI${title}`,
    cards,
    resourceBase,
    isFaceUp,
    slicing,
    width,
  });

  const cardsPane = React.createElement(CollapsiblePane, {
    key: `CardsPane${title}`,
    element,
    isExpanded: true,
    title,
  });

  return RU.createCell(cardsPane, `CardsCell${title}`);
};

class TableauUI extends React.PureComponent {
  render() {
    const {
      campCards,
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

    const campCell = createCell("Camp", campCards, resourceBase, width);
    const clienteleCell = createCell(
      "Clientele",
      clienteleCards,
      resourceBase,
      width,
      { type: "left", value: 0.2 }
    );
    const handCell = createCell("Hand", handCards, resourceBase, width);
    const influenceCell = createCell(
      "Influence",
      influenceCards,
      resourceBase,
      width,
      { type: "top", value: 0.2 }
    );
    const stockpileCell = createCell(
      "Stockpile",
      stockpileCards,
      resourceBase,
      width,
      { type: "bottom", value: 0.2 }
    );
    const structureCell = createCell(
      "Structure",
      structures,
      resourceBase,
      width
    );
    const vaultCell = createCell(
      "Vault",
      vaultCards,
      resourceBase,
      width,
      {
        type: "right",
        value: 0.2,
      },
      false
    );

    const middleCell = RU.createCell(
      RU.createTable(RU.createRow([clienteleCell, campCell, vaultCell])),
      "middleCell"
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
      element: tableauTable,
      isExpanded: true,
      title: player.name,
    });
  }
}

TableauUI.propTypes = {
  player: PropTypes.shape().isRequired,

  campCards: PropTypes.arrayOf(PropTypes.shape()),
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
