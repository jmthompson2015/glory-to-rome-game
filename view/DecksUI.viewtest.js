import Material from "../artifact/Material.js";

import Selector from "../state/Selector.js";

import TestData from "../model/TestData.js";

import DecksUI from "./DecksUI.js";
import Endpoint from "./Endpoint.js";

const store = TestData.createStore();
const state = store.getState();

const reduceFunction = (accum, materialKey) => {
  const siteIds = Selector.siteIdsByMaterial(materialKey, state);
  const deck = Selector.siteCards(siteIds, state);
  accum.push(deck);
  return accum;
};
const decks = R.reduce(reduceFunction, [], Material.keys());

const element1 = React.createElement(DecksUI, {
  countFillStyle: "black",
  decks,
  isFaceup: true,
  resourceBase: Endpoint.LOCAL_RESOURCE,
});
ReactDOM.render(element1, document.getElementById("panel1"));

const element2 = React.createElement(DecksUI, {
  countFillStyle: "black",
  decks: [],
  resourceBase: Endpoint.LOCAL_RESOURCE,
});
ReactDOM.render(element2, document.getElementById("panel2"));
