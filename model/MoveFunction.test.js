/* eslint no-console: ["error", { allow: ["log"] }] */

import Material from "../artifact/Material.js";
import Role from "../artifact/Role.js";
import Phase from "../artifact/Phase.js";

import ActionCreator from "../state/ActionCreator.js";
import MoveState from "../state/MoveState.js";
import Selector from "../state/Selector.js";

import MoveFunction from "./MoveFunction.js";
import TestData from "./TestData.js";

QUnit.module("MoveFunction");

const printOrderCards = (cardIds, state) => {
  R.forEach((cardId) => {
    const c = Selector.orderCard(cardId, state).cardType;
    console.log(`${cardId} ${c.name} ${c.roleKey} ${c.materialKey}`);
  }, cardIds);
};

QUnit.test("label() Architect", (assert) => {
  // Setup.
  const leaderId = 1;
  const store = TestData.createStore();
  // store.dispatch(ActionCreator.setVerbose(true));
  store.dispatch(ActionCreator.setDelay(TestData.DELAY));
  store.dispatch(ActionCreator.setCurrentRound(1));
  store.dispatch(ActionCreator.setCurrentPlayer(leaderId));
  store.dispatch(ActionCreator.setCurrentPhase(Phase.DECLARE_ROLE));
  store.dispatch(ActionCreator.setLeadRole(Role.ARCHITECT));
  const state = store.getState();
  printOrderCards(state.orderDeck, state);
  const cardId = 1;
  const materialKey = Material.BRICK;
  const roleKey = Role.ARCHITECT;
  const { options } = Role.value(roleKey);
  const moveKey = R.head(Object.values(options));
  const playerId = 1;
  const move = MoveState.create({
    cardId,
    materialKey,
    moveKey,
    playerId,
    roleKey,
    state,
  });

  // Run.
  const result = MoveFunction.label(move, state);

  // Verify.
  assert.ok(result);
  assert.equal(
    result,
    "Architect: Lay a Foundation (1 Leader Brick undefined)"
  );
});

const MoveFunctionTest = {};
export default MoveFunctionTest;
