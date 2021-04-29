/* eslint no-console: ["error", { allow: ["error"] }] */

import RandomPlayerStrategy from "./RandomPlayerStrategy.js";

const StrategyResolver = {};

StrategyResolver.resolve = (strategyName) =>
  R.cond([
    [R.equals("RandomPlayerStrategy"), R.always(RandomPlayerStrategy)],
    [R.T, (name) => console.error(`Unknown agent strategy ${name}`)],
  ])(strategyName);

Object.freeze(StrategyResolver);

export default StrategyResolver;
