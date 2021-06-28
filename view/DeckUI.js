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
    context.font = "32px sans-serif";
    context.fillText(count, 5, y);
    context.restore();
  }
};

// /////////////////////////////////////////////////////////////////////////////
class DeckUI extends React.PureComponent {
  constructor(props) {
    super(props);

    const { width } = this.props;
    this.height = width * 1.4;
  }

  createSrc(card) {
    const { isFaceup, resourceBase, version } = this.props;
    const image =
      OrderCard.image(card, version, isFaceup) ||
      SiteCard.image(card, version, isFaceup) ||
      BonusCard.image(card, version, isFaceup);

    return `${resourceBase}${image}`;
  }

  render() {
    const { countFillStyle, deck, width } = this.props;
    const cardState = R.head(deck);

    if (R.isNil(cardState)) {
      return ReactDOMFactories.span({ key: "DeckCanvas0" }, "");
    }

    let imageSrc;
    let images;

    if (OrderCard.isJack(cardState.cardKey)) {
      const jack1 = OrderCard.value(OrderCard.JACK1);
      const jack2 = OrderCard.value(OrderCard.JACK2);
      const image1 = this.createSrc(jack1);
      const image2 = this.createSrc(jack2);
      images = [image1, image2];
      imageSrc = cardState.cardKey === OrderCard.JACK1 ? image1 : image2;
    } else {
      imageSrc = this.createSrc(cardState.cardType);
      images = [imageSrc];
    }

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
      images,
      isVerbose: false,
      title: `${count}`,
      width,
    });
  }
}

DeckUI.propTypes = {
  deck: PropTypes.arrayOf(PropTypes.shape()).isRequired,

  countFillStyle: PropTypes.string,
  isFaceup: PropTypes.bool,
  resourceBase: PropTypes.string,
  version: PropTypes.string,
  width: PropTypes.number,
};

DeckUI.defaultProps = {
  countFillStyle: "white",
  isFaceup: false,
  resourceBase: Endpoint.NETWORK_RESOURCE,
  version: undefined,
  width: 80,
};

Object.freeze(DeckUI);

export default DeckUI;
