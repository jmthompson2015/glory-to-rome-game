/* eslint no-console: ["error", { allow: ["log", "warn"] }] */

import Material from "./Material.js";

QUnit.module("Material");

QUnit.test("Material properties Brick", (assert) => {
  const materialKey = Material.BRICK;
  const properties = Material.properties[materialKey];
  assert.equal(properties.name, "Brick");
  assert.equal(properties.color, "red");
  assert.equal(properties.key, materialKey);
});

QUnit.test("keys and values", (assert) => {
  // Setup.

  // Run.
  const result = Material.keys();
  const ownPropertyNames = Object.getOwnPropertyNames(Material);

  // Verify.
  R.forEach((key) => {
    const key2 = Material[key];

    if (key !== "properties" && typeof key2 === "string") {
      assert.ok(Material.properties[key2], `Missing value for key = ${key}`);
    }
  }, ownPropertyNames);

  R.forEach((value) => {
    const p = ownPropertyNames.filter((key) => Material[key] === value);

    assert.equal(p.length, 1, `Missing key for value = ${value}`);
  }, result);
});

QUnit.test("keys()", (assert) => {
  // Run.
  const result = Material.keys();

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 6);
  assert.equal(R.head(result), Material.BRICK);
  assert.equal(R.last(result), Material.WOOD);
});

const MaterialTest = {};
export default MaterialTest;
