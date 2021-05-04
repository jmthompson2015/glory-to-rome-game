import BonusCard from "../artifact/BonusCard.js";
import OrderCard from "../artifact/OrderCard.js";
import SiteCard from "../artifact/SiteCard.js";

import Endpoint from "./Endpoint.js";

const { LayeredCanvas } = ReactComponent;

const drawFunction1 = (imageSrc) => (context, width, height, imageMap) => {
  const image = imageMap[imageSrc];

  if (!R.isNil(image)) {
    context.drawImage(image, 0, 0, width, height);
  }
};
const drawFunction2 = (count, fillStyle) => (context0, width, height) => {
  if (count > 1) {
    const context = context0;
    context.save();
    const y = height * 0.95;
    context.fillStyle = fillStyle;
    context.font = "48px sans-serif";
    context.fillText(count, 5, y);
    context.restore();
  }
};

class DeckUI extends React.PureComponent {
  constructor(props) {
    super(props);

    const { width } = this.props;
    this.height = width * 1.4;
  }

  createSrc(cardState) {
    const { resourceBase, version } = this.props;
    const image =
      OrderCard.image(cardState.cardType, version, cardState.isFaceup) ||
      SiteCard.image(cardState.cardType, version, cardState.isFaceup) ||
      BonusCard.image(cardState.cardType, version, cardState.isFaceup);

    return `${resourceBase}${image}`;
  }

  render() {
    const { countFillStyle, deck, width } = this.props;
    const cardState = R.head(deck);
    const imageSrc = this.createSrc(cardState);
    const count = deck.length;
    const drawLayerFunctions = [
      drawFunction1(imageSrc),
      drawFunction2(count, countFillStyle),
    ];
    const key = `DeckCanvas${cardState.id}${cardState.cardKey}${count}`;

    return React.createElement(LayeredCanvas, {
      drawLayerFunctions,
      customKey: key,
      height: this.height,
      images: [imageSrc],
      isVerbose: false,
      title: `${count}`,
      width,
    });
  }
}

DeckUI.propTypes = {
  deck: PropTypes.arrayOf(PropTypes.shape()).isRequired,

  countFillStyle: PropTypes.string,
  resourceBase: PropTypes.string,
  version: PropTypes.string,
  width: PropTypes.number,
};

DeckUI.defaultProps = {
  countFillStyle: "white",
  resourceBase: Endpoint.NETWORK_RESOURCE,
  version: undefined,
  width: 200,
};

Object.freeze(DeckUI);

export default DeckUI;
