import Material from "../artifact/Material.js";
import OrderCard from "../artifact/OrderCard.js";
import Role from "../artifact/Role.js";

import MoveState from "./MoveState.js";
import OrderCardState from "./OrderCardState.js";
import Sorter from "./Sorter.js";

QUnit.module("Sorter");

const createCard1 = () =>
  OrderCardState.create({ id: 1, cardKey: OrderCard.ACADEMY }); // Legionary

const createCard2 = () =>
  OrderCardState.create({ id: 2, cardKey: OrderCard.JACK1 });

const createCard3 = () =>
  OrderCardState.create({ id: 3, cardKey: OrderCard.CATACOMB }); // Merchant

const createCard4 = () =>
  OrderCardState.create({ id: 4, cardKey: OrderCard.BAR }); // Laborer

const createMove1 = () =>
  MoveState.create({
    cardId: 1,
    materialKey: Material.CONCRETE,
    roleKey: Role.ARCHITECT,
  });

const createMove2 = () =>
  MoveState.create({
    cardId: 2,
    materialKey: Material.RUBBLE,
    roleKey: Role.LABORER,
  });

const createMove3 = () =>
  MoveState.create({
    cardId: 3,
    materialKey: Material.MARBLE,
    roleKey: Role.PATRON,
  });

const createMove4 = () =>
  MoveState.create({
    cardId: 4,
    materialKey: Material.BRICK,
    roleKey: Role.LEGIONARY,
  });

QUnit.test("moveMaterialRoleSort()", (assert) => {
  // Setup.
  const move1 = createMove1();
  const move2 = createMove2();
  const move3 = createMove3();
  const move4 = createMove4();
  const moveStates = [move1, move2, move3, move4];

  // Run.
  const result = Sorter.moveMaterialRoleSort(moveStates);

  // Verify.
  assert.ok(result);
  assert.equal(R.map((c) => c.cardId, result).join(", "), "4, 1, 3, 2");
});

QUnit.test("moveRoleMaterialSort()", (assert) => {
  // Setup.
  const move1 = createMove1();
  const move2 = createMove2();
  const move3 = createMove3();
  const move4 = createMove4();
  const moveStates = [move1, move2, move3, move4];

  // Run.
  const result = Sorter.moveRoleMaterialSort(moveStates);

  // Verify.
  assert.ok(result);
  assert.equal(R.map((c) => c.cardId, result).join(", "), "1, 2, 4, 3");
});

QUnit.test("orderRoleNameSort()", (assert) => {
  // Setup.
  const card1 = createCard1();
  const card2 = createCard2();
  const card3 = createCard3();
  const card4 = createCard4();
  const cardStates = [card1, card2, card3, card4];

  // Run.
  const result = Sorter.orderRoleNameSort(cardStates);

  // Verify.
  assert.ok(result);
  assert.equal(R.map((c) => c.id, result).join(", "), "4, 1, 3, 2");
});

const SorterTest = {};
export default SorterTest;
