/* eslint no-console: ["error", { allow: ["log"] }] */

import Step from "../artifact/Step.js";

const StepFunction = {};

StepFunction[Step.DECLARE_ROLE] = (store) => {
  const state = store.getState();
  console.log(
    `round = ${state.currentRound} phase = ${state.currentPhaseKey} ` +
      `player = ${state.currentPlayerId} step = ${state.currentStepKey}`
  );
};

StepFunction[Step.PERFORM_ROLE] = (store) => {
  const state = store.getState();
  console.log(
    `round = ${state.currentRound} phase = ${state.currentPhaseKey} ` +
      `player = ${state.currentPlayerId} step = ${state.currentStepKey}`
  );
};

Object.freeze(StepFunction);

export default StepFunction;
