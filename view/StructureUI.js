/* eslint no-console: ["error", { allow: ["error"] }] */

import IV from "../utility/InputValidator.js";

import OrderCard from "../artifact/OrderCard.js";
import SiteCard from "../artifact/SiteCard.js";

import Endpoint from "./Endpoint.js";

const { LayeredCanvas } = ReactComponent;

const HEIGHT_RATIO = 1.4;

const drawFunction1 = (imageSrc, slicing, hOffset) => (
  context,
  width,
  height,
  imageMap
) => {
  const image = imageMap[imageSrc];

  if (R.isNil(image)) {
    return;
  }

  const sy = image.naturalHeight * (1.0 - slicing);
  const sWidth = image.naturalWidth;
  const sHeight = image.naturalHeight * slicing;
  const height2 = width * HEIGHT_RATIO * slicing;

  context.drawImage(image, 0, sy, sWidth, sHeight, 0, hOffset, width, height2);
};

const drawFunction2 = (imageSrc) => (context, width, height, imageMap) => {
  const image = imageMap[imageSrc];

  if (R.isNil(image)) {
    return;
  }

  context.drawImage(image, 0, 0, width, width * HEIGHT_RATIO);
};

const forEachIndexed = R.addIndex(R.forEach);

// /////////////////////////////////////////////////////////////////////////////
class StructureUI extends React.PureComponent {
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
    const { slicing, structureState } = this.props;
    const { width } = this.state;
    const height0 = width * HEIGHT_RATIO;
    let answer = height0; // foundation

    if (!R.isNil(structureState.siteId)) {
      answer += height0 * slicing; // site
    }

    answer += height0 * slicing * structureState.materialIds.length;

    return answer;
  }

  createFoundationSrc() {
    const { structureState, resourceBase, version } = this.props;
    const image = OrderCard.image(structureState.foundationType, version);

    return `${resourceBase}${image}`;
  }

  createMaterialSrc(i) {
    const { structureState, resourceBase, version } = this.props;
    const orderCard = structureState.materialTypes[i];
    IV.validateNotNil("orderCard", orderCard);
    const image = OrderCard.image(orderCard, version);

    return `${resourceBase}${image}`;
  }

  createSiteSrc() {
    const { structureState, resourceBase, version } = this.props;
    const { siteType } = structureState;

    if (siteType) {
      const image = SiteCard.image(siteType, version);

      return `${resourceBase}${image}`;
    }

    return null;
  }

  render() {
    const { customKey, slicing, structureState } = this.props;
    const { width } = this.state;
    IV.validateNotNil("structureState", structureState);
    const height0 = width * HEIGHT_RATIO;
    const hBottom = this.height();
    const drawLayerFunctions = [];
    const images = [];

    const forEachFunction = (cardId, i) => {
      const imageSrc = this.createMaterialSrc(i);
      const hOffset = hBottom - (i + 1) * slicing * height0;
      const dlf = drawFunction1(imageSrc, slicing, hOffset);
      drawLayerFunctions.push(dlf);
      images.push(imageSrc);
    };
    forEachIndexed(forEachFunction, structureState.materialIds);

    if (!R.isNil(structureState.siteId)) {
      const imageSrc = this.createSiteSrc();
      drawLayerFunctions.push(drawFunction1(imageSrc, slicing, height0));
      images.push(imageSrc);
    }

    const imageFoundationSrc = this.createFoundationSrc();
    drawLayerFunctions.push(drawFunction2(imageFoundationSrc));
    images.push(imageFoundationSrc);
    const materialKeys = R.map((id) => `-${id}`, structureState.materialIds);
    const key = `${customKey}-StructureCanvas-${structureState.id}-${
      structureState.foundationId
    }-${structureState.siteId}${materialKeys.join("")}`;

    return React.createElement(LayeredCanvas, {
      drawLayerFunctions,
      customKey: key,
      height: this.height(),
      images,
      onClick: this.handleOnClick,
      title: `${structureState.foundationType.name}`,
      width,
    });
  }
}

StructureUI.propTypes = {
  structureState: PropTypes.shape().isRequired,

  customKey: PropTypes.string,
  magnification: PropTypes.number,
  resourceBase: PropTypes.string,
  slicing: PropTypes.number,
  version: PropTypes.string,
  width: PropTypes.number,
};

StructureUI.defaultProps = {
  customKey: "StructureUI",
  magnification: 3,
  resourceBase: Endpoint.NETWORK_RESOURCE,
  slicing: 0.2,
  version: undefined,
  width: 80,
};

export default StructureUI;
