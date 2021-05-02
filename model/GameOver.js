import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

const GameOver = {};

GameOver.getWinner = (/* state */) => {
  let winnerId;

  // A Catacomb structure is completed.

  // A Forum Romanum structure is completed, and has one of each Clientele and Material.

  return winnerId;
};

GameOver.isGameOver = (store, roundLimit = 100) => {
  // Is there a winner?
  const winnerId = GameOver.getWinner(store.getState());

  if (!R.isNil(winnerId)) {
    store.dispatch(ActionCreator.setWinner(winnerId));
    const player = Selector.player(winnerId);
    store.dispatch(ActionCreator.setUserMessage(`Player ${player.name} won!`));
    return true;
  }

  // Did the draw deck run out?
  if (store.getState().orderDeck.length === 0) {
    store.dispatch(ActionCreator.setUserMessage(`The draw deck ran out.`));
    return true;
  }

  // Did the site cards run out?
  if (store.getState().siteDeck.length === 0) {
    store.dispatch(ActionCreator.setUserMessage(`The site cards ran out.`));
    return true;
  }

  // Did we hit the round limit?
  if (Selector.currentRound(store.getState()) >= roundLimit) {
    store.dispatch(ActionCreator.setUserMessage(`Round limit exceeded.`));
    return true;
  }

  return false;
};

Object.freeze(GameOver);

export default GameOver;
