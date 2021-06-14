/* eslint no-console: ["error", { allow: ["error"] }] */

import BonusCard from "../artifact/BonusCard.js";
import OrderCard from "../artifact/OrderCard.js";
import SiteCard from "../artifact/SiteCard.js";

import Endpoint from "./Endpoint.js";

const { LayeredCanvas } = ReactComponent;

const drawFunction1 = (imageSrc, slicing) => (
  context,
  width,
  height,
  imageMap
) => {
  const image = imageMap[imageSrc];

  if (R.isNil(image)) {
    return;
  }

  if (R.isNil(slicing)) {
    context.drawImage(image, 0, 0, width, height);
  } else {
    const sx =
      slicing.type === "right" ? image.naturalWidth * (1.0 - slicing.value) : 0;
    const sy =
      slicing.type === "bottom"
        ? image.naturalHeight * (1.0 - slicing.value)
        : 0;
    const sWidth = ["left", "right"].includes(slicing.type)
      ? image.naturalWidth * slicing.value
      : image.naturalWidth;
    const sHeight = ["bottom", "top"].includes(slicing.type)
      ? image.naturalHeight * slicing.value
      : image.naturalHeight;

    context.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, width, height);
  }
};
const drawFunction2 = (context0, width, height) => {
  // Highlight
  const context = context0;
  context.save();
  context.strokeStyle = "blue";
  context.lineWidth = 5;
  context.lineJoin = "round";
  context.strokeRect(0, 0, width, height);
  context.restore();
};

// /////////////////////////////////////////////////////////////////////////////
class CardUI extends React.PureComponent {
  constructor(props) {
    super(props);

    const { width } = this.props;
    this.state = { width };

    this.handleOnClick = this.handleOnClickFunction.bind(this);
  }

  handleOnClickFunction() {
    const { magnification, width: width0 } = this.props;
    const { width: width1 } = this.state;
    const newWidth = width0 === width1 ? magnification * width0 : width0;
    this.setState({ width: newWidth });
  }

  height() {
    const { slicing } = this.props;
    const { width } = this.state;
    const height = width * 1.4;
    let dHeight;

    if (!R.isNil(slicing) && ["bottom", "top"].includes(slicing.type)) {
      dHeight = height * slicing.value;
    }

    return dHeight || height;
  }

  width() {
    const { slicing } = this.props;
    const { width } = this.state;
    let dWidth;

    if (!R.isNil(slicing) && ["left", "right"].includes(slicing.type)) {
      dWidth = width * slicing.value;
    }

    return dWidth || width;
  }

  createSrc() {
    const { cardState, resourceBase, version } = this.props;
    const image =
      OrderCard.image(cardState.cardType, version, cardState.isFaceup) ||
      SiteCard.image(cardState.cardType, version, cardState.isFaceup) ||
      BonusCard.image(cardState.cardType, version, cardState.isFaceup);

    return `${resourceBase}${image}`;
  }

  render() {
    const { cardState, customKey, slicing } = this.props;
    const imageSrc = this.createSrc(cardState);
    const drawLayerFunctions = cardState.isHighlighted
      ? [drawFunction1(imageSrc, slicing), drawFunction2]
      : [drawFunction1(imageSrc, slicing)];

    return React.createElement(LayeredCanvas, {
      drawLayerFunctions,
      customKey,
      height: this.height(),
      images: [imageSrc],
      onClick: this.handleOnClick,
      title: `${cardState.cardType.name}`,
      width: this.width(),
    });
  }
}

CardUI.propTypes = {
  cardState: PropTypes.shape().isRequired,

  customKey: PropTypes.string,
  magnification: PropTypes.number,
  resourceBase: PropTypes.string,
  slicing: PropTypes.shape({
    type: PropTypes.oneOf(["bottom", "left", "right", "top"]).isRequired,
    value: PropTypes.number.isRequired,
  }),
  version: PropTypes.string,
  width: PropTypes.number,
};

CardUI.defaultProps = {
  customKey: "CardUI",
  magnification: 3,
  resourceBase: Endpoint.NETWORK_RESOURCE,
  slicing: undefined,
  version: undefined,
  width: 80,
};

export default CardUI;
