import CardsUI from "./CardsUI.js";
import Endpoint from "./Endpoint.js";
import MoveOptionDialog from "./MoveOptionDialog.js";
import StructuresUI from "./StructuresUI.js";

const { CollapsiblePane, ReactUtilities: RU } = ReactComponent;

const TITLE_CLASS = "b bg-gray f5 ph1 pt1 tc v-mid";

const createSlicing = (type) => ({ type, value: 0.2 });

const createCell = (
  title,
  cardStates,
  playerId,
  resourceBase,
  width,
  slicing
) => {
  const element = React.createElement(CardsUI, {
    cardStates,
    customKey: `CardsUI${title}-${playerId}`,
    resourceBase,
    slicing,
    width,
  });

  const cardsPane = React.createElement(CollapsiblePane, {
    key: `CardsPane${title}`,
    element,
    isExpanded: true,
    title,
    titleClass: TITLE_CLASS,
  });

  return RU.createCell(cardsPane, `CardsCell${title}`, "tc v-mid");
};

const createInputArea = (callback, moveStates, player, role) => {
  const customKey = `inputArea${player.id}`;
  let element;

  if (!R.isEmpty(moveStates)) {
    element = React.createElement(MoveOptionDialog, {
      callback,
      moveStates,
      role,
      customKey: "move",
    });
  }

  return ReactDOMFactories.div({ key: customKey, id: customKey }, element);
};

const createStructureCell = (
  title,
  structureStates,
  playerId,
  resourceBase,
  width,
  slicing
) => {
  const element = React.createElement(StructuresUI, {
    structureStates,
    customKey: `CardsUI${title}-${playerId}`,
    resourceBase,
    slicing,
    width,
  });

  const cardsPane = React.createElement(CollapsiblePane, {
    key: `CardsPane${title}`,
    element,
    isExpanded: true,
    title,
    titleClass: TITLE_CLASS,
  });

  return RU.createCell(cardsPane, `CardsCell${title}`, "tc v-mid");
};

class TableauUI extends React.PureComponent {
  createPlayerBoard() {
    const {
      campCards,
      clienteleCards,
      influenceCards,
      player,
      resourceBase,
      stockpileCards,
      vaultCards,
      width,
    } = this.props;

    const campCell = createCell(
      "Camp",
      campCards,
      player.id,
      resourceBase,
      width
    );
    const clienteleCell = createCell(
      "Clientele",
      clienteleCards,
      player.id,
      resourceBase,
      width,
      createSlicing("left")
    );
    const influenceCell = createCell(
      "Influence",
      influenceCards,
      player.id,
      resourceBase,
      width,
      createSlicing("top")
    );
    const stockpileCell = createCell(
      "Stockpile",
      stockpileCards,
      player.id,
      resourceBase,
      width,
      createSlicing("bottom")
    );
    const vaultCell = createCell(
      "Vault",
      vaultCards,
      player.id,
      resourceBase,
      width,
      createSlicing("right")
    );

    const middleRow = RU.createRow([clienteleCell, campCell, vaultCell]);
    const middleCell = RU.createCell(
      RU.createTable(middleRow),
      "middleCell",
      "tc v-mid"
    );

    const rows = [
      RU.createRow(influenceCell, "influenceRow"),
      RU.createRow(middleCell, "middleRow"),
      RU.createRow(stockpileCell, "stockpileRow"),
    ];

    return RU.createTable(rows, `PlayerBoard${player.id}`, "tc v-mid");
  }

  render() {
    const {
      className,
      handCards,
      inputCallback,
      moveStates,
      player,
      resourceBase,
      role,
      structures,
      width,
    } = this.props;

    const handCell = createCell(
      "Hand",
      handCards,
      player.id,
      resourceBase,
      width
    );
    const structureCell = createStructureCell(
      "Structures",
      structures,
      player.id,
      resourceBase,
      width
    );
    const playerBoard = this.createPlayerBoard();
    const cells = [handCell, playerBoard, structureCell];

    if (!R.isNil(moveStates)) {
      const inputArea = createInputArea(
        inputCallback,
        moveStates,
        player,
        role
      );
      cells.push(inputArea);
    }

    const tableau = RU.createFlexboxWrap(cells, `TableauFlexbox${player.id}`);

    return React.createElement(CollapsiblePane, {
      key: `TableauPane${player.id}`,
      className,
      element: tableau,
      isExpanded: true,
      title: player.name,
      titleClass: "b bg-light-gray f5 ph1 pt1 tc v-mid",
    });
  }
}

TableauUI.propTypes = {
  player: PropTypes.shape().isRequired,

  campCards: PropTypes.arrayOf(PropTypes.shape()),
  clienteleCards: PropTypes.arrayOf(PropTypes.shape()),
  handCards: PropTypes.arrayOf(PropTypes.shape()),
  influenceCards: PropTypes.arrayOf(PropTypes.shape()),
  stockpileCards: PropTypes.arrayOf(PropTypes.shape()),
  vaultCards: PropTypes.arrayOf(PropTypes.shape()),

  className: PropTypes.string,
  inputCallback: PropTypes.func,
  moveStates: PropTypes.arrayOf(PropTypes.shape()),
  resourceBase: PropTypes.string,
  role: PropTypes.shape(),
  structures: PropTypes.arrayOf(PropTypes.shape()),
  width: PropTypes.number,
};

TableauUI.defaultProps = {
  campCards: [],
  clienteleCards: [],
  handCards: [],
  influenceCards: [],
  stockpileCards: [],
  vaultCards: [],

  className: undefined,
  inputCallback: undefined,
  moveStates: undefined,
  resourceBase: Endpoint.NETWORK_RESOURCE,
  role: undefined,
  structures: [],
  width: 200,
};

Object.freeze(TableauUI);

export default TableauUI;
