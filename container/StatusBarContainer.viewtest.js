import ActionCreator from "../state/ActionCreator.js";
import Reducer from "../state/Reducer.js";
import Selector from "../state/Selector.js";

import Setup from "../model/Setup.js";
import TestData from "../model/TestData.js";

import StatusBarContainer from "./StatusBarContainer.js";

const store = Redux.createStore(Reducer.root);
const players = TestData.createPlayers();
Setup.execute(store, players);
const cardId = R.head(Selector.orderDeck(store.getState()));
store.dispatch(ActionCreator.setOrderFaceup(cardId, false));

const container = React.createElement(StatusBarContainer, {
  helpBase: "../view/",
});
const element = React.createElement(ReactRedux.Provider, { store }, container);
ReactDOM.render(element, document.getElementById("panel"));
