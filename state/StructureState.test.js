import OrderCard from "../artifact/OrderCard.js";
import SiteCard from "../artifact/SiteCard.js";

import CardState from "./CardState.js";
import Reducer from "./Reducer.js";
import StructureState from "./StructureState.js";

QUnit.module("StructureState");

const createTestData = (store) => {
  const foundation = CardState.create({
    id: 2,
    cardKey: OrderCard.ACADEMY,
    store,
  });
  const site = CardState.create({ id: 3, cardKey: SiteCard.BRICK, store });
  const material0 = CardState.create({
    id: 4,
    cardKey: OrderCard.ARCHWAY,
    store,
  });

  return StructureState.create({
    id: 1,
    foundationId: foundation.id,
    siteId: site.id,
    materialIds: [material0.id],
    store,
  });
};

QUnit.test("create()", (assert) => {
  // Setup.

  // Run.
  const result = createTestData();

  // Verify.
  assert.ok(result);
  assert.equal(result.id, 1);
  assert.equal(result.foundationId, 2);
  assert.equal(result.siteId, 3);
  assert.equal(result.materialIds.length, 1);
  assert.equal(R.head(result.materialIds), 4);
});

QUnit.test("create() store", (assert) => {
  // Setup.
  const store = Redux.createStore(Reducer.root);

  // Run.
  const result = createTestData(store);

  // Verify.
  assert.ok(result);
  assert.equal(result.id, 1);
  assert.equal(result.foundationId, 2);
  assert.equal(result.siteId, 3);
  assert.equal(result.materialIds.length, 1);
  assert.equal(R.head(result.materialIds), 4);
  assert.ok(result.foundationType);
  assert.ok(result.siteType);
  const { structureInstances } = store.getState();
  assert.ok(structureInstances);
  assert.equal(Object.keys(structureInstances).length, 1);
});

QUnit.test("create() immutable", (assert) => {
  // Setup.
  const structure = createTestData();

  // Run / Verify.
  try {
    structure.count = 12;
    assert.ok(false, "Should have thrown an exception");
  } catch (e) {
    assert.ok(true);
  }
});

QUnit.test("toString()", (assert) => {
  // Setup.
  const store = Redux.createStore(Reducer.root);
  const structure = createTestData(store);

  // Run.
  const result = StructureState.toString(structure);

  // Verify.
  assert.ok(result);
  assert.equal(
    result,
    `foundation = {"key":"academy","materialKey":"brick"}
site = {"key":"brick","materialKey":"brick"}
materials = {"key":"archway","materialKey":"brick"}`
  );
});

const PlayerStateTest = {};
export default PlayerStateTest;
