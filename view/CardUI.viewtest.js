/* eslint no-console: ["error", { allow: ["log"] }] */

import ActionCreator from "../state/ActionCreator.js";

import TestData from "../model/TestData.js";

import CardUI from "./CardUI.js";
import Endpoint from "./Endpoint.js";

const { ReactUtilities: RU } = ReactComponent;

const store = TestData.createStore();
// store.dispatch(ActionCreator.setVerbose(true));
store.dispatch(ActionCreator.setOrderHighlighted(3, true));

const createCardCell = (cardState, customKey0, sliceType) => {
  const c = cardState;
  const customKeySuffix = `${c.id}-${c.cardKey}-${c.isHighlighted}`;
  const customKey = `${customKey0}${customKeySuffix}`;
  const slicing = sliceType ? { type: sliceType, value: 0.2 } : undefined;
  const element = React.createElement(CardUI, {
    key: `CardUI${cardState.key}`,
    cardState,
    customKey,
    isFaceup: true,
    resourceBase: Endpoint.LOCAL_RESOURCE,
    slicing,
    width: 80,
  });

  return RU.createCell(element, `CardCell${cardState.cardKey}`, "pa1 v-top");
};

const uniqueCardInstances = (cardInstances) => {
  const reduceFunction1 = (accum, instance) => {
    const oldCards = accum[instance.cardType.key] || [];
    const newCards = [...oldCards, instance];
    return { ...accum, [instance.cardType.key]: newCards };
  };
  const keyToCards = R.reduce(
    reduceFunction1,
    {},
    Object.values(cardInstances)
  );
  const reduceFunction2 = (accum, typeKey) => {
    const cards = keyToCards[typeKey];
    return [...accum, R.head(cards)];
  };
  const keyToCard = R.reduce(reduceFunction2, [], Object.keys(keyToCards));

  return keyToCard;
};

const state = store.getState();

const cards1 = uniqueCardInstances(state.orderCardInstances);
const cells1 = R.map((card) => createCardCell(card, "cards1"), cards1);
// const cells1 = R.map((card) => createCardCell(card, "cards1", "bottom"), cards1);
// const cells1 = R.map((card) => createCardCell(card, "cards1", "left"), cards1);
// const cells1 = R.map((card) => createCardCell(card, "cards1", "right"), cards1);
// const cells1 = R.map((card) => createCardCell(card, "cards1", "top"), cards1);
ReactDOM.render(
  RU.createFlexboxWrap(cells1, "flexboxWrap1"),
  document.getElementById("panel1")
);

const cards2 = uniqueCardInstances(state.siteCardInstances);
const cells2 = R.map((card) => createCardCell(card, "cards2"), cards2);
// const cells2 = R.map((card) => createCardCell(card, "cards2", "bottom"), cards2);
// const cells2 = R.map((card) => createCardCell(card, "cards2", "left"), cards2);
// const cells2 = R.map((card) => createCardCell(card, "cards2", "right"), cards2);
// const cells2 = R.map((card) => createCardCell(card, "cards2", "top"), cards2);
ReactDOM.render(
  RU.createFlexboxWrap(cells2, "panel2"),
  document.getElementById("panel2")
);

const cards3 = uniqueCardInstances(state.bonusCardInstances);
const cells3 = R.map((card) => createCardCell(card, "cards3"), cards3);
// const cells3 = R.map((card) => createCardCell(card, "cards3", "bottom"), cards3);
// const cells3 = R.map((card) => createCardCell(card, "cards3", "left"), cards3);
// const cells3 = R.map((card) => createCardCell(card, "cards3", "right"), cards3);
// const cells3 = R.map((card) => createCardCell(card, "cards3", "top"), cards3);
ReactDOM.render(
  RU.createFlexboxWrap(cells3, "panel3"),
  document.getElementById("panel3")
);
