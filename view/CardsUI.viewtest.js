/* eslint no-console: ["error", { allow: ["log"] }] */

import ActionCreator from "../state/ActionCreator.js";
import Reducer from "../state/Reducer.js";
import Selector from "../state/Selector.js";

import Setup from "../model/Setup.js";
import TestData from "../model/TestData.js";

import CardsUI from "./CardsUI.js";
import Endpoint from "./Endpoint.js";

const store = Redux.createStore(Reducer.root);
const players = TestData.createPlayers();
Setup.execute(store, players);
store.dispatch(ActionCreator.setVerbose(true));
const playerId = 1;
const handIds = Selector.handIds(playerId, store.getState());
store.dispatch(ActionCreator.setOrdersFaceup(handIds, true));
store.dispatch(ActionCreator.setOrderHighlighted(handIds[1], true));
const handCards = Selector.handCards(playerId, store.getState());

const element1 = React.createElement(CardsUI, {
  cardStates: handCards,
  resourceBase: Endpoint.LOCAL_RESOURCE,
});
ReactDOM.render(element1, document.getElementById("panel1"));

const element2 = React.createElement(CardsUI, {
  cardStates: [],
  resourceBase: Endpoint.LOCAL_RESOURCE,
});
ReactDOM.render(element2, document.getElementById("panel2"));
