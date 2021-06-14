/* eslint no-console: ["error", { allow: ["log"] }] */

import ActionCreator from "../state/ActionCreator.js";
import StructureState from "../state/StructureState.js";

import TestData from "../model/TestData.js";

import StructureUI from "./StructureUI.js";
import Endpoint from "./Endpoint.js";

const { ReactUtilities: RU } = ReactComponent;

const store = TestData.createStore();
store.dispatch(ActionCreator.setVerbose(true));

const createStructureCell = (structureState, customKey0) => {
  const c = structureState;
  const customKeySuffix = `${c.id}-${c.cardKey}-${c.isFaceup}-${c.isHighlighted}`;
  const customKey = `${customKey0}${customKeySuffix}`;
  const element = React.createElement(StructureUI, {
    key: `StructureUI${structureState.key}`,
    structureState,
    customKey,
    resourceBase: Endpoint.LOCAL_RESOURCE,
    width: 80,
  });
  const { foundationId } = structureState;

  return RU.createCell(element, `CardCell${foundationId}`, "pa1 v-top");
};

const structureState1 = StructureState.create({
  id: 1,
  foundationId: 2,
  siteId: 1,
  store,
});
store.dispatch(ActionCreator.addStructure(structureState1));
const structureState2 = StructureState.create({
  id: 2,
  foundationId: 23,
  siteId: 13,
  materialIds: [24, 25],
  store,
});
store.dispatch(ActionCreator.addStructure(structureState2));
const structureState3 = StructureState.create({
  id: 3,
  foundationId: 5,
  materialIds: [6, 7],
  store,
});
store.dispatch(ActionCreator.addStructure(structureState3));

const cell1 = createStructureCell(structureState1, "structure1");
const cell2 = createStructureCell(structureState2, "structure2");
const cell3 = createStructureCell(structureState3, "structure3");

ReactDOM.render(
  RU.createFlexboxWrap([cell1, cell2, cell3], "flexboxWrap1"),
  document.getElementById("panel1")
);
