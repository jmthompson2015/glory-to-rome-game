import OrderCard from "./OrderCard.js";
import Version from "./Version.js";

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
  assert.equal(properties.count, 3);
  assert.equal(properties.materialKey, "brick");
  assert.equal(properties.materialValue, 2);
  assert.equal(properties.roleKey, "legionary");
  assert.equal(properties.versionKey, undefined);
  assert.equal(properties.key, cardKey);
});

QUnit.test("keys and values", (assert) => {
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
  assert.equal(result.length, 47);
  assert.equal(R.head(result), OrderCard.ACADEMY);
  assert.equal(R.last(result), OrderCard.WALL);
});

QUnit.test("keysByVersion() Imperium", (assert) => {
  // Setup.
  const versionKey = Version.IMPERIUM;

  // Run.
  const result = OrderCard.keysByVersion(versionKey);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 40);
  assert.equal(R.head(result), OrderCard.ACADEMY);
  assert.equal(R.last(result), OrderCard.WALL);
  assert.equal(result.includes(OrderCard.CIRCUS), true);
  assert.equal(result.includes(OrderCard.COLOSSEUM), true);
  assert.equal(result.includes(OrderCard.FORUM), true);
  assert.equal(result.includes(OrderCard.SENATE), true);
});

QUnit.test("keysByVersion() Republic", (assert) => {
  // Setup.
  const versionKey = Version.REPUBLIC;

  // Run.
  const result = OrderCard.keysByVersion(versionKey);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 40);
  assert.equal(R.head(result), OrderCard.ACADEMY);
  assert.equal(R.last(result), OrderCard.WALL);
  assert.equal(result.includes(OrderCard.CRANE), true);
  assert.equal(result.includes(OrderCard.DOMUS_AUREA), true);
  assert.equal(result.includes(OrderCard.FORUM_ROMANUM), true);
  assert.equal(result.includes(OrderCard.TRIBUNAL), true);
});

QUnit.test("valuesByVersion() Imperium", (assert) => {
  // Setup.
  const versionKey = Version.IMPERIUM;

  // Run.
  const result = OrderCard.valuesByVersion(versionKey);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 40);
  assert.equal(R.head(result).key, OrderCard.ACADEMY);
  assert.equal(R.last(result).key, OrderCard.WALL);
});

QUnit.test("valuesByVersion() Republic", (assert) => {
  // Setup.
  const versionKey = Version.REPUBLIC;

  // Run.
  const result = OrderCard.valuesByVersion(versionKey);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 40);
  assert.equal(R.head(result).key, OrderCard.ACADEMY);
  assert.equal(R.last(result).key, OrderCard.WALL);
});

const OrderCardTest = {};
export default OrderCardTest;
