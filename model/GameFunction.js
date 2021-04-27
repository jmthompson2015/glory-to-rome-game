import Step from "../artifact/Step.js";

import GameOver from "./GameOver.js";
import StepFunction from "./StepFunction.js";

const GameFunction = {};

GameFunction.isGameOver = (store) => GameOver.isGameOver(store);

GameFunction.stepFunction = StepFunction;

GameFunction.stepKeys = (/* state */) => Step.keys();

Object.freeze(GameFunction);

export default GameFunction;
