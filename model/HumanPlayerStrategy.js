import ActionCreator from "../state/ActionCreator.js";

const HumanPlayerStrategy = {};

const cleanup = (resolve, store) => (moveState) => {
  store.dispatch(ActionCreator.setCurrentInputCallback(null));
  store.dispatch(ActionCreator.setCurrentMoves([]));

  resolve(moveState);
};

const chooseOption = (options, store) =>
  new Promise((resolve) => {
    store.dispatch(
      ActionCreator.setCurrentInputCallback(cleanup(resolve, store))
    );
    store.dispatch(ActionCreator.setCurrentMoves(options));
    store.dispatch(ActionCreator.setUserMessage("Select an action."));
  });

HumanPlayerStrategy.chooseArchitectOption = (options, store) =>
  chooseOption(options, store);

HumanPlayerStrategy.chooseCraftsmanOption = (options, store) =>
  chooseOption(options, store);

HumanPlayerStrategy.chooseLaborerOption = (options, store) =>
  chooseOption(options, store);

HumanPlayerStrategy.chooseLegionaryOption = (options, store) =>
  chooseOption(options, store);

HumanPlayerStrategy.chooseMerchantOption = (options, store) =>
  chooseOption(options, store);

HumanPlayerStrategy.choosePatronOption = (options, store) =>
  chooseOption(options, store);

HumanPlayerStrategy.chooseRoleOption = (options, store) =>
  new Promise((resolve) => {
    store.dispatch(
      ActionCreator.setCurrentInputCallback(cleanup(resolve, store))
    );
    store.dispatch(ActionCreator.setCurrentMoves(options));
    store.dispatch(ActionCreator.setUserMessage("Select a role."));
  });

Object.freeze(HumanPlayerStrategy);

export default HumanPlayerStrategy;
