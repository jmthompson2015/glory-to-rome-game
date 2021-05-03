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

RandomPlayerStrategy.chooseArchitectOption = (options, state, delay = DELAY) =>
  new Promise((resolve) => {
    const answer = options.length <= 1 ? options[0] : randomElement(options);
    delayedResolve(answer, resolve, delay);
  });

RandomPlayerStrategy.chooseCraftsmanOption = (options, state, delay = DELAY) =>
  new Promise((resolve) => {
    const answer = options.length <= 1 ? options[0] : randomElement(options);
    delayedResolve(answer, resolve, delay);
  });

RandomPlayerStrategy.chooseLaborerOption = (options, state, delay = DELAY) =>
  new Promise((resolve) => {
    const answer = options.length <= 1 ? options[0] : randomElement(options);
    delayedResolve(answer, resolve, delay);
  });

RandomPlayerStrategy.chooseLegionaryOption = (options, state, delay = DELAY) =>
  new Promise((resolve) => {
    const answer = options.length <= 1 ? options[0] : randomElement(options);
    delayedResolve(answer, resolve, delay);
  });

RandomPlayerStrategy.chooseMerchantOption = (options, state, delay = DELAY) =>
  new Promise((resolve) => {
    const answer = options.length <= 1 ? options[0] : randomElement(options);
    delayedResolve(answer, resolve, delay);
  });

RandomPlayerStrategy.choosePatronOption = (options, state, delay = DELAY) =>
  new Promise((resolve) => {
    const answer = options.length <= 1 ? options[0] : randomElement(options);
    delayedResolve(answer, resolve, delay);
  });

RandomPlayerStrategy.chooseRoleOption = (options, state, delay = DELAY) =>
  new Promise((resolve) => {
    const answer = options.length <= 1 ? options[0] : randomElement(options);
    delayedResolve(answer, resolve, delay);
  });

RandomPlayerStrategy.chooseThinkerOption = (options, state, delay = DELAY) =>
  new Promise((resolve) => {
    const answer = options.length <= 1 ? options[0] : randomElement(options);
    delayedResolve(answer, resolve, delay);
  });

Object.freeze(RandomPlayerStrategy);

export default RandomPlayerStrategy;
