/* eslint no-console: ["error", { allow: ["log"] }] */

import Role from "../artifact/Role.js";

import MoveGenerator from "../model/MoveGenerator.js";
import TestData from "../model/TestData.js";

import MoveOptionDialog from "./MoveOptionDialog.js";
import Endpoint from "./Endpoint.js";

const RU = ReactComponent.ReactUtilities;

const myCallback = (moveState) => {
  const playerId = moveState ? moveState.playerId : null;
  console.log(
    `myCallback() playerId = ${playerId} moveState = ${JSON.stringify(
      moveState
    )}`
  );
};

const createDialog = (playerId, roleKey, state) => {
  const role = Role.value(roleKey);
  const moveStates = MoveGenerator.generateOptions(roleKey, playerId, state);

  return React.createElement(MoveOptionDialog, {
    callback: myCallback,
    coinInstances: state.coinInstances,
    moveStates,
    role,

    customKey: `MoveOptionDialog-${playerId}-${roleKey}`,
    resourceBase: Endpoint.LOCAL_RESOURCE,
  });
};

const store = TestData.createStore();

const playerId1 = 1;
const element1 = React.createElement(MoveOptionDialog, {
  callback: myCallback,
  coinInstances: store.getState().coinInstances,
  moveStates: MoveGenerator.generateRoleOptions(playerId1, store.getState()),

  customKey: "MoveOptionDialog-1",
  resourceBase: Endpoint.LOCAL_RESOURCE,
});

const element2 = createDialog(2, Role.ARCHITECT, store.getState());

const element3 = createDialog(3, Role.CRAFTSMAN, store.getState());

const element4 = createDialog(4, Role.LABORER, store.getState());

const element5 = createDialog(5, Role.LEGIONARY, store.getState());

const element6 = createDialog(1, Role.MERCHANT, store.getState());

const element7 = createDialog(2, Role.PATRON, store.getState());

const element8 = createDialog(3, Role.THINKER, store.getState());

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
