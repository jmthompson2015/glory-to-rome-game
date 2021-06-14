import CardUI from "./CardUI.js";
import Endpoint from "./Endpoint.js";

const { ReactUtilities: RU } = ReactComponent;

const createIdSuffix = (card) =>
  `${card.id}-${card.cardKey}-${card.isFaceup}-${card.isHighlighted}`;

class CardsUI extends React.PureComponent {
  createId(cardState) {
    const { customKey } = this.props;

    return `${customKey}-${createIdSuffix(cardState)}`;
  }

  render() {
    const { cardStates, resourceBase, slicing, width } = this.props;

    const mapFunction = (cardState) => {
      const customKey = this.createId(cardState);
      const element = React.createElement(CardUI, {
        cardState,
        customKey,
        resourceBase,
        slicing,
        width,
      });

      return RU.createCell(
        element,
        `cardCell-${createIdSuffix(cardState)}`,
        "alignTop ph1 v-top"
      );
    };

    const cardCells = R.map(mapFunction, cardStates);
    const row = RU.createRow(cardCells);

    return RU.createTable(row, "cardsUITable", "center");
  }
}

CardsUI.propTypes = {
  cardStates: PropTypes.arrayOf(PropTypes.shape()).isRequired,

  customKey: PropTypes.string,
  resourceBase: PropTypes.string,
  slicing: PropTypes.shape(),
  width: PropTypes.number,
};

CardsUI.defaultProps = {
  customKey: "CardsUI",
  resourceBase: Endpoint.NETWORK_RESOURCE,
  slicing: undefined,
  width: 80,
};

Object.freeze(CardsUI);

export default CardsUI;
