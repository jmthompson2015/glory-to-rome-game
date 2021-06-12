/* eslint no-console: ["error", { allow: ["log", "warn"] }] */

import Role from "./Role.js";

QUnit.module("Role");

QUnit.test("Role properties Architect", (assert) => {
  const roleKey = Role.ARCHITECT;
  const properties = Role.properties[roleKey];
  assert.equal(properties.name, "Architect");
  assert.equal(properties.color, "gray");
  assert.equal(properties.key, roleKey);
});

QUnit.test("keys and values", (assert) => {
  // Setup.

  // Run.
  const result = Role.keys();
  const ownPropertyNames = Object.getOwnPropertyNames(Role);

  // Verify.
  R.forEach((key) => {
    const key2 = Role[key];

    if (key !== "properties" && typeof key2 === "string") {
      assert.ok(Role.properties[key2], `Missing value for key = ${key}`);
    }
  }, ownPropertyNames);

  R.forEach((value) => {
    const p = ownPropertyNames.filter((key) => Role[key] === value);

    assert.equal(p.length, 1, `Missing key for value = ${value}`);
  }, result);
});

QUnit.test("keys()", (assert) => {
  // Run.
  const result = Role.keys();

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 7);
  assert.equal(R.head(result), Role.ARCHITECT);
  assert.equal(R.last(result), Role.THINKER);
});

const RoleTest = {};
export default RoleTest;
