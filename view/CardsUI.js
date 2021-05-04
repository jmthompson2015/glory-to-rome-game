import CardImage from "./CardImage.js";
import Endpoint from "./Endpoint.js";

const { ReactUtilities: RU } = ReactComponent;

class CardsUI extends React.PureComponent {
  render() {
    const { cards, isFaceUp, resourceBase, slicing, width } = this.props;

    const mapFunction = (card) => {
      const element = React.createElement(CardImage, {
        key: `CardImage${card.id}`,
        card,
        isFaceUp,
        resourceBase,
        slicing,
        width,
      });

      return RU.createCell(element, `cardCell${card.id}`, "alignTop v-top");
    };

    const cardCells = R.map(mapFunction, cards);
    const row = RU.createRow(cardCells);

    return RU.createTable(row, "cardsUITable", "center");
  }
}

CardsUI.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape()).isRequired,

  isFaceUp: PropTypes.bool,
  resourceBase: PropTypes.string,
  slicing: PropTypes.shape(),
  width: PropTypes.number,
};

CardsUI.defaultProps = {
  isFaceUp: true,
  resourceBase: Endpoint.NETWORK_RESOURCE,
  slicing: undefined,
  width: 200,
};

Object.freeze(CardsUI);

export default CardsUI;