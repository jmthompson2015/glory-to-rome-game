/* eslint no-console: ["error", { allow: ["log"] }] */

import IV from "../utility/InputValidator.js";

import Phase from "../artifact/Phase.js";
import Role from "../artifact/Role.js";

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

import MoveFunction from "./MoveFunction.js";
import MoveGenerator from "./MoveGenerator.js";
import StrategyResolver from "./StrategyResolver.js";

const StepFunction = {};

const roleFunctionPerformMove = (playerId, store) => (moveState) => {
  IV.validateNotNil("playerId", playerId);
  IV.validateNotNil("store", store);
  IV.validateNotNil("moveState", moveState);
  const gameRecord = MoveFunction.createGameRecord(moveState, store.getState());
  store.dispatch(ActionCreator.addGameRecord(gameRecord));
  const { moveKey } = moveState;
  const moveFunction = MoveFunction[moveKey];
  moveFunction.execute(moveState, store);
};

const roleFunctionExecute = (roleKey, playerId, store) => {
  IV.validateNotNil("roleKey", roleKey);
  IV.validateNotNil("playerId", playerId);
  IV.validateNotNil("store", store);
  if (store.getState().isVerbose) {
    console.log(`roleFunctionExecute() roleKey = ${roleKey}`);
  }

  let answer = Promise.resolve();

  if (roleKey === Role.THINKER) {
    const moveState = Selector.currentMove(store.getState());
    roleFunctionPerformMove(playerId, store)(moveState);
  } else {
    const options = MoveGenerator.generateOptions(
      roleKey,
      playerId,
      store.getState()
    );

    if (!R.isEmpty(options)) {
      const player = Selector.player(playerId, store.getState());
      const strategy = StrategyResolver.resolve(player.strategy);
      const delay = Selector.delay(store.getState());
      answer = strategy
        .chooseMove(options, store, delay)
        .then(roleFunctionPerformMove(playerId, store));
    }
  }

  return answer;
};

const performMove = (playerId, store) => (moveState) => {
  IV.validateNotNil("moveState", moveState);
  store.dispatch(ActionCreator.setCurrentMove(moveState));
  const { cardId, roleKey } = moveState;
  IV.validateNotNil("cardId", cardId);
  IV.validateNotNil("roleKey", roleKey);
  const card = Selector.orderCard(cardId, store.getState());
  IV.validateNotNil("card", card);
  const role = Role.value(roleKey);
  IV.validateNotNil("role", role);
  const player = Selector.player(playerId, store.getState());
  store.dispatch(
    ActionCreator.setUserMessage(`${player.name} chose the ${role.name} role.`)
  );

  if (Selector.isLeader(playerId, store.getState())) {
    store.dispatch(ActionCreator.setLeadRole(roleKey));
  }

  let answer = Promise.resolve();

  if (roleKey === Role.THINKER) {
    answer = roleFunctionExecute(roleKey, playerId, store);
  } else {
    const gameRecord = MoveFunction.createGameRecord(
      moveState,
      store.getState()
    );
    store.dispatch(ActionCreator.addGameRecord(gameRecord));
    store.dispatch(ActionCreator.transferHandToCamp(playerId, cardId));
  }

  return answer;
};

// /////////////////////////////////////////////////////////////////////////////
StepFunction.declareRole = (store) => {
  if (store.getState().isVerbose) {
    console.log(`StepFunction.declareRole()`);
  }
  const playerId = Selector.currentPlayerId(store.getState());
  let answer = Promise.resolve();

  if (
    Selector.isLeader(playerId, store.getState()) ||
    Selector.leadRoleKey(store.getState()) !== Role.THINKER
  ) {
    const options = MoveGenerator.generateRoleOptions(
      playerId,
      store.getState()
    );

    if (!R.isEmpty(options)) {
      const delay = Selector.delay(store.getState());
      const player = Selector.player(playerId, store.getState());
      const strategy = StrategyResolver.resolve(player.strategy);
      answer = strategy
        .chooseRole(options, store, delay)
        .then(performMove(playerId, store));
    }
  }
  return answer;
};

StepFunction.performRole = (store) => {
  if (store.getState().isVerbose) {
    console.log(`StepFunction.performRole()`);
  }
  const leadRoleKey = Selector.leadRoleKey(store.getState());
  const playerId = Selector.currentPlayerId(store.getState());
  const campIds = Selector.campIds(playerId, store.getState());

  return !R.isEmpty(campIds)
    ? roleFunctionExecute(leadRoleKey, playerId, store)
    : Promise.resolve();
};

StepFunction.execute = (store) => {
  const phaseKey = Selector.currentPhaseKey(store.getState());
  let answer = Promise.resolve();

  switch (phaseKey) {
    case Phase.DECLARE_ROLE:
      answer = StepFunction.declareRole(store);
      break;
    case Phase.PERFORM_ROLE:
      answer = StepFunction.performRole(store);
      break;
    default:
      throw new Error(`Unknown phaseKey = ${phaseKey}`);
  }

  return answer;
};

Object.freeze(StepFunction);

export default StepFunction;
