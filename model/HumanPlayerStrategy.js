import ActionCreator from "../state/ActionCreator.js";

const HumanPlayerStrategy = {};

const cleanup = (resolve, store) => (moveState) => {
  store.dispatch(ActionCreator.setCurrentInputCallback(null));
  store.dispatch(ActionCreator.setCurrentMoves([]));

  resolve(moveState);
};

HumanPlayerStrategy.chooseMove = (options, store) =>
  new Promise((resolve) => {
    store.dispatch(
      ActionCreator.setCurrentInputCallback(cleanup(resolve, store))
    );
    store.dispatch(ActionCreator.setCurrentMoves(options));
    store.dispatch(ActionCreator.setUserMessage("Select an action."));
  });

HumanPlayerStrategy.chooseRole = (options, store) =>
  new Promise((resolve) => {
    store.dispatch(
      ActionCreator.setCurrentInputCallback(cleanup(resolve, store))
    );
    store.dispatch(ActionCreator.setCurrentMoves(options));
    store.dispatch(ActionCreator.setUserMessage("Select a role."));
  });

Object.freeze(HumanPlayerStrategy);

export default HumanPlayerStrategy;
