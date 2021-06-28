import Endpoint from "./Endpoint.js";
import StructureUI from "./StructureUI.js";

const { ReactUtilities: RU } = ReactComponent;

const createIdSuffix = (card) =>
  `${card.id}-${card.cardKey}-${card.isHighlighted}`;

class StructuresUI extends React.PureComponent {
  createId(cardState) {
    const { customKey } = this.props;

    return `${customKey}-${createIdSuffix(cardState)}`;
  }

  render() {
    const { structureStates, resourceBase, slicing, width } = this.props;

    const mapFunction = (structureState) => {
      const customKey = this.createId(structureState);
      const element = React.createElement(StructureUI, {
        structureState,
        customKey,
        resourceBase,
        slicing,
        width,
      });

      return RU.createCell(
        element,
        `cardCell-${createIdSuffix(structureState)}`,
        "alignTop ph1 v-top"
      );
    };

    const structureCells = R.map(mapFunction, structureStates);
    const row = RU.createRow(structureCells);

    return RU.createTable(row, "structuresUITable", "center");
  }
}

StructuresUI.propTypes = {
  structureStates: PropTypes.arrayOf(PropTypes.shape()).isRequired,

  customKey: PropTypes.string,
  resourceBase: PropTypes.string,
  slicing: PropTypes.number,
  width: PropTypes.number,
};

StructuresUI.defaultProps = {
  customKey: "StructuresUI",
  resourceBase: Endpoint.NETWORK_RESOURCE,
  slicing: 0.2,
  width: 80,
};

Object.freeze(StructuresUI);

export default StructuresUI;
