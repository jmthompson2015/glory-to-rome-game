import HumanPlayerStrategy from "./HumanPlayerStrategy.js";
import MCTSPlayerStrategy from "./MCTSPlayerStrategy.js";
import RandomPlayerStrategy from "./RandomPlayerStrategy.js";
import StrategyResolver from "./StrategyResolver.js";

QUnit.module("StrategyResolver");

QUnit.test("resolve() HumanPlayerStrategy", (assert) => {
  assert.equal(
    StrategyResolver.resolve("HumanPlayerStrategy"),
    HumanPlayerStrategy
  );
});

QUnit.test("resolve() MCTSPlayerStrategy", (assert) => {
  assert.equal(
    StrategyResolver.resolve("MCTSPlayerStrategy"),
    MCTSPlayerStrategy
  );
});

QUnit.test("resolve() RandomPlayerStrategy", (assert) => {
  assert.equal(
    StrategyResolver.resolve("RandomPlayerStrategy"),
    RandomPlayerStrategy
  );
});

QUnit.test("resolve() ReallyStupidStrategy", (assert) => {
  assert.equal(StrategyResolver.resolve("ReallyStupidStrategy"), undefined);
});

const StrategyResolverTest = {};
export default StrategyResolverTest;
