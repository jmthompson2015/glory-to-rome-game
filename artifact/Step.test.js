import Step from "./Step.js";

QUnit.module("Step");

QUnit.test("keys and values", (assert) => {
  // Run.
  const result = Step.keys();
  const ownPropertyNames = Object.getOwnPropertyNames(Step);

  // Verify.
  ownPropertyNames.forEach((key) => {
    const key2 = Step[key];

    if (key !== "properties" && typeof key2 === "string") {
      assert.ok(Step.properties[key2], `Missing value for key = ${key}`);
    }
  });

  result.forEach((value) => {
    const p = ownPropertyNames.filter((key) => Step[key] === value);
    assert.equal(p.length, 1, `Missing key for value = ${value}`);
  });
});

QUnit.test("keys()", (assert) => {
  // Run.
  const result = Step.keys();

  // Verify.
  assert.ok(result);
  const length = 3;
  assert.equal(result.length, length);
  assert.equal(R.head(result), Step.DECLARE_ROLE);
  assert.equal(R.last(result), Step.CLEANUP);
});

const StepTest = {};
export default StepTest;
