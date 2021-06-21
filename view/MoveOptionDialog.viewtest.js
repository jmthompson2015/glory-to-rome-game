/* eslint no-console: ["error", { allow: ["log"] }] */

import Role from "../artifact/Role.js";

import MoveGenerator from "../model/MoveGenerator.js";
import TestData from "../model/TestData.js";

import MoveOptionDialog from "./MoveOptionDialog.js";

const RU = ReactComponent.ReactUtilities;

const myCallback = (moveState) => {
  const playerId = moveState ? moveState.playerId : null;
  console.log(
    `myCallback() playerId = ${playerId} moveState = ${JSON.stringify(
      moveState
    )}`
  );
};

const createDialog = (playerId, roleKey, i, state) => {
  const role = Role.value(roleKey);
  const moveStates = MoveGenerator.generateOptions(roleKey, playerId, state);

  return React.createElement(MoveOptionDialog, {
    callback: myCallback,
    customKey: `MoveOptionDialog-${playerId}-${roleKey}-${i}`,
    moveStates,
    role,
  });
};

const store = TestData.createStore();
const state = store.getState();

const element1 = React.createElement(MoveOptionDialog, {
  callback: myCallback,
  customKey: "MoveOptionDialog-1-undefined-1",
  moveStates: MoveGenerator.generateRoleOptions(1, state),
});

const element2 = createDialog(2, Role.ARCHITECT, 2, state);

const element3 = createDialog(3, Role.CRAFTSMAN, 3, state);

const element4 = createDialog(4, Role.LABORER, 4, state);

const element5 = createDialog(5, Role.LEGIONARY, 5, state);

const element6 = createDialog(1, Role.MERCHANT, 6, state);

const element7 = createDialog(2, Role.PATRON, 7, state);

const element8 = createDialog(3, Role.THINKER, 8, state);

const cells = [
  element1,
  element2,
  element3,
  element4,
  element5,
  element6,
  element7,
  element8,
];
const flexbox = RU.createFlexboxWrap(cells, `Flexbox`);
ReactDOM.render(flexbox, document.getElementById("inputArea"));
