import RandomPlayerStrategy from "./RandomPlayerStrategy.js";
import StrategyResolver from "./StrategyResolver.js";

QUnit.module("StrategyResolver");

QUnit.test("resolve()", (assert) => {
  assert.equal(
    StrategyResolver.resolve("RandomPlayerStrategy"),
    RandomPlayerStrategy
  );

  assert.equal(StrategyResolver.resolve("ReallyStupidStrategy"), undefined);
});

const StrategyResolverTest = {};
export default StrategyResolverTest;
