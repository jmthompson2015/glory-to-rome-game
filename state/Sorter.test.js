import Material from "../artifact/Material.js";
import OrderCard from "../artifact/OrderCard.js";
import Role from "../artifact/Role.js";
import SiteCard from "../artifact/SiteCard.js";

import MoveState from "./MoveState.js";
import OrderCardState from "./OrderCardState.js";
import SiteCardState from "./SiteCardState.js";
import Sorter from "./Sorter.js";

QUnit.module("Sorter");

const createCard1 = () =>
  OrderCardState.create({ id: 1, cardKey: OrderCard.ACADEMY }); // Legionary 2

const createCard2 = () =>
  OrderCardState.create({ id: 2, cardKey: OrderCard.JACK1 });

const createCard3 = () =>
  OrderCardState.create({ id: 3, cardKey: OrderCard.CATACOMB }); // Merchant 3

const createCard4 = () =>
  OrderCardState.create({ id: 4, cardKey: OrderCard.BAR }); // Laborer 1

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

const createSite1 = () =>
  SiteCardState.create({ id: 1, cardKey: SiteCard.BRICK }); // 2

const createSite2 = () =>
  SiteCardState.create({ id: 2, cardKey: SiteCard.MARBLE }); // 3

const createSite3 = () =>
  SiteCardState.create({ id: 3, cardKey: SiteCard.RUBBLE }); // 1

QUnit.test("Move.materialRoleSort()", (assert) => {
  // Setup.
  const move1 = createMove1();
  const move2 = createMove2();
  const move3 = createMove3();
  const move4 = createMove4();
  const moveStates = [move1, move2, move3, move4];

  // Run.
  const result = Sorter.Move.materialRoleSort(moveStates);

  // Verify.
  assert.ok(result);
  assert.equal(R.map((c) => c.cardId, result).join(", "), "4, 1, 3, 2");
});

QUnit.test("Move.roleMaterialSort()", (assert) => {
  // Setup.
  const move1 = createMove1();
  const move2 = createMove2();
  const move3 = createMove3();
  const move4 = createMove4();
  const moveStates = [move1, move2, move3, move4];

  // Run.
  const result = Sorter.Move.roleMaterialSort(moveStates);

  // Verify.
  assert.ok(result);
  assert.equal(R.map((c) => c.cardId, result).join(", "), "1, 2, 4, 3");
});

QUnit.test("Order.roleNameSort()", (assert) => {
  // Setup.
  const card1 = createCard1();
  const card2 = createCard2();
  const card3 = createCard3();
  const card4 = createCard4();
  const cardStates = [card1, card2, card3, card4];

  // Run.
  const result = Sorter.Order.roleNameSort(cardStates);

  // Verify.
  assert.ok(result);
  assert.equal(R.map((c) => c.id, result).join(", "), "4, 1, 3, 2");
});

QUnit.test("Order.valueMaterialSort()", (assert) => {
  // Setup.
  const card1 = createCard1();
  const card3 = createCard3();
  const card4 = createCard4();
  const cardStates = [card1, card3, card4];

  // Run.
  const result = Sorter.Order.valueMaterialSort(cardStates);

  // Verify.
  assert.ok(result);
  assert.equal(R.map((c) => c.id, result).join(", "), "4, 1, 3");
});

QUnit.test("Site.valueMaterialSort()", (assert) => {
  // Setup.
  const card1 = createSite1();
  const card2 = createSite2();
  const card3 = createSite3();
  const cardStates = [card1, card2, card3];

  // Run.
  const result = Sorter.Order.valueMaterialSort(cardStates);

  // Verify.
  assert.ok(result);
  assert.equal(R.map((c) => c.id, result).join(", "), "3, 1, 2");
});

const SorterTest = {};
export default SorterTest;
