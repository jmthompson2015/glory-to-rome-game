/* eslint no-console: ["error", { allow: ["error"] }] */

import BonusCard from "../artifact/BonusCard.js";
import OrderCard from "../artifact/OrderCard.js";
import SiteCard from "../artifact/SiteCard.js";

const logLoadFailure = (src) => {
  let lastIndex = src.lastIndexOf("/");
  lastIndex = src.lastIndexOf("/", lastIndex - 1);
  const filename = src.substring(lastIndex + 1);
  console.error(`HeroCardImage failed to load ${filename}`);
};

class CardImage extends React.PureComponent {
  constructor(props) {
    super(props);

    const { width } = this.props;
    this.height = width * 1.4;
  }

  componentDidMount() {
    this.paint();
  }

  componentDidUpdate() {
    this.paint();
  }

  canvasId() {
    const { cardState } = this.props;

    return `CardImageCanvas${cardState.id}${cardState.cardKey}`;
  }

  createSrc() {
    const { cardState, resourceBase, version } = this.props;
    const image =
      OrderCard.image(cardState.cardType, version, cardState.isFaceup) ||
      SiteCard.image(cardState.cardType, version, cardState.isFaceup) ||
      BonusCard.image(cardState.cardType, version, cardState.isFaceup);

    return `${resourceBase}${image}`;
  }

  paint() {
    const { slicing, width } = this.props;
    const canvas = document.getElementById(this.canvasId());
    const context = canvas.getContext("2d");
    const src = this.createSrc();
    const image = new Image();
    image.onload = () => {
      if (R.isNil(slicing)) {
        context.drawImage(image, 0, 0, width, this.height);
      } else {
        let sx = 0;
        let sy = 0;
        let sWidth = image.naturalWidth;
        let sHeight = image.naturalHeight;
        let dWidth = width;
        let dHeight = this.height;

        if (slicing.type === "bottom") {
          sy = image.naturalHeight * (1.0 - slicing.value);
          sHeight = image.naturalHeight * slicing.value;
          dHeight = this.height * slicing.value;
        } else if (slicing.type === "left") {
          sWidth = image.naturalWidth * slicing.value;
          dWidth = width * slicing.value;
        } else if (slicing.type === "right") {
          sx = image.naturalWidth * (1.0 - slicing.value);
          sWidth = image.naturalWidth * slicing.value;
          dWidth = width * slicing.value;
        } else if (slicing.type === "top") {
          sHeight = image.naturalHeight * slicing.value;
          dHeight = this.height * slicing.value;
        }

        context.drawImage(
          image,
          sx,
          sy,
          sWidth,
          sHeight,
          0,
          0,
          dWidth,
          dHeight
        );
      }
    };
    image.onerror = logLoadFailure;
    image.src = src;
  }

  render() {
    const { cardState, slicing, width } = this.props;
    let canvasWidth = width;
    let canvasHeight = this.height;

    if (!R.isNil(slicing)) {
      if (["bottom", "top"].includes(slicing.type)) {
        canvasHeight = this.height * slicing.value;
      } else if (["left", "right"].includes(slicing.type)) {
        canvasWidth = width * slicing.value;
      }
    }
    const canvasId = this.canvasId();

    return ReactDOMFactories.canvas({
      key: canvasId,
      id: canvasId,
      height: canvasHeight,
      title: cardState.name,
      width: canvasWidth,
    });
  }
}

CardImage.propTypes = {
  cardState: PropTypes.shape().isRequired,
  resourceBase: PropTypes.string.isRequired,

  slicing: PropTypes.shape({
    type: PropTypes.oneOf(["bottom", "left", "right", "top"]).isRequired,
    value: PropTypes.number.isRequired,
  }),
  version: PropTypes.string,
  width: PropTypes.number,
};

CardImage.defaultProps = {
  slicing: undefined,
  version: undefined,
  width: 200,
};

export default CardImage;
