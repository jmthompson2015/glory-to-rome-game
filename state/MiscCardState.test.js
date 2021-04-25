import MiscCardState from "./MiscCardState.js";

QUnit.module("MiscCardState");

const createTestData = () =>
  MiscCardState.create({
    id: 1,
    cardKey: 2,
    isFaceup: 3,
    isHighlighted: 4,
  });

QUnit.test("create()", (assert) => {
  // Run.
  const result = createTestData();

  // Verify.
  assert.ok(result);
  assert.equal(result.id, 1);
  assert.equal(result.cardKey, 2);
  assert.equal(result.isFaceup, 3);
  assert.equal(result.isHighlighted, 4);
});

QUnit.test("create() immutable", (assert) => {
  // Setup.
  const card = createTestData();

  // Run / Verify.
  try {
    card.count = 12;
    assert.ok(false, "Should have thrown an exception");
  } catch (e) {
    assert.ok(true);
  }
});

QUnit.test("toString()", (assert) => {
  // Setup.
  const card = createTestData();

  // Run.
  const result = MiscCardState.toString(card);

  // Verify.
  assert.ok(result);
  assert.equal(result, '{"id":1,"cardKey":2}');
});

const MiscCardStateTest = {};
export default MiscCardStateTest;
