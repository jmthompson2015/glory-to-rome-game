import BonusCard from "../artifact/BonusCard.js";

import ActionCreator from "./ActionCreator.js";
import Selector from "./Selector.js";

const BonusCardState = {};

BonusCardState.create = ({ id, cardKey, isHighlighted = false, store }) => {
  const myId =
    R.isNil(id) && store ? Selector.nextBonusCardId(store.getState()) : id;

  const card = Immutable({
    // Required.
    id: myId,
    cardKey,
    // Situational.
    isHighlighted,
    // Managed.
    cardType: BonusCard.value(cardKey),
  });

  if (store) {
    store.dispatch(ActionCreator.addBonusCard(card));
  }

  return card;
};

BonusCardState.toString = (card) =>
  JSON.stringify(R.pick(["id", "cardKey"], card));

Object.freeze(BonusCardState);

export default BonusCardState;
