/* eslint no-console: ["error", { allow: ["error","info"] }] */

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

import GameFunction from "./GameFunction.js";

const { RoundRunner, PhaseRunner, SingleStepRunner, TurnRunner } = GameEngine;

const GtRGame = {};

GtRGame.execute = (store) => {
  // Setup.
  const props = {
    actionCreator: ActionCreator,
    gameFunction: GameFunction,
    roundLimit: 1000,
    selector: Selector,
  };
  const engine = {
    phaseRunner: PhaseRunner,
    turnRunner: TurnRunner,
    stepRunner: SingleStepRunner,
  };

  // Run.
  return RoundRunner.execute(props, store, engine)
    .then(() => {
      console.info("Game ends.");
    })
    .catch((error) => {
      console.error(error.message);
    });
};

Object.freeze(GtRGame);

export default GtRGame;
