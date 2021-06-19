import CampUI from "./CampUI.js";
import CardUI from "./CardUI.js";
import CardsUI from "./CardsUI.js";
import Endpoint from "./Endpoint.js";
import MoveOptionDialog from "./MoveOptionDialog.js";
import StructuresUI from "./StructuresUI.js";

const { CollapsiblePane, ReactUtilities: RU } = ReactComponent;

const TITLE_CLASS = "b bg-gray f5 ph1 pt1 tc v-mid";

const createInputArea = ({ callback, moveStates, player, role }) => {
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

class PlayerPanel extends React.PureComponent {
  createCampUI() {
    const {
      clienteleCards,
      influenceCards,
      isLeader,
      leadCards,
      player,
      resourceBase,
      stockpileCards,
      vaultCards,
      width,
    } = this.props;

    const campUI = React.createElement(CampUI, {
      clienteleCards,
      influenceCards,
      isLeader,
      leadCards,
      player,
      resourceBase,
      stockpileCards,
      vaultCards,
      width,
    });

    return RU.createCell(campUI, `CampCell-${player.id}`, "tc v-mid");
  }

  createHandCell() {
    const { handCards, player, resourceBase, width } = this.props;
    const element = React.createElement(CardsUI, {
      cardStates: handCards,
      customKey: `CardsUI-Hand-${player.id}`,
      resourceBase,
      width,
    });

    const cardsPane = React.createElement(CollapsiblePane, {
      key: `HandPane-${player.id}`,
      element,
      isExpanded: true,
      title: "Hand",
      titleClass: TITLE_CLASS,
    });

    return RU.createCell(cardsPane, `HandCell-${player.id}`, "tc v-mid");
  }

  createLeaderCell() {
    const { isLeader, leaderCard, player } = this.props;

    if (isLeader) {
      const cardCell = React.createElement(CardUI, {
        cardState: leaderCard,
      });

      return RU.createCell(cardCell, `LeaderCardCell-${player.id}`, "tc v-mid");
    }

    return undefined;
  }

  createStructureCell() {
    const { player, resourceBase, structures, width } = this.props;
    const element = React.createElement(StructuresUI, {
      structureStates: structures,
      customKey: `CardsUI-Structures-${player.id}`,
      resourceBase,
      width,
    });

    const cardsPane = React.createElement(CollapsiblePane, {
      key: `StructuresPane-${player.id}`,
      element,
      isExpanded: true,
      title: "Structures",
      titleClass: TITLE_CLASS,
    });

    return RU.createCell(cardsPane, `StructuresCell-${player.id}`, "tc v-mid");
  }

  render() {
    const { className, inputCallback, moveStates, player, role } = this.props;

    const leaderCell = this.createLeaderCell();
    const handCell = this.createHandCell();
    const campUI = this.createCampUI();
    const structureCell = this.createStructureCell();
    const cells = [leaderCell, handCell, campUI, structureCell];

    if (!R.isNil(moveStates)) {
      const inputArea = createInputArea({
        callback: inputCallback,
        moveStates,
        player,
        role,
      });
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

PlayerPanel.propTypes = {
  leaderCard: PropTypes.shape().isRequired,
  player: PropTypes.shape().isRequired,

  clienteleCards: PropTypes.arrayOf(PropTypes.shape()),
  handCards: PropTypes.arrayOf(PropTypes.shape()),
  influenceCards: PropTypes.arrayOf(PropTypes.shape()),
  leadCards: PropTypes.arrayOf(PropTypes.shape()),
  stockpileCards: PropTypes.arrayOf(PropTypes.shape()),
  vaultCards: PropTypes.arrayOf(PropTypes.shape()),

  className: PropTypes.string,
  inputCallback: PropTypes.func,
  isLeader: PropTypes.bool,
  moveStates: PropTypes.arrayOf(PropTypes.shape()),
  resourceBase: PropTypes.string,
  role: PropTypes.shape(),
  structures: PropTypes.arrayOf(PropTypes.shape()),
  width: PropTypes.number,
};

PlayerPanel.defaultProps = {
  clienteleCards: [],
  handCards: [],
  influenceCards: [],
  leadCards: [],
  stockpileCards: [],
  vaultCards: [],

  className: undefined,
  inputCallback: undefined,
  isLeader: false,
  moveStates: undefined,
  resourceBase: Endpoint.NETWORK_RESOURCE,
  role: undefined,
  structures: [],
  width: 80,
};

Object.freeze(PlayerPanel);

export default PlayerPanel;
