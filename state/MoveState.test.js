import Material from "../artifact/Material.js";
import OrderCard from "../artifact/OrderCard.js";
import Role from "../artifact/Role.js";
import SiteCard from "../artifact/SiteCard.js";

import ActionCreator from "./ActionCreator.js";
import AppState from "./AppState.js";
import MoveState from "./MoveState.js";
import OrderCardState from "./OrderCardState.js";
import PlayerState from "./PlayerState.js";
import Reducer from "./Reducer.js";
import SiteCardState from "./SiteCardState.js";
import StructureState from "./StructureState.js";

QUnit.module("MoveState");

const addOrderCard = (id, cardKey, state) => {
  const card = OrderCardState.create({ id, cardKey });
  const action = ActionCreator.addOrderCard(card);

  return Reducer.root(state, action);
};

const createPlayer = () =>
  PlayerState.create({
    id: 1,
    name: "Bob",
  });

const createStructure = () => {
  const foundation = OrderCardState.create({
    id: 2,
    cardKey: OrderCard.ACADEMY,
  });
  const site = SiteCardState.create({ id: 3, cardKey: SiteCard.BRICK });
  const material0 = OrderCardState.create({
    id: 4,
    cardKey: OrderCard.ARCHWAY,
  });

  return StructureState.create({
    id: 1,
    foundationId: foundation.id,
    siteId: site.id,
    materialIds: [material0.id],
  });
};

QUnit.test("create() 0", (assert) => {
  // Run.
  const move = MoveState.create({
    cardId: 1,
    materialKey: Material.BRICK,
    moveKey: 3,
    moveStates: 4,
    playerId: 5,
    roleKey: Role.ARCHITECT,
    structureId: 7,
  });

  // Verify.
  assert.equal(move.cardId, 1);
  assert.equal(move.materialKey, "brick");
  assert.equal(move.moveKey, 3);
  assert.equal(move.moveStates, 4);
  assert.equal(move.playerId, 5);
  assert.equal(move.roleKey, "architect");
  assert.equal(move.structureId, 7);

  assert.equal(move.cardInstance, undefined);
  assert.equal(move.materialType, Material.value(Material.BRICK));
  assert.equal(move.roleType, Role.value(Role.ARCHITECT));
});

QUnit.test("create() 1", (assert) => {
  // Run.
  const state0 = AppState.create();
  const cardId = 1;
  const cardKey = OrderCard.ACADEMY;
  const playerId = 1;
  const structureId = 1;
  const state1 = addOrderCard(cardId, cardKey, state0);
  const player = createPlayer();
  const action1 = ActionCreator.setPlayers([player]);
  const state2 = Reducer.root(state1, action1);
  const structure = createStructure();
  const action2 = ActionCreator.addStructure(structure);
  const state = Reducer.root(state2, action2);
  const move = MoveState.create({
    cardId,
    materialKey: Material.BRICK,
    moveKey: 3,
    moveStates: 4,
    playerId,
    roleKey: Role.ARCHITECT,
    structureId,
    state,
  });

  // Verify.
  assert.equal(move.cardId, cardId);
  assert.equal(move.materialKey, "brick");
  assert.equal(move.moveKey, 3);
  assert.equal(move.moveStates, 4);
  assert.equal(move.playerId, playerId);
  assert.equal(move.roleKey, "architect");
  assert.equal(move.structureId, structureId);

  assert.ok(move.cardInstance);
  assert.equal(move.cardInstance.id, cardId);
  assert.equal(move.materialType, Material.value(Material.BRICK));
  assert.ok(move.playerInstance);
  assert.equal(move.playerInstance.id, playerId);
  assert.equal(move.roleType, Role.value(Role.ARCHITECT));
  assert.ok(move.structureInstance);
  assert.equal(move.structureInstance.id, structureId);
});

const PlayerStateTest = {};
export default PlayerStateTest;
