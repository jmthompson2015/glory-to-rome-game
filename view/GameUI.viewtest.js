/* eslint no-console: ["error", { allow: ["log"] }] */

import Role from "../artifact/Role.js";

import ActionCreator from "../state/ActionCreator.js";
import Reducer from "../state/Reducer.js";
import Selector from "../state/Selector.js";

import MoveGenerator from "../model/MoveGenerator.js";
import Setup from "../model/Setup.js";
import TestData from "../model/TestData.js";

import GameUI from "./GameUI.js";
import Endpoint from "./Endpoint.js";

const inputCallback = ({ playerId, moveState }) => {
  console.log(
    `inputCallback() playerId = ${playerId} moveState = ${JSON.stringify(
      moveState
    )}`
  );
};

const store = Redux.createStore(Reducer.root);
store.dispatch(ActionCreator.setVerbose(true));
const players = TestData.createPlayers();
Setup.execute(store, players);
const cardId = R.head(Selector.orderDeck(store.getState()));
store.dispatch(ActionCreator.setOrderFaceup(cardId, false));

const playerId = R.head(players).id;
store.dispatch(ActionCreator.setCurrentPlayer(playerId));

const roleKey = Role.ARCHITECT;
store.dispatch(ActionCreator.setLeadRole(roleKey));

const moveStates = MoveGenerator.generateOptions(
  roleKey,
  playerId,
  store.getState()
);
store.dispatch(ActionCreator.setCurrentMoves(moveStates));
store.dispatch(ActionCreator.pushInputCallback(inputCallback));

const element = React.createElement(GameUI, {
  resourceBase: Endpoint.LOCAL_RESOURCE,
  state: store.getState(),
});
ReactDOM.render(element, document.getElementById("panel"));
