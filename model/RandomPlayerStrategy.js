import InputValidator from "../utility/InputValidator.js";

const RandomPlayerStrategy = {};

const DELAY = 1000;

const randomElement = (array) =>
  array[Math.floor(Math.random() * array.length)];

const delayedResolve = (choice, resolve, delay = DELAY) => {
  if (delay <= 0) {
    resolve(choice);
  } else {
    setTimeout(() => {
      resolve(choice);
    }, delay);
  }
};

RandomPlayerStrategy.chooseMove = (options, store, delay = DELAY) =>
  new Promise((resolve) => {
    InputValidator.validateNotEmpty("options", options);
    const answer = options.length <= 1 ? options[0] : randomElement(options);
    delayedResolve(answer, resolve, delay);
  });

RandomPlayerStrategy.chooseRole = (options, store, delay = DELAY) =>
  new Promise((resolve) => {
    InputValidator.validateNotEmpty("options", options);
    const answer = options.length <= 1 ? options[0] : randomElement(options);
    delayedResolve(answer, resolve, delay);
  });

Object.freeze(RandomPlayerStrategy);

export default RandomPlayerStrategy;
