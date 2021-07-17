import Material from "../artifact/Material.js";
import Role from "../artifact/Role.js";

import Sorter from "../state/Sorter.js";

import MoveFunction from "../model/MoveFunction.js";

const { RadioButtonPanel, ReactUtilities: RU, TitledElement } = ReactComponent;

const MATERIAL_ROLES = [Role.LABORER, Role.LEGIONARY, Role.MERCHANT];

const createNameMap = (accum, type) => R.assoc(type.name, type, accum);

const MATERIAL_MAP = R.reduce(createNameMap, {}, Material.values());
const MATERIAL_NAMES = Object.keys(MATERIAL_MAP);
const ROLE_MAP = R.reduce(createNameMap, {}, Role.values());
const ROLE_NAMES = Object.keys(ROLE_MAP);

const createColorName = (item, keySuffix = "") =>
  RU.createSpan(
    item.name,
    `${item.name}-${item.color}${keySuffix}`,
    `b ${item.color}`
  );

const createTitle = (role) => (role ? "Select Action" : "Select Role");

const labelFunction = (currentPhaseKey, leadRoleKey) => (moveState) => {
  let answer = JSON.stringify(moveState);

  if (moveState) {
    const { moveKey } = moveState;
    const moveFunction = MoveFunction[moveKey];
    const labelString = moveFunction.label(
      moveState,
      currentPhaseKey,
      leadRoleKey
    );
    let wordToCount = {};
    const reduceFunction = (accum, word) => {
      let newWord = `${word} `;

      if (MATERIAL_NAMES.includes(word)) {
        const oldCount = wordToCount[word] || 0;
        const newCount = oldCount + 1;
        wordToCount = { ...wordToCount, [word]: newCount };
        newWord = createColorName(MATERIAL_MAP[word], newCount);
      } else if (ROLE_NAMES.includes(word)) {
        const oldCount = wordToCount[word] || 0;
        const newCount = oldCount + 1;
        wordToCount = { ...wordToCount, [word]: newCount };
        newWord = createColorName(ROLE_MAP[word], newCount);
      }

      return R.append(" ", R.append(newWord, accum));
    };
    const words = labelString.split(" ");

    answer = R.reduce(reduceFunction, [], words);
  }

  return answer;
};

// /////////////////////////////////////////////////////////////////////////////////////////////////
class MoveOptionDialog extends React.Component {
  constructor(props) {
    super(props);

    const { moveStates, role } = props;
    const mySort =
      role && MATERIAL_ROLES.includes(role.key)
        ? Sorter.Move.materialRoleSort
        : Sorter.Move.roleMaterialSort;
    const myMoveStates = mySort(moveStates);
    this.state = { moveStates: myMoveStates };

    this.ok = this.okFunction.bind(this);
  }

  okFunction(selectedMove) {
    const { callback } = this.props;

    callback(selectedMove);
  }

  render() {
    const { currentPhaseKey, customKey, leadRoleKey, role } = this.props;
    const { moveStates } = this.state;
    const customKey2 = R.map((m) => m.moveKey, moveStates);
    const radioButtonPanel = React.createElement(RadioButtonPanel, {
      applyOnClick: this.ok,
      buttonLabel: "OK",
      buttonPanelClass: "fr pa1",
      className: "w-100",
      customKey,
      inputPanelClass: "bg-white pa1 tl",
      items: moveStates,
      labelFunction: labelFunction(currentPhaseKey, leadRoleKey),
      selectedItem: R.head(moveStates),
    });

    return React.createElement(TitledElement, {
      className: "bg-gray ma1",
      customKey: `${customKey}-${customKey2}`,
      element: radioButtonPanel,
      elementClass: "ma0 tc v-mid",
      title: createTitle(role),
      titleClass: "b bg-gray f5 pa1 tc v-mid",
    });
  }
}

MoveOptionDialog.propTypes = {
  callback: PropTypes.func.isRequired,
  moveStates: PropTypes.arrayOf(PropTypes.shape()).isRequired,

  currentPhaseKey: PropTypes.string,
  customKey: PropTypes.string,
  leadRoleKey: PropTypes.string,
  role: PropTypes.shape(),
};

MoveOptionDialog.defaultProps = {
  currentPhaseKey: undefined,
  customKey: "MoveOptionDialog",
  leadRoleKey: undefined,
  role: undefined,
};

export default MoveOptionDialog;
