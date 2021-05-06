/* eslint no-console: ["error", { allow: ["log"] }] */

import ActionCreator from "../state/ActionCreator.js";
import Reducer from "../state/Reducer.js";
import Selector from "../state/Selector.js";

import Setup from "../model/Setup.js";
import TestData from "../model/TestData.js";

import CardsUI from "./CardsUI.js";
import Endpoint from "./Endpoint.js";

const onClick = ({ cardId, cardKey, eventSource }) => {
  console.log(
    `onClick() cardId = ${cardId} cardKey = ${cardKey} eventSource = ${eventSource}`
  );
};

const store = Redux.createStore(Reducer.root);
const players = TestData.createPlayers();
Setup.execute(store, players);
store.dispatch(ActionCreator.setVerbose(true));
const playerId = 1;
const handIds = Selector.handIds(playerId, store.getState());
store.dispatch(ActionCreator.setOrderHighlighted(handIds[1], true));
const handCards = Selector.handCards(playerId, store.getState());

const element = React.createElement(CardsUI, {
  cardStates: handCards,
  onClick,
  resourceBase: Endpoint.LOCAL_RESOURCE,
  width: 150,
});
ReactDOM.render(element, document.getElementById("panel"));
