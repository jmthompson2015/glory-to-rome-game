import Phase from "../artifact/Phase.js";

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

import GameOver from "./GameOver.js";
import StepFunction from "./StepFunction.js";

const GameFunction = {};

GameFunction.isGameOver = (store) => GameOver.isGameOver(store);

GameFunction.phaseKeys = () => Phase.keys();

GameFunction.phaseEnd = (store) => {
  if (Selector.currentPhaseKey(store.getState()) === Phase.PERFORM_ROLE) {
    const forEachFunction = (playerId) => {
      const campIds = Selector.campIds(playerId, store.getState());

      if (!R.isEmpty(campIds)) {
        const cardId = R.head(campIds);

        if (Selector.isJack(cardId, store.getState())) {
          store.dispatch(ActionCreator.transferCampToJack(playerId, cardId));
        } else {
          store.dispatch(ActionCreator.transferCampToPool(playerId, cardId));
        }
      }
    };
    const currentPlayerOrder = Selector.currentPlayerOrder(store.getState());
    R.forEach(forEachFunction, currentPlayerOrder);

    store.dispatch(ActionCreator.setLeadRole(null));
    store.dispatch(ActionCreator.setLeader(currentPlayerOrder[1]));
  }

  return Promise.resolve();
};

GameFunction.turnEnd = (store) => {
  if (Selector.currentPhaseKey(store.getState()) === Phase.PERFORM_ROLE) {
    store.dispatch(ActionCreator.setCurrentInputCallback(null));
    store.dispatch(ActionCreator.setCurrentMoves([]));
  }

  return Promise.resolve();
};

GameFunction.stepFunction = StepFunction.execute;

Object.freeze(GameFunction);

export default GameFunction;
