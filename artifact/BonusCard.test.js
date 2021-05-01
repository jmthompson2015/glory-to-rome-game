/* eslint no-console: ["error", { allow: ["log", "warn"] }] */

import BonusCard from "./BonusCard.js";

QUnit.module("BonusCard");

QUnit.test("BonusCard properties Merchant Bonus (Brick)", (assert) => {
  const cardKey = BonusCard.MERCHANT_BONUS_BRICK;
  const properties = BonusCard.properties[cardKey];
  assert.equal(properties.name, "Merchant Bonus (Brick)");
  assert.equal(properties.key, cardKey);
});

QUnit.test("keys and values", (assert) => {
  // Setup.

  // Run.
  const result = BonusCard.keys();
  const ownPropertyNames = Object.getOwnPropertyNames(BonusCard);

  // Verify.
  R.forEach((key) => {
    const key2 = BonusCard[key];

    if (key !== "properties" && typeof key2 === "string") {
      assert.ok(BonusCard.properties[key2], `Missing value for key = ${key}`);
    }
  }, ownPropertyNames);

  R.forEach((value) => {
    const p = ownPropertyNames.filter((key) => BonusCard[key] === value);

    assert.equal(p.length, 1, `Missing key for value = ${value}`);
  }, result);
});

QUnit.test("keys()", (assert) => {
  // Run.
  const result = BonusCard.keys();

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 6);
  assert.equal(R.head(result), BonusCard.MERCHANT_BONUS_BRICK);
  assert.equal(R.last(result), BonusCard.MERCHANT_BONUS_WOOD);
});

const BonusCardTest = {};
export default BonusCardTest;
