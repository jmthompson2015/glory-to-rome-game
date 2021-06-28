import SiteCard from "../artifact/SiteCard.js";

import ActionCreator from "./ActionCreator.js";
import Selector from "./Selector.js";

const SiteCardState = {};

SiteCardState.create = ({ id, cardKey, isHighlighted = false, store }) => {
  const myId =
    R.isNil(id) && store ? Selector.nextSiteCardId(store.getState()) : id;

  const card = Immutable({
    // Required.
    id: myId,
    cardKey,
    // Situational.
    isHighlighted,
    // Managed.
    cardType: SiteCard.value(cardKey),
  });

  if (store) {
    store.dispatch(ActionCreator.addSiteCard(card));
  }

  return card;
};

SiteCardState.toString = (card) =>
  JSON.stringify(R.pick(["id", "cardKey"], card));

Object.freeze(SiteCardState);

export default SiteCardState;
