/* eslint no-console: ["error", { allow: ["warn"] }] */

const PromiseUtilities = {};

// tasks - an array of promises to execute in order.
// see https://bigcodenerd.org/resolving-promises-sequentially-javascript/
PromiseUtilities.allSequential = (tasks) => {
  const reduceFunction = (previous, task) =>
    previous.then(task).catch((error) => {
      console.warn("Error", error.message);
    });

  return tasks.reduce(reduceFunction, Promise.resolve());
};

Object.freeze(PromiseUtilities);

export default PromiseUtilities;
