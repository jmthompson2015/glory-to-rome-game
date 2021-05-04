import TestData from "../model/TestData.js";

import CardImage from "./CardImage.js";
import Endpoint from "./Endpoint.js";

const { ReactUtilities: RU } = ReactComponent;

function createCardCell(card, sliceType) {
  const slicing = sliceType ? { type: sliceType, value: 0.2 } : undefined;
  const element = React.createElement(CardImage, {
    key: `CardImage${card.key}`,
    card,
    resourceBase: Endpoint.LOCAL_RESOURCE,
    slicing,
    width: 200,
  });

  return RU.createCell(element, `CardCell${card.cardKey}`, "pa1 v-top");
}

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

const store = TestData.createStore();
const state = store.getState();

const cards1 = uniqueCardInstances(state.orderCardInstances);
const cells1 = R.map((card) => createCardCell(card), cards1);
// const cells1 = R.map((card) => createCardCell(card, "bottom"), cards1);
// const cells1 = R.map((card) => createCardCell(card, "left"), cards1);
// const cells1 = R.map((card) => createCardCell(card, "right"), cards1);
// const cells1 = R.map((card) => createCardCell(card, "top"), cards1);
ReactDOM.render(
  RU.createFlexboxWrap(cells1, "flexboxWrap1"),
  document.getElementById("panel1")
);

const cards2 = uniqueCardInstances(state.siteCardInstances);
const cells2 = R.map((card) => createCardCell(card), cards2);
// const cells2 = R.map((card) => createCardCell(card, "bottom"), cards2);
ReactDOM.render(
  RU.createFlexboxWrap(cells2, "panel2"),
  document.getElementById("panel2")
);

const cards3 = uniqueCardInstances(state.bonusCardInstances);
const cells3 = R.map((card) => createCardCell(card), cards3);
ReactDOM.render(
  RU.createFlexboxWrap(cells3, "panel3"),
  document.getElementById("panel3")
);
