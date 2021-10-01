/* eslint no-underscore-dangle: ["error", { "allow": ["_state"] }] */

import IV from "../utility/InputValidator.js";

import Phase from "../artifact/Phase.js";

import Reducer from "../state/Reducer.js";

import GameOver from "./GameOver.js";
import MoveFunction from "./MoveFunction.js";
import MoveGenerator from "./MoveGenerator.js";

class MCTSGame {
  constructor(state) {
    this._state = Immutable(state);
  }

  get state() {
    return this._state;
  }

  clone() {
    return new MCTSGame(this._state);
  }

  getCurrentPlayer() {
    const { currentPlayerId } = this._state;

    return this._state.playerInstances[currentPlayerId];
  }

  getPossibleMoves() {
    const { currentPhaseKey, currentPlayerId, leadRoleKey } = this._state;
    let answer = Promise.resolve();

    switch (currentPhaseKey) {
      case Phase.DECLARE_ROLE:
        answer = MoveGenerator.generateRoleOptions(
          currentPlayerId,
          this._state
        );
        break;
      case Phase.PERFORM_ROLE:
        answer = MoveGenerator.generateOptions(
          leadRoleKey,
          currentPlayerId,
          this._state
        );
        break;
      default:
        throw new Error(`Unknown currentPhaseKey = ${currentPhaseKey}`);
    }

    return answer;
  }

  getWinner() {
    return GameOver.getWinner(this._state);
  }

  isGameOver() {
    return GameOver.isGameOver(this._state);
  }

  performMove(moveState) {
    IV.validateNotNil("moveState", moveState);
    const { currentPlayerId: playerId } = this._state;
    IV.validateNotNil("playerId", playerId);
    const { moveKey } = moveState;
    const moveFunction = MoveFunction[moveKey];
    const store = Redux.createStore(Reducer.root, this._state);
    moveFunction.execute(moveState, store);
    this._state = store.getState();
  }
}

Object.freeze(MCTSGame);

export default MCTSGame;
