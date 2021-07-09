import MoveOption from "./MoveOption.js";

QUnit.module("MoveOption");

QUnit.test("MoveOption properties Build a Structure from Hand", (assert) => {
  const moveKey = MoveOption.BUILD_FROM_HAND;
  const properties = MoveOption.properties[moveKey];
  assert.equal(properties.name, "Build a Structure from Hand");
  assert.equal(properties.roleKeys.join(""), "craftsman");
  assert.equal(properties.key, moveKey);
});

QUnit.test("keys and values", (assert) => {
  // Setup.

  // Run.
  const result = MoveOption.keys();
  const ownPropertyNames = Object.getOwnPropertyNames(MoveOption);

  // Verify.
  R.forEach((key) => {
    const key2 = MoveOption[key];

    if (key !== "properties" && typeof key2 === "string") {
      assert.ok(MoveOption.properties[key2], `Missing value for key = ${key}`);
    }
  }, ownPropertyNames);

  R.forEach((value) => {
    const p = ownPropertyNames.filter((key) => MoveOption[key] === value);

    assert.equal(p.length, 1, `Missing key for value = ${value}`);
  }, result);
});

QUnit.test("keys()", (assert) => {
  // Run.
  const result = MoveOption.keys();

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 11);
  assert.equal(R.head(result), MoveOption.BUILD_FROM_HAND);
  assert.equal(R.last(result), MoveOption.SELL_MATERIAL);
});

const MoveOptionTest = {};
export default MoveOptionTest;
