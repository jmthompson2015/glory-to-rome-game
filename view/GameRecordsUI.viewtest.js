import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

import TestData from "../model/TestData.js";

import GameRecordsUI from "./GameRecordsUI.js";

const store = TestData.createStore();

store.dispatch(ActionCreator.addGameRecord("first game record"));
store.dispatch(ActionCreator.addGameRecord("game record #2"));
store.dispatch(ActionCreator.addGameRecord("third game record"));

const state = store.getState();
const gameRecords = Selector.gameRecords(state);
const recordRows = R.map(R.prop("message"), gameRecords);

const element = React.createElement(GameRecordsUI, { recordRows });
ReactDOM.render(element, document.getElementById("panel"));
