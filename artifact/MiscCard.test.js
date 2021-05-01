/* eslint no-console: ["error", { allow: ["log", "warn"] }] */

import MiscCard from "./MiscCard.js";

QUnit.module("MiscCard");

QUnit.test("MiscCard properties Merchant Bonus (Brick)", (assert) => {
  const cardKey = MiscCard.MERCHANT_BONUS_BRICK;
  const properties = MiscCard.properties[cardKey];
  assert.equal(properties.name, "Merchant Bonus (Brick)");
  assert.equal(properties.key, cardKey);
});

QUnit.test("keys and values", (assert) => {
  // Setup.

  // Run.
  const result = MiscCard.keys();
  const ownPropertyNames = Object.getOwnPropertyNames(MiscCard);

  // Verify.
  R.forEach((key) => {
    const key2 = MiscCard[key];

    if (key !== "properties" && typeof key2 === "string") {
      assert.ok(MiscCard.properties[key2], `Missing value for key = ${key}`);
    }
  }, ownPropertyNames);

  R.forEach((value) => {
    const p = ownPropertyNames.filter((key) => MiscCard[key] === value);

    assert.equal(p.length, 1, `Missing key for value = ${value}`);
  }, result);
});

QUnit.test("keys()", (assert) => {
  // Run.
  const result = MiscCard.keys();

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 6);
  assert.equal(R.head(result), MiscCard.MERCHANT_BONUS_BRICK);
  assert.equal(R.last(result), MiscCard.MERCHANT_BONUS_WOOD);
});

const MiscCardTest = {};
export default MiscCardTest;
