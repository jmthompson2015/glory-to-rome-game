import Phase from "./Phase.js";

QUnit.module("Phase");

QUnit.test("keys and values", (assert) => {
  // Run.
  const result = Phase.keys();
  const ownPropertyNames = Object.getOwnPropertyNames(Phase);

  // Verify.
  ownPropertyNames.forEach((key) => {
    const key2 = Phase[key];

    if (key !== "properties" && typeof key2 === "string") {
      assert.ok(Phase.properties[key2], `Missing value for key = ${key}`);
    }
  });

  result.forEach((value) => {
    const p = ownPropertyNames.filter((key) => Phase[key] === value);
    assert.equal(p.length, 1, `Missing key for value = ${value}`);
  });
});

QUnit.test("keys()", (assert) => {
  // Run.
  const result = Phase.keys();

  // Verify.
  assert.ok(result);
  const length = 2;
  assert.equal(result.length, length);
  assert.equal(R.head(result), Phase.DECLARE_ROLE);
  assert.equal(R.last(result), Phase.PERFORM_ROLE);
});

const PhaseTest = {};
export default PhaseTest;
