/* eslint no-console: ["error", { allow: ["log", "warn"] }] */

import SiteCard from "./SiteCard.js";

QUnit.module("SiteCard");

QUnit.test("SiteCard properties Brick", (assert) => {
  const cardKey = SiteCard.BRICK;
  const properties = SiteCard.properties[cardKey];
  assert.equal(properties.name, "Brick");
  assert.equal(properties.materialKey, "brick");
  assert.equal(properties.materialValue, 2);
  assert.equal(properties.key, cardKey);
});

QUnit.test("keys and values", (assert) => {
  // Setup.

  // Run.
  const result = SiteCard.keys();
  const ownPropertyNames = Object.getOwnPropertyNames(SiteCard);

  // Verify.
  R.forEach((key) => {
    const key2 = SiteCard[key];

    if (key !== "properties" && typeof key2 === "string") {
      assert.ok(SiteCard.properties[key2], `Missing value for key = ${key}`);
    }
  }, ownPropertyNames);

  R.forEach((value) => {
    const p = ownPropertyNames.filter((key) => SiteCard[key] === value);

    assert.equal(p.length, 1, `Missing key for value = ${value}`);
  }, result);
});

QUnit.test("keys()", (assert) => {
  // Run.
  const result = SiteCard.keys();

  // Verify.
  assert.ok(result);
  const length = 6;
  assert.equal(result.length, length);
  assert.equal(R.head(result), SiteCard.BRICK);
  assert.equal(R.last(result), SiteCard.WOOD);
});

const SiteCardTest = {};
export default SiteCardTest;
