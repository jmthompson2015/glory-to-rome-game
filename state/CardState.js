import ActionCreator from "./ActionCreator.js";
import Selector from "./Selector.js";

const CardState = {};

CardState.create = ({
  id,
  cardKey,
  isFaceup = true,
  isHighlighted = false,
  store,
}) => {
  const myId =
    R.isNil(id) && store ? Selector.nextCardId(store.getState()) : id;

  const card = Immutable({
    // Required.
    id: myId,
    cardKey,
    // Situational.
    isFaceup,
    isHighlighted,
  });

  if (store) {
    store.dispatch(ActionCreator.addCard(card));
  }

  return card;
};

CardState.toString = (card) => JSON.stringify(R.pick(["id", "cardKey"], card));

Object.freeze(CardState);

export default CardState;
