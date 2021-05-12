import Phase from "../artifact/Phase.js";

import ActionCreator from "../state/ActionCreator.js";
import Reducer from "../state/Reducer.js";

import Setup from "../model/Setup.js";
import TestData from "../model/TestData.js";

import StatusBarContainer from "./StatusBarContainer.js";

const store = Redux.createStore(Reducer.root);
const players = TestData.createPlayers();
Setup.execute(store, players);
store.dispatch(ActionCreator.setCurrentRound(1));
store.dispatch(ActionCreator.setCurrentPhase(Phase.DECLARE_ROLE));

const container = React.createElement(StatusBarContainer, {
  helpBase: "../view/",
});
const element = React.createElement(ReactRedux.Provider, { store }, container);
ReactDOM.render(element, document.getElementById("panel"));
