import Selector from "../state/Selector.js";

import TestData from "../model/TestData.js";

import CardsUI from "./CardsUI.js";
import Endpoint from "./Endpoint.js";

const store = TestData.createStore();
const playerId = 1;
const state = store.getState();

const handCards = Selector.handCards(playerId, state);

const element = React.createElement(CardsUI, {
  cards: handCards,
  resourceBase: Endpoint.LOCAL_RESOURCE,
  width: 150,
});
ReactDOM.render(element, document.getElementById("panel"));
