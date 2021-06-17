import InputValidator from "../utility/InputValidator.js";

import Role from "../artifact/Role.js";

const RU = ReactComponent.ReactUtilities;

const MATERIAL_ROLES = [Role.LABORER, Role.LEGIONARY, Role.MERCHANT];

const createButtons = (okOnClick) =>
  RU.createButton("OK", "okButton", null, {
    onClick: okOnClick,
  });

const createColorName = (item) =>
  ReactDOMFactories.span(
    {
      key: `${item.name}-${item.color}`,
      className: `b ${item.color.toLowerCase()}`,
    },
    item.name
  );

const createMessage = (role) => {
  let message;

  if (role) {
    const article = role.name.startsWith("A") ? "an" : "a";
    const roleName = createColorName(role);
    message = ReactDOMFactories.div(
      { key: `${role.name}-${role.color}` },
      `Select ${article} `,
      roleName,
      ` action:`
    );
  } else {
    message = ReactDOMFactories.div({ key: `choose-role` }, "Select a Role:");
  }

  return message;
};

const createTitle = (role) => (role ? "Select Action" : "Select Role");

const materialLabelFunction = (move) => {
  const { cardInstance, materialType, roleType } = move;
  const cardId = cardInstance ? cardInstance.id : undefined;
  const cardType = cardInstance ? cardInstance.cardType : undefined;
  const cardName = cardType ? cardType.name : "";
  const roleName = roleType ? roleType.name : "";
  const materialName = materialType ? createColorName(materialType) : "";

  return ReactDOMFactories.div(
    {
      key: `${materialName}-${cardId}-${cardName}-${roleName}`,
    },
    materialName,
    ` (${cardId} ${cardName} ${roleName})`
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

  return ReactDOMFactories.div(
    {
      key: `${roleName}-${cardId}-${cardName}-${materialName}`,
    },
    roleName,
    label
  );
};

const labelFunction = (move, role) => {
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
        answer = ReactDOMFactories.div({ key }, roleName, ` `, moveName);
      } else if (MATERIAL_ROLES.includes(role.key)) {
        answer = materialLabelFunction(move);
      } else if (role.key === Role.PATRON) {
        answer = roleLabelFunction(move);
      } else {
        answer = ReactDOMFactories.div(
          { key },
          `${moveName} ${cardId} ${cardName} `,
          roleName,
          ` `,
          materialName
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

const mapIndexed = R.addIndex(R.map);

const createInitialInput = ({
  customKey,
  clientProps,
  moveStates,
  onChange,
  role,
}) => {
  const inputProps = R.merge(
    {
      name: `chooseMove${customKey}`, // needed for radio
      onChange,
      type: "radio",
    },
    clientProps
  );
  const mapFunction = (moveState, i) => {
    const customKey2 = `${customKey}-${moveState.playerId}-${moveState.moveKey}-${i}`;
    const defaultChecked = i === 0;
    const input = ReactDOMFactories.input(
      R.merge(inputProps, {
        key: customKey2,
        defaultChecked,
        id: i,
        "data-index": i,
      })
    );
    const label = labelFunction(moveState, role);
    const cells = [];
    cells.push(RU.createCell(input, cells.length, "pa1 v-mid"));
    cells.push(RU.createCell(label, cells.length, "pa1 v-mid"));

    return RU.createRow(
      cells,
      `row${moveState.playerId}-${moveState.moveKey}-${i}`
    );
  };
  const rows = mapIndexed(mapFunction, moveStates);
  const customKey3 = R.map((m) => m.moveKey, moveStates);

  return RU.createTable(rows, `initialInput-${customKey3}`, "f6 tl");
};

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
    this.state = {
      moveStates: myMoveStates,
      selectedMove: R.head(myMoveStates),
    };

    this.ok = this.okFunction.bind(this);
    this.selectionChanged = this.selectionChangedFunction.bind(this);
  }

  okFunction() {
    const { callback } = this.props;
    const { selectedMove } = this.state;

    callback(selectedMove);
  }

  selectionChangedFunction(event) {
    const { moveStates } = this.state;
    const { index } = event.currentTarget.dataset;
    const selectedMove = moveStates[index];

    this.setState({ selectedMove });
  }

  render() {
    const { clientProps, customKey, role } = this.props;
    const { moveStates } = this.state;
    const message = createMessage(role);
    const initialInput = createInitialInput({
      customKey,
      clientProps,
      moveStates,
      onChange: this.selectionChanged,
      role,
    });
    const buttons = createButtons(this.ok);
    const customKey2 = R.map((m) => m.moveKey, moveStates);

    return React.createElement(ReactComponent.OptionPane, {
      key: `${customKey}-${customKey2}`,
      panelClass: "bg-wc-medium f6",
      title: createTitle(role),
      message,
      initialInput,
      buttons,
      titleClass: "b bg-gray f5 ph1 pt1 tc v-mid",
    });
  }
}

MoveOptionDialog.propTypes = {
  callback: PropTypes.func.isRequired,
  moveStates: PropTypes.arrayOf(PropTypes.shape()).isRequired,

  clientProps: PropTypes.shape(),
  customKey: PropTypes.string,
  role: PropTypes.shape(),
};

MoveOptionDialog.defaultProps = {
  clientProps: {},
  customKey: "MoveOptionDialog",
  role: undefined,
};

export default MoveOptionDialog;
