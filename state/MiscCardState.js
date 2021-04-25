import MiscCard from "../artifact/MiscCard.js";

import ActionCreator from "./ActionCreator.js";
import Selector from "./Selector.js";

const MiscCardState = {};

MiscCardState.create = ({
  id,
  cardKey,
  isFaceup = true,
  isHighlighted = false,
  store,
}) => {
  const myId =
    R.isNil(id) && store ? Selector.nextMiscCardId(store.getState()) : id;

  const card = Immutable({
    // Required.
    id: myId,
    cardKey,
    // Situational.
    isFaceup,
    isHighlighted,
    // Managed.
    cardType: MiscCard.value(cardKey),
  });

  if (store) {
    store.dispatch(ActionCreator.addMiscCard(card));
  }

  return card;
};

MiscCardState.toString = (card) =>
  JSON.stringify(R.pick(["id", "cardKey"], card));

Object.freeze(MiscCardState);

export default MiscCardState;
