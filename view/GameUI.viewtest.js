import Reducer from "../state/Reducer.js";

import Setup from "../model/Setup.js";
import TestData from "../model/TestData.js";

import GameUI from "./GameUI.js";
import Endpoint from "./Endpoint.js";

const store = Redux.createStore(Reducer.root);
const players = TestData.createPlayers();
Setup.execute(store, players);
const state = store.getState();

const element = React.createElement(GameUI, {
  resourceBase: Endpoint.LOCAL_RESOURCE,
  state,
});
ReactDOM.render(element, document.getElementById("panel"));
