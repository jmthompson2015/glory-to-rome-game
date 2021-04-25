import OrderCard from "../artifact/OrderCard.js";
import SiteCard from "../artifact/SiteCard.js";

import ActionCreator from "./ActionCreator.js";
import Selector from "./Selector.js";

const cardToString = (card) =>
  JSON.stringify(R.pick(["key", "materialKey"], card));

const StructureState = {};

StructureState.create = ({
  id,
  foundationId,
  siteId,
  materialIds = [],
  store,
}) => {
  const myId =
    R.isNil(id) && store ? Selector.nextStructureId(store.getState()) : id;
  let foundationType;
  let siteType;
  let materialTypes;

  if (store) {
    const { orderCardInstances, siteCardInstances } = store.getState();
    foundationType = OrderCard.value(orderCardInstances[foundationId].cardKey);
    siteType = SiteCard.value(siteCardInstances[siteId].cardKey);
    const mapFunction = (cardId) => {
      const instance = orderCardInstances[cardId];
      return OrderCard.value(instance.cardKey);
    };
    materialTypes = R.map(mapFunction, materialIds);
  }

  const structure = Immutable({
    // Required.
    id: myId,
    foundationId,
    siteId,
    // Situational.
    materialIds,
    // Managed.
    foundationType,
    siteType,
    materialTypes,
  });

  if (store) {
    store.dispatch(ActionCreator.addStructure(structure));
  }

  return structure;
};

StructureState.toString = (structure) => {
  const { foundationType, siteType } = structure;

  return `foundation = ${cardToString(foundationType)}
site = ${cardToString(siteType)}
materials = ${R.map((m) => cardToString(m), structure.materialTypes)}`;
};

Object.freeze(StructureState);

export default StructureState;
