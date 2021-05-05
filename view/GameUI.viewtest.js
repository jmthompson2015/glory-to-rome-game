import ActionCreator from "../state/ActionCreator.js";
import Reducer from "../state/Reducer.js";
import Selector from "../state/Selector.js";

import Setup from "../model/Setup.js";
import TestData from "../model/TestData.js";

import GameUI from "./GameUI.js";
import Endpoint from "./Endpoint.js";

const store = Redux.createStore(Reducer.root);
store.dispatch(ActionCreator.setVerbose(true));
const players = TestData.createPlayers();
Setup.execute(store, players);
const cardId = R.head(Selector.orderDeck(store.getState()));
store.dispatch(ActionCreator.setOrderCardFaceup(cardId, false));
const state = store.getState();

const element = React.createElement(GameUI, {
  resourceBase: Endpoint.LOCAL_RESOURCE,
  state,
});
ReactDOM.render(element, document.getElementById("panel"));
