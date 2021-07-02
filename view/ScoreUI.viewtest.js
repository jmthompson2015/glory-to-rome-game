/* eslint no-console: ["error", { allow: ["log"] }] */

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";
import StructureState from "../state/StructureState.js";

import TestData from "../model/TestData.js";

import ScoreUI from "./ScoreUI.js";

const store = TestData.createStore();
const { playerInstances } = store.getState();
const players = Object.values(playerInstances);
R.forEach((cardId) => {
  const c0 = Selector.orderCard(cardId, store.getState());
  const c = c0.cardType;
  console.log(
    `${cardId} ${c.name} ${c.roleKey} ${c.materialKey} ${c.materialValue}`
  );
}, Object.values(store.getState().orderDeck));
R.forEach((cardId) => {
  const c0 = Selector.siteCard(cardId, store.getState());
  const c = c0.cardType;
  console.log(`${cardId} ${c.name} ${c.materialKey} ${c.materialValue}`);
}, Object.values(store.getState().siteDeck));

// Player 2
const playerId1 = 2;
store.dispatch(ActionCreator.transferOrderToHand(playerId1));
const structureId1 = 1;
const foundationId1 = 38; // Crane craftsman wood 1
const siteId1 = 26;
StructureState.create({
  id: structureId1,
  foundationId: foundationId1,
  siteId: siteId1,
  // materialIds: [39],
  store,
});
store.dispatch(
  ActionCreator.transferHandToStructure(playerId1, 39, structureId1)
);
store.dispatch(
  ActionCreator.transferStructureToInfluence(structureId1, playerId1, siteId1)
);

// Player 3
const playerId2 = 3;
store.dispatch(ActionCreator.transferOrderToHand(playerId1));
const structureId2 = 2;
const foundationId2 = 107; // School legionary brick 2
const siteId2 = 1;
StructureState.create({
  id: structureId2,
  foundationId: foundationId2,
  siteId: siteId2,
  materialIds: [108],
  store,
});
store.dispatch(
  ActionCreator.transferHandToStructure(playerId2, 109, structureId2)
);
store.dispatch(
  ActionCreator.transferStructureToInfluence(structureId2, playerId2, siteId2)
);
store.dispatch(
  ActionCreator.transferHandToStockpile(playerId2, 110, playerId2)
);
store.dispatch(ActionCreator.transferStockpileToVault(playerId2, 110));

const reduceFunction = (accum, player) => {
  const score = Selector.score(player.id, store.getState());
  return { ...accum, [player.id]: score };
};
const playerToScore = R.reduce(reduceFunction, {}, players);
console.log(`playerToScore = ${JSON.stringify(playerToScore, null, 2)}`);

const element = React.createElement(ScoreUI, {
  playerInstances,
  playerToScore,
});
ReactDOM.render(element, document.getElementById("panel"));
