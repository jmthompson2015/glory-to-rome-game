/* eslint no-console: ["error", { allow: ["log"] }] */

import Role from "../artifact/Role.js";

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";
import StructureState from "../state/StructureState.js";

import MoveGenerator from "../model/MoveGenerator.js";
import TestData from "../model/TestData.js";

import Endpoint from "./Endpoint.js";
import PlayerPanel from "./PlayerPanel.js";

const inputCallback = ({ playerId, moveState }) => {
  console.log(
    `inputCallback() playerId = ${playerId} moveState = ${JSON.stringify(
      moveState
    )}`
  );
};

const store = TestData.createStore();
const playerId = 1;
store.dispatch(
  ActionCreator.addToPlayerArray("playerToInfluence", playerId, 32)
);
store.dispatch(
  ActionCreator.addToPlayerArray("playerToInfluence", playerId, 35)
);

store.dispatch(
  ActionCreator.addToPlayerArray("playerToClientele", playerId, 38)
);
store.dispatch(
  ActionCreator.addToPlayerArray("playerToClientele", playerId, 47)
);

store.dispatch(ActionCreator.addToPlayerArray("playerToVault", playerId, 50));
store.dispatch(ActionCreator.setOrderFaceup(50, false));
store.dispatch(ActionCreator.addToPlayerArray("playerToVault", playerId, 53));
store.dispatch(ActionCreator.setOrderFaceup(53, false));

store.dispatch(
  ActionCreator.addToPlayerArray("playerToStockpile", playerId, 56)
);
store.dispatch(
  ActionCreator.addToPlayerArray("playerToStockpile", playerId, 59)
);

store.dispatch(ActionCreator.addToPlayerArray("playerToCamp", playerId, 62));
const structureState1 = StructureState.create({
  id: 1,
  foundationId: 2,
  siteId: 1,
  store,
});
store.dispatch(ActionCreator.addStructure(structureState1));
const structureState2 = StructureState.create({
  id: 2,
  foundationId: 23,
  siteId: 13,
  materialIds: [24, 25],
  store,
});
store.dispatch(ActionCreator.addStructure(structureState2));
const structureState3 = StructureState.create({
  id: 3,
  foundationId: 5,
  materialIds: [6, 7],
  store,
});
store.dispatch(ActionCreator.addStructure(structureState3));

store.dispatch(ActionCreator.setLeadRole(Role.ARCHITECT));
const roleKey = Selector.leadRoleKey(store.getState());
console.log(`roleKey = ${roleKey}`);
const role = Role.value(roleKey);

const moveStates = MoveGenerator.generateOptions(
  roleKey,
  playerId,
  store.getState()
);
console.log(`moveStates.length = ${moveStates.length}`);

// /////////////////////////////////////////////////////////////////////////////
const structureStates = [structureState1, structureState2, structureState3];
const state = store.getState();

const element = React.createElement(PlayerPanel, {
  campCards: Selector.campCards(playerId, state),
  clienteleCards: Selector.clienteleCards(playerId, state),
  handCards: Selector.handCards(playerId, state),
  influenceCards: Selector.influenceCards(playerId, state),
  inputCallback,
  moveStates,
  player: Selector.player(playerId, state),
  resourceBase: Endpoint.LOCAL_RESOURCE,
  role,
  stockpileCards: Selector.stockpileCards(playerId, state),
  structures: structureStates,
  vaultCards: Selector.vaultCards(playerId, state),
  width: 80,
});
ReactDOM.render(element, document.getElementById("panel"));
