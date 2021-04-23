/* eslint no-console: ["error", { allow: ["log", "warn"] }] */

import OrderCard from "./OrderCard.js";

QUnit.module("OrderCard");

QUnit.test("OrderCard properties Academy", (assert) => {
  const cardKey = OrderCard.ACADEMY;
  const properties = OrderCard.properties[cardKey];
  assert.equal(properties.name, "Academy");
  assert.equal(
    properties.ability,
    "You may perform one THINKER action after any turn during which you performed " +
      "at least on CRAFTSMAN action."
  );
  assert.equal(properties.materialKey, "brick");
  assert.equal(properties.materialValue, 2);
  assert.equal(properties.roleKey, "legionary");
  assert.equal(properties.key, cardKey);
});

QUnit.test("keys and values", (assert) => {
  // Setup.

  // Run.
  const result = OrderCard.keys();
  const ownPropertyNames = Object.getOwnPropertyNames(OrderCard);

  // Verify.
  R.forEach((key) => {
    const key2 = OrderCard[key];

    if (key !== "properties" && typeof key2 === "string") {
      assert.ok(OrderCard.properties[key2], `Missing value for key = ${key}`);
    }
  }, ownPropertyNames);

  R.forEach((value) => {
    const p = ownPropertyNames.filter((key) => OrderCard[key] === value);

    assert.equal(p.length, 1, `Missing key for value = ${value}`);
  }, result);
});

QUnit.test("keys()", (assert) => {
  // Run.
  const result = OrderCard.keys();

  // Verify.
  assert.ok(result);
  const length = 44;
  assert.equal(result.length, length);
  assert.equal(R.head(result), OrderCard.ACADEMY);
  assert.equal(R.last(result), OrderCard.WALL);
});

const OrderCardTest = {};
export default OrderCardTest;
