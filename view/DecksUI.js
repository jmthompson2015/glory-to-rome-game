import DeckUI from "./DeckUI.js";
import Endpoint from "./Endpoint.js";

const { ReactUtilities: RU } = ReactComponent;

class DecksUI extends React.PureComponent {
  render() {
    const { countFillStyle, decks, isFaceup, resourceBase, width } = this.props;

    const mapFunction = (deck) => {
      const element = React.createElement(DeckUI, {
        key: `DeckUI${deck.id}`,
        countFillStyle,
        deck,
        isFaceup,
        resourceBase,
        width,
      });
      const topCard = R.head(deck);
      const key = `deckCell${deck.length}${topCard.id}`;

      return RU.createCell(element, key, "alignTop ph1 v-top");
    };

    const deckCells = R.map(mapFunction, decks);
    const row = RU.createRow(deckCells);

    return RU.createTable(row, "decksUITable", "center");
  }
}

DecksUI.propTypes = {
  decks: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape())).isRequired,

  countFillStyle: PropTypes.string,
  isFaceup: PropTypes.bool,
  resourceBase: PropTypes.string,
  width: PropTypes.number,
};

DecksUI.defaultProps = {
  countFillStyle: undefined,
  isFaceup: false,
  resourceBase: Endpoint.NETWORK_RESOURCE,
  width: 80,
};

Object.freeze(DecksUI);

export default DecksUI;
