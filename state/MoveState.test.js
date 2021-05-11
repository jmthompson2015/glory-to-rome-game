import MoveState from "./MoveState.js";

QUnit.module("MoveState");

const PROPS = [
  "cardId",
  "materialKey",
  "moveKey",
  "moveStates",
  "playerId",
  "roleKey",
  "structureId",
];

const createTestData = () =>
  MoveState.create({
    cardId: 1,
    materialKey: 2,
    moveKey: 3,
    moveStates: 4,
    playerId: 5,
    roleKey: 6,
    structureId: 7,
  });

QUnit.test("create()", (assert) => {
  // Run.
  const player = createTestData();

  // Verify.
  PROPS.forEach((prop, i) => {
    assert.equal(player[prop], i + 1);
  });
});

const PlayerStateTest = {};
export default PlayerStateTest;
