/* eslint no-console: ["error", { allow: ["log"] }] */

import ActionCreator from "../state/ActionCreator.js";
import Reducer from "../state/Reducer.js";
import StructureState from "../state/StructureState.js";

import Setup from "../model/Setup.js";
import TestData from "../model/TestData.js";

import StructuresUI from "./StructuresUI.js";
import Endpoint from "./Endpoint.js";

const onClick = ({ cardId, cardKey, eventSource }) => {
  console.log(
    `onClick() cardId = ${cardId} cardKey = ${cardKey} eventSource = ${eventSource}`
  );
};

const store = Redux.createStore(Reducer.root);
const players = TestData.createPlayers();
Setup.execute(store, players);
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
const structureStates = [structureState1, structureState2, structureState3];

const element = React.createElement(StructuresUI, {
  structureStates,
  onClick,
  resourceBase: Endpoint.LOCAL_RESOURCE,
  width: 150,
});
ReactDOM.render(element, document.getElementById("panel"));
