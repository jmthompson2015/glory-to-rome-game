/* eslint no-console: ["error", { allow: ["log"] }] */

import Role from "../artifact/Role.js";

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

import TestData from "../model/TestData.js";

import CampUI from "./CampUI.js";
import Endpoint from "./Endpoint.js";

const store = TestData.createStore();
const playerId = 1;
store.dispatch(
  ActionCreator.addToPlayerArray("playerToInfluence", playerId, 32)
);
store.dispatch(
  ActionCreator.addToPlayerArray("playerToInfluence", playerId, 47)
);

store.dispatch(
  ActionCreator.addToPlayerArray("playerToClientele", playerId, 38)
);
store.dispatch(
  ActionCreator.addToPlayerArray("playerToClientele", playerId, 35)
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

store.dispatch(ActionCreator.setLeadRole(Role.ARCHITECT));
const roleKey = Selector.leadRoleKey(store.getState());
const role = Role.value(roleKey);

// /////////////////////////////////////////////////////////////////////////////
const state = store.getState();

const element = React.createElement(CampUI, {
  clienteleCards: Selector.clienteleCards(playerId, state),
  influenceCards: Selector.influenceCards(playerId, state),
  leadCards: Selector.campCards(playerId, state),
  player: Selector.player(playerId, state),
  resourceBase: Endpoint.LOCAL_RESOURCE,
  role,
  stockpileCards: Selector.stockpileCards(playerId, state),
  vaultCards: Selector.vaultCards(playerId, state),
  width: 80,
});
ReactDOM.render(element, document.getElementById("panel"));
