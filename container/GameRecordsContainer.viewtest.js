import ActionCreator from "../state/ActionCreator.js";

import TestData from "../model/TestData.js";

import GameRecordsContainer from "./GameRecordsContainer.js";

const store = TestData.createStore();

store.dispatch(ActionCreator.addGameRecord("first game record"));
store.dispatch(ActionCreator.addGameRecord("game record #2"));
store.dispatch(ActionCreator.addGameRecord("third game record"));

const container = React.createElement(GameRecordsContainer);
const element = React.createElement(ReactRedux.Provider, { store }, container);
ReactDOM.render(element, document.getElementById("panel"));
