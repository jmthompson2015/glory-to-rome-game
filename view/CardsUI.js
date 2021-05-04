import CardImage from "./CardImage.js";
import Endpoint from "./Endpoint.js";

const { ReactUtilities: RU } = ReactComponent;

class CardsUI extends React.PureComponent {
  render() {
    const { cardStates, resourceBase, slicing, width } = this.props;

    const mapFunction = (cardState) => {
      const element = React.createElement(CardImage, {
        key: `CardImage${cardState.id}`,
        cardState,
        resourceBase,
        slicing,
        width,
      });

      return RU.createCell(
        element,
        `cardCell${cardState.id}`,
        "alignTop v-top"
      );
    };

    const cardCells = R.map(mapFunction, cardStates);
    const row = RU.createRow(cardCells);

    return RU.createTable(row, "cardsUITable", "center");
  }
}

CardsUI.propTypes = {
  cardStates: PropTypes.arrayOf(PropTypes.shape()).isRequired,

  resourceBase: PropTypes.string,
  slicing: PropTypes.shape(),
  width: PropTypes.number,
};

CardsUI.defaultProps = {
  resourceBase: Endpoint.NETWORK_RESOURCE,
  slicing: undefined,
  width: 200,
};

Object.freeze(CardsUI);

export default CardsUI;
