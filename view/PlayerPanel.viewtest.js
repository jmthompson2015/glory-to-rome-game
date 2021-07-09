/* eslint no-console: ["error", { allow: ["log"] }] */

import Phase from "../artifact/Phase.js";
import Role from "../artifact/Role.js";

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";
import StructureState from "../state/StructureState.js";

import MoveGenerator from "../model/MoveGenerator.js";
import TestData from "../model/TestData.js";

import Endpoint from "./Endpoint.js";
import PlayerPanel from "./PlayerPanel.js";

const inputCallback = (moveState) => {
  console.log(`inputCallback() moveState = ${JSON.stringify(moveState)}`);
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
store.dispatch(ActionCreator.addToPlayerArray("playerToVault", playerId, 53));

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
const role = Role.value(roleKey);

const moveStates = MoveGenerator.generateOptions(
  roleKey,
  playerId,
  store.getState()
);

// /////////////////////////////////////////////////////////////////////////////
const structureStates = [structureState1, structureState2, structureState3];
const state = store.getState();

const element = React.createElement(PlayerPanel, {
  clienteleCards: Selector.clienteleCards(playerId, state),
  currentPhaseKey: Phase.PERFORM_ROLE,
  handCards: Selector.handCards(playerId, state),
  influenceCards: Selector.influenceCards(playerId, state),
  inputCallback,
  isLeader: true,
  leadCards: Selector.campCards(playerId, state),
  leaderCard: Selector.leaderCard(state),
  leadRoleKey: Role.ARCHITECT,
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
