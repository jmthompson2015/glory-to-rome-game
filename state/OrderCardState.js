import OrderCard from "../artifact/OrderCard.js";

import ActionCreator from "./ActionCreator.js";
import Selector from "./Selector.js";

const OrderCardState = {};

OrderCardState.create = ({
  id,
  cardKey,
  isFaceup = true,
  isHighlighted = false,
  store,
}) => {
  const myId =
    R.isNil(id) && store ? Selector.nextOrderCardId(store.getState()) : id;

  const card = Immutable({
    // Required.
    id: myId,
    cardKey,
    // Situational.
    isFaceup,
    isHighlighted,
    // Managed.
    cardType: OrderCard.value(cardKey),
  });

  if (store) {
    store.dispatch(ActionCreator.addOrderCard(card));
  }

  return card;
};

OrderCardState.toString = (card) =>
  JSON.stringify(R.pick(["id", "cardKey"], card));

Object.freeze(OrderCardState);

export default OrderCardState;
