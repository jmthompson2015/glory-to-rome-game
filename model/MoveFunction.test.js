/* eslint no-console: ["error", { allow: ["log"] }] */

import Material from "../artifact/Material.js";
import MoveOption from "../artifact/MoveOption.js";
import Role from "../artifact/Role.js";
import Phase from "../artifact/Phase.js";

import ActionCreator from "../state/ActionCreator.js";
import MoveState from "../state/MoveState.js";

import MoveFunction from "./MoveFunction.js";
import TestData from "./TestData.js";

QUnit.module("MoveFunction");

QUnit.test("isLegal() Draw a Card", (assert) => {
  // Setup.
  const moveKey = MoveOption.DRAW_CARD;
  const leaderId = 1;
  const roleKey = Role.THINKER;
  const playerId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(leaderId));
  store.dispatch(ActionCreator.setCurrentPhase(Phase.DECLARE_ROLE));
  console.log(`Order Deck`);

  // Run / Verify.
  assert.equal(
    MoveFunction.isLegal(moveKey, playerId, store.getState()),
    false
  );

  // Setup.
  store.dispatch(ActionCreator.setLeadRole(roleKey));

  // Run / Verify.
  assert.equal(MoveFunction.isLegal(moveKey, playerId, store.getState()), true);
});

QUnit.test("isLegal() Draw a Jack", (assert) => {
  // Setup.
  const moveKey = MoveOption.DRAW_JACK;
  const leaderId = 1;
  const roleKey = Role.THINKER;
  const playerId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(leaderId));
  store.dispatch(ActionCreator.setCurrentPhase(Phase.DECLARE_ROLE));
  console.log(`Order Deck`);

  // Run / Verify.
  assert.equal(
    MoveFunction.isLegal(moveKey, playerId, store.getState()),
    false
  );

  // Setup.
  store.dispatch(ActionCreator.setLeadRole(roleKey));

  // Run / Verify.
  assert.equal(MoveFunction.isLegal(moveKey, playerId, store.getState()), true);
});

QUnit.test("isLegal() Gather Material", (assert) => {
  // Setup.
  const moveKey = MoveOption.GATHER_MATERIAL;
  const leaderId = 1;
  const roleKey = Role.LABORER;
  const playerId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(leaderId));
  store.dispatch(ActionCreator.setCurrentPhase(Phase.DECLARE_ROLE));
  console.log(`Order Deck`);

  // Run / Verify.
  assert.equal(
    MoveFunction.isLegal(moveKey, playerId, store.getState()),
    false
  );

  // Setup.
  store.dispatch(ActionCreator.setLeadRole(roleKey));

  // Run / Verify.
  assert.equal(MoveFunction.isLegal(moveKey, playerId, store.getState()), true);
});

QUnit.test("isLegal() Refill Hand", (assert) => {
  // Setup.
  const moveKey = MoveOption.REFILL_HAND;
  const leaderId = 1;
  const roleKey = Role.THINKER;
  const playerId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(leaderId));
  store.dispatch(ActionCreator.setCurrentPhase(Phase.DECLARE_ROLE));
  console.log(`Hand`);

  // Run / Verify.
  assert.equal(
    MoveFunction.isLegal(moveKey, playerId, store.getState()),
    false
  );

  // Setup.
  store.dispatch(ActionCreator.setLeadRole(roleKey));

  // Run / Verify.
  assert.equal(
    MoveFunction.isLegal(moveKey, playerId, store.getState()),
    false
  );

  // Setup.
  store.dispatch(ActionCreator.transferHandToCamp(playerId, 2));

  // Run / Verify.
  assert.equal(MoveFunction.isLegal(moveKey, playerId, store.getState()), true);
});

QUnit.test("isLegal() Sell Material", (assert) => {
  // Setup.
  const moveKey = MoveOption.SELL_MATERIAL;
  const leaderId = 1;
  const roleKey = Role.MERCHANT;
  const playerId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(leaderId));
  store.dispatch(ActionCreator.setCurrentPhase(Phase.DECLARE_ROLE));

  // Run / Verify.
  assert.equal(
    MoveFunction.isLegal(moveKey, playerId, store.getState()),
    false
  );

  // Setup.
  store.dispatch(ActionCreator.setLeadRole(roleKey));

  // Run / Verify.
  assert.equal(
    MoveFunction.isLegal(moveKey, playerId, store.getState()),
    false
  );

  // Setup.
  store.dispatch(ActionCreator.transferHandToStockpile(playerId, 2, playerId));

  // Run / Verify.
  assert.equal(MoveFunction.isLegal(moveKey, playerId, store.getState()), true);
});

QUnit.test("label() Build a Structure from Hand", (assert) => {
  // Setup.
  const leaderId = 1;
  const currentPhaseKey = Phase.DECLARE_ROLE;
  const roleKey = Role.CRAFTSMAN;
  const playerId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(leaderId));
  store.dispatch(ActionCreator.setCurrentPhase(currentPhaseKey));
  store.dispatch(ActionCreator.setLeadRole(roleKey));
  const state = store.getState();
  const move = MoveState.create({
    cardId: 2,
    materialKey: Material.BRICK,
    moveKey: MoveOption.BUILD_FROM_HAND,
    playerId,
    roleKey,
    state,
    structureId: 1,
  });

  // Run.
  const result = MoveFunction.label(move, currentPhaseKey, roleKey);

  // Verify.
  assert.ok(result);
  assert.equal(
    result,
    "Build a Structure from Hand (Academy Craftsman Brick 2)"
  );
});

QUnit.test("label() Build a Structure from Stockpile", (assert) => {
  // Setup.
  const leaderId = 1;
  const currentPhaseKey = Phase.DECLARE_ROLE;
  const roleKey = Role.ARCHITECT;
  const playerId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(leaderId));
  store.dispatch(ActionCreator.setCurrentPhase(currentPhaseKey));
  store.dispatch(ActionCreator.setLeadRole(roleKey));
  const state = store.getState();
  const move = MoveState.create({
    cardId: 2,
    materialKey: Material.BRICK,
    moveKey: MoveOption.BUILD_FROM_STOCKPILE,
    playerId,
    roleKey,
    state,
    structureId: 1,
  });

  // Run.
  const result = MoveFunction.label(move, currentPhaseKey, roleKey);

  // Verify.
  assert.ok(result);
  assert.equal(
    result,
    "Build a Structure from Stockpile (Academy Architect Brick 2)"
  );
});

QUnit.test("label() Demand Material", (assert) => {
  // Setup.
  const leaderId = 1;
  const currentPhaseKey = Phase.DECLARE_ROLE;
  const roleKey = Role.LEGIONARY;
  const playerId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(leaderId));
  store.dispatch(ActionCreator.setCurrentPhase(currentPhaseKey));
  store.dispatch(ActionCreator.setLeadRole(roleKey));
  const state = store.getState();
  const move = MoveState.create({
    cardId: 2,
    materialKey: Material.BRICK,
    moveKey: MoveOption.DEMAND_MATERIAL,
    playerId,
    roleKey,
    state,
  });

  // Run.
  const result = MoveFunction.label(move, currentPhaseKey, roleKey);

  // Verify.
  assert.ok(result);
  assert.equal(result, "Demand Material (Academy Legionary Brick 2)");
});

QUnit.test("label() Draw a Card", (assert) => {
  // Setup.
  const leaderId = 1;
  const currentPhaseKey = Phase.DECLARE_ROLE;
  const roleKey = Role.THINKER;
  const playerId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(leaderId));
  store.dispatch(ActionCreator.setCurrentPhase(currentPhaseKey));
  store.dispatch(ActionCreator.setLeadRole(roleKey));
  const state = store.getState();
  const move = MoveState.create({
    cardId: 2,
    materialKey: Material.BRICK,
    moveKey: MoveOption.DRAW_CARD,
    playerId,
    roleKey,
    state,
  });

  // Run.
  const result = MoveFunction.label(move, currentPhaseKey, roleKey);

  // Verify.
  assert.ok(result);
  assert.equal(result, "Thinker Draw a Card");
});

QUnit.test("label() Draw a Jack", (assert) => {
  // Setup.
  const leaderId = 1;
  const currentPhaseKey = Phase.DECLARE_ROLE;
  const roleKey = Role.THINKER;
  const playerId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(leaderId));
  store.dispatch(ActionCreator.setCurrentPhase(currentPhaseKey));
  store.dispatch(ActionCreator.setLeadRole(roleKey));
  const state = store.getState();
  const move = MoveState.create({
    cardId: 2,
    materialKey: Material.BRICK,
    moveKey: MoveOption.DRAW_JACK,
    playerId,
    roleKey,
    state,
  });

  // Run.
  const result = MoveFunction.label(move, currentPhaseKey, roleKey);

  // Verify.
  assert.ok(result);
  assert.equal(result, "Thinker Draw a Jack");
});

QUnit.test("label() Gather Material", (assert) => {
  // Setup.
  const leaderId = 1;
  const currentPhaseKey = Phase.DECLARE_ROLE;
  const roleKey = Role.LABORER;
  const playerId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(leaderId));
  store.dispatch(ActionCreator.setCurrentPhase(currentPhaseKey));
  store.dispatch(ActionCreator.setLeadRole(roleKey));
  const state = store.getState();
  const move = MoveState.create({
    cardId: 2,
    materialKey: Material.BRICK,
    moveKey: MoveOption.GATHER_MATERIAL,
    playerId,
    roleKey,
    state,
  });

  // Run.
  const result = MoveFunction.label(move, currentPhaseKey, roleKey);

  // Verify.
  assert.ok(result);
  assert.equal(result, "Gather Material (Academy Laborer Brick 2)");
});

QUnit.test("label() Hire a Client", (assert) => {
  // Setup.
  const leaderId = 1;
  const currentPhaseKey = Phase.DECLARE_ROLE;
  const roleKey = Role.PATRON;
  const playerId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(leaderId));
  store.dispatch(ActionCreator.setCurrentPhase(currentPhaseKey));
  store.dispatch(ActionCreator.setLeadRole(roleKey));
  const state = store.getState();
  const move = MoveState.create({
    cardId: 2,
    materialKey: Material.BRICK,
    moveKey: MoveOption.HIRE_CLIENT,
    playerId,
    roleKey,
    state,
  });

  // Run.
  const result = MoveFunction.label(move, currentPhaseKey, roleKey);

  // Verify.
  assert.ok(result);
  assert.equal(result, "Hire a Client (Academy Patron Brick 2)");
});

QUnit.test("label() Lay a Foundation", (assert) => {
  // Setup.
  const leaderId = 1;
  const currentPhaseKey = Phase.DECLARE_ROLE;
  const roleKey = Role.ARCHITECT;
  const playerId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(leaderId));
  store.dispatch(ActionCreator.setCurrentPhase(currentPhaseKey));
  store.dispatch(ActionCreator.setLeadRole(roleKey));
  const state = store.getState();
  const move = MoveState.create({
    cardId: 2,
    materialKey: Material.BRICK,
    moveKey: MoveOption.LAY_FOUNDATION,
    playerId,
    roleKey,
    state,
  });

  // Run.
  const result = MoveFunction.label(move, currentPhaseKey, roleKey);

  // Verify.
  assert.ok(result);
  assert.equal(result, "Lay a Foundation (Academy Architect Brick 2)");
});

QUnit.test("label() Refill Hand", (assert) => {
  // Setup.
  const leaderId = 1;
  const currentPhaseKey = Phase.DECLARE_ROLE;
  const roleKey = Role.THINKER;
  const playerId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(leaderId));
  store.dispatch(ActionCreator.setCurrentPhase(currentPhaseKey));
  store.dispatch(ActionCreator.setLeadRole(roleKey));
  const state = store.getState();
  const move = MoveState.create({
    cardId: 2,
    materialKey: Material.BRICK,
    moveKey: MoveOption.REFILL_HAND,
    playerId,
    roleKey,
    state,
  });

  // Run.
  const result = MoveFunction.label(move, currentPhaseKey, roleKey);

  // Verify.
  assert.ok(result);
  assert.equal(result, "Thinker Refill Hand");
});

QUnit.test("label() Sell Material", (assert) => {
  // Setup.
  const leaderId = 1;
  const currentPhaseKey = Phase.DECLARE_ROLE;
  const roleKey = Role.MERCHANT;
  const playerId = 1;
  const store = TestData.createStore();
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(leaderId));
  store.dispatch(ActionCreator.setCurrentPhase(currentPhaseKey));
  store.dispatch(ActionCreator.setLeadRole(roleKey));
  const state = store.getState();
  const move = MoveState.create({
    cardId: 2,
    materialKey: Material.BRICK,
    moveKey: MoveOption.SELL_MATERIAL,
    playerId,
    roleKey,
    state,
  });

  // Run.
  const result = MoveFunction.label(move, currentPhaseKey, roleKey);

  // Verify.
  assert.ok(result);
  assert.equal(result, "Sell Material (Academy Merchant Brick 2)");
});

const MoveFunctionTest = {};
export default MoveFunctionTest;
