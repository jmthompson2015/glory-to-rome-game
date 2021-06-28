import SiteCardState from "./SiteCardState.js";

QUnit.module("SiteCardState");

const createTestData = () =>
  SiteCardState.create({
    id: 1,
    cardKey: 2,
    isHighlighted: 3,
  });

QUnit.test("create()", (assert) => {
  // Run.
  const result = createTestData();

  // Verify.
  assert.ok(result);
  assert.equal(result.id, 1);
  assert.equal(result.cardKey, 2);
  assert.equal(result.isHighlighted, 3);
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
  const result = SiteCardState.toString(card);

  // Verify.
  assert.ok(result);
  assert.equal(result, '{"id":1,"cardKey":2}');
});

const SiteCardStateTest = {};
export default SiteCardStateTest;
