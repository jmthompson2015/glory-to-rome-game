import Role from "../artifact/Role.js";

const { RadioButtonPanel, ReactUtilities: RU, TitledElement } = ReactComponent;

const MATERIAL_ROLES = [Role.LABORER, Role.LEGIONARY, Role.MERCHANT];

const createColorName = (item) =>
  RU.createSpan(
    item.name,
    `${item.name}-${item.color}`,
    `b ${item.color.toLowerCase()}`
  );

const createTitle = (role) => (role ? "Select Action" : "Select Role");

const materialLabelFunction = (move) => {
  const { cardInstance, materialType, roleType } = move;
  const cardId = cardInstance ? cardInstance.id : undefined;
  const cardType = cardInstance ? cardInstance.cardType : undefined;
  const cardName = cardType ? cardType.name : "";
  const roleName = roleType ? roleType.name : "";
  const materialName = materialType ? createColorName(materialType) : "";

  return RU.createSpan(
    [materialName, ` (${cardId} ${cardName} ${roleName})`],
    `${materialName}-${cardId}-${cardName}-${roleName}`
  );
};

const roleLabelFunction = (move) => {
  const { cardInstance, materialType, roleType } = move;
  const cardId = cardInstance ? cardInstance.id : undefined;
  const cardType = cardInstance ? cardInstance.cardType : undefined;
  const cardName = cardType ? cardType.name : "";
  const roleName = roleType ? createColorName(roleType) : "";
  const materialName = materialType ? materialType.name : "";
  const label = materialName
    ? ` (${cardId} ${cardName} ${materialName})`
    : ` (${cardId} ${cardName})`;

  return RU.createSpan(
    [roleName, label],
    `${roleName}-${cardId}-${cardName}-${materialName}`
  );
};

const labelFunction = (role) => (move) => {
  let answer = JSON.stringify(move);

  if (move) {
    const { cardInstance, materialType, moveKey, roleType } = move;
    const moveName = moveKey || "";
    const cardId = cardInstance ? cardInstance.id : undefined;
    const cardType = cardInstance ? cardInstance.cardType : undefined;
    const cardName = cardType ? cardType.name : "";
    const roleName = roleType ? createColorName(roleType) : "";
    const materialName = materialType ? createColorName(materialType) : "";
    const key = `${cardId}-${cardName}-${roleName}-${materialName}`;

    if (role) {
      if (move.roleKey === Role.THINKER) {
        answer = RU.createSpan([roleName, ` `, moveName], key);
      } else if (MATERIAL_ROLES.includes(role.key)) {
        answer = materialLabelFunction(move);
      } else if (role.key === Role.PATRON) {
        answer = roleLabelFunction(move);
      } else {
        answer = RU.createSpan(
          [
            `${moveName} (${cardId} ${cardName} `,
            roleName,
            ` `,
            materialName,
            `)`,
          ],
          key
        );
      }
    } else {
      answer = roleLabelFunction(move);
    }
  }

  return answer;
};

const materialRoleSort = R.sortWith([
  R.ascend(R.prop("materialKey")),
  R.ascend(R.prop("roleKey")),
  R.ascend(R.prop("cardId")),
]);

const roleMaterialSort = R.sortWith([
  R.ascend(R.prop("roleKey")),
  R.ascend(R.prop("materialKey")),
  R.ascend(R.prop("cardId")),
]);

// /////////////////////////////////////////////////////////////////////////////////////////////////
class MoveOptionDialog extends React.Component {
  constructor(props) {
    super(props);

    const { moveStates, role } = props;
    const mySort =
      role && MATERIAL_ROLES.includes(role.key)
        ? materialRoleSort
        : roleMaterialSort;
    const myMoveStates = mySort(moveStates);
    this.state = { moveStates: myMoveStates };

    this.ok = this.okFunction.bind(this);
  }

  okFunction(selectedMove) {
    const { callback } = this.props;

    callback(selectedMove);
  }

  render() {
    const { customKey, role } = this.props;
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
      labelFunction: labelFunction(role),
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

  customKey: PropTypes.string,
  role: PropTypes.shape(),
};

MoveOptionDialog.defaultProps = {
  customKey: "MoveOptionDialog",
  role: undefined,
};

export default MoveOptionDialog;
