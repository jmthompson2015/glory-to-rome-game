import Reducer from "../state/Reducer.js";
import Selector from "../state/Selector.js";

import Setup from "../model/Setup.js";
import TestData from "../model/TestData.js";

import DeckUI from "./DeckUI.js";
import Endpoint from "./Endpoint.js";

const store = Redux.createStore(Reducer.root);
const players = TestData.createPlayers();
Setup.execute(store, players);
const state = store.getState();

const deck = Selector.orderCards(Selector.orderDeck(state), state);

const element1 = React.createElement(DeckUI, {
  deck,
  resourceBase: Endpoint.LOCAL_RESOURCE,
});
ReactDOM.render(element1, document.getElementById("panel1"));

const element2 = React.createElement(DeckUI, {
  deck: [],
  resourceBase: Endpoint.LOCAL_RESOURCE,
});
ReactDOM.render(element2, document.getElementById("panel2"));
