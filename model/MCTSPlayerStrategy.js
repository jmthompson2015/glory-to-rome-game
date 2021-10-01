import InputValidator from "../utility/InputValidator.js";

import MCTSGame from "./MCTSGame.js";

const { MonteCarloTreeSearch } = MCTS;

const MCTSPlayerStrategy = {};

const DELAY = 1000;

const delayedResolve = (choice, resolve, delay = DELAY) => {
  if (delay <= 0) {
    resolve(choice);
  } else {
    setTimeout(() => {
      resolve(choice);
    }, delay);
  }
};

MCTSPlayerStrategy.chooseMove = (
  options,
  store,
  delay = DELAY,
  roundLimit,
  allowedTime
) =>
  new Promise((resolve) => {
    InputValidator.validateNotEmpty("options", options);
    if (options.length <= 1) {
      delayedResolve(options[0], resolve, delay);
    } else {
      const game = new MCTSGame(store.getState());
      const mcts = new MonteCarloTreeSearch({ game });
      const callback = (moveState) => {
        resolve(moveState);
      };
      mcts.execute(roundLimit, allowedTime).then(callback);
    }
  });

MCTSPlayerStrategy.chooseRole = (
  options,
  store,
  delay = DELAY,
  roundLimit,
  allowedTime
) =>
  new Promise((resolve) => {
    InputValidator.validateNotEmpty("options", options);
    if (options.length <= 1) {
      delayedResolve(options[0], resolve, delay);
    } else {
      const game = new MCTSGame(store.getState());
      const mcts = new MonteCarloTreeSearch({ game });
      const callback = (moveState) => {
        resolve(moveState);
      };
      mcts.execute(roundLimit, allowedTime).then(callback);
    }
  });

Object.freeze(MCTSPlayerStrategy);

export default MCTSPlayerStrategy;
