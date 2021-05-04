/* eslint no-console: ["error", { allow: ["error"] }] */

import BonusCard from "../artifact/BonusCard.js";
import OrderCard from "../artifact/OrderCard.js";
import SiteCard from "../artifact/SiteCard.js";

class CardImage extends React.Component {
  componentDidMount() {
    this.paint();
  }

  componentDidUpdate() {
    this.paint();
  }

  canvasId() {
    const { card } = this.props;

    return `CardImageCanvas${card.id}${card.cardKey}`;
  }

  createSrc() {
    const { card, resourceBase, version } = this.props;
    const image =
      OrderCard.image(card.cardType, version, card.isFaceup) ||
      SiteCard.image(card.cardType, version, card.isFaceup) ||
      BonusCard.image(card.cardType, version, card.isFaceup);

    return resourceBase + image;
  }

  height() {
    const { width } = this.props;

    return width * 1.4;
  }

  logLoadFailure(src) {
    this.height(); // dummy
    let lastIndex = src.lastIndexOf("/");
    lastIndex = src.lastIndexOf("/", lastIndex - 1);
    const filename = src.substring(lastIndex + 1);
    console.error(`HeroCardImage failed to load ${filename}`);
  }

  paint() {
    const { slicing, width } = this.props;
    const canvas = document.getElementById(this.canvasId());
    const context = canvas.getContext("2d");
    const height = this.height();
    const src = this.createSrc();
    const image = new Image();
    image.onload = () => {
      if (slicing === undefined) {
        context.drawImage(image, 0, 0, width, height);
      } else if (slicing.type === "bottom") {
        const sy = image.naturalHeight * (1.0 - slicing.value);
        const sWidth = image.naturalWidth;
        const sHeight = image.naturalHeight * slicing.value;
        const dWidth = width;
        const dHeight = height * slicing.value;
        context.drawImage(image, 0, sy, sWidth, sHeight, 0, 0, dWidth, dHeight);
      } else if (slicing.type === "left") {
        const sWidth = image.naturalWidth * slicing.value;
        const sHeight = image.naturalHeight;
        const dWidth = width * slicing.value;
        const dHeight = height;
        context.drawImage(image, 0, 0, sWidth, sHeight, 0, 0, dWidth, dHeight);
      } else if (slicing.type === "right") {
        const sx = image.naturalWidth * (1.0 - slicing.value);
        const sWidth = image.naturalWidth * slicing.value;
        const sHeight = image.naturalHeight;
        const dWidth = width * slicing.value;
        const dHeight = height;
        context.drawImage(image, sx, 0, sWidth, sHeight, 0, 0, dWidth, dHeight);
      } else if (slicing.type === "top") {
        const sWidth = image.naturalWidth;
        const sHeight = image.naturalHeight * slicing.value;
        const dWidth = width;
        const dHeight = height * slicing.value;
        context.drawImage(image, 0, 0, sWidth, sHeight, 0, 0, dWidth, dHeight);
      }
    };
    image.onerror = this.logLoadFailure;
    image.src = src;
  }

  render() {
    const { card, slicing, width } = this.props;
    let canvasHeight;
    let canvasWidth;

    if (slicing === undefined) {
      canvasWidth = width;
      canvasHeight = this.height();
    } else if (["bottom", "top"].includes(slicing.type)) {
      canvasWidth = width;
      canvasHeight = this.height() * slicing.value;
    } else if (["left", "right"].includes(slicing.type)) {
      canvasWidth = width * slicing.value;
      canvasHeight = this.height();
    }
    const canvasId = this.canvasId();

    return ReactDOMFactories.canvas({
      key: canvasId,
      height: canvasHeight,
      id: canvasId,
      title: card.name,
      width: canvasWidth,
    });
  }
}

CardImage.propTypes = {
  card: PropTypes.shape().isRequired,
  resourceBase: PropTypes.string.isRequired,

  slicing: PropTypes.shape(),
  version: PropTypes.string,
  width: PropTypes.number,
};

CardImage.defaultProps = {
  slicing: undefined,
  version: undefined,
  width: 200,
};

export default CardImage;
