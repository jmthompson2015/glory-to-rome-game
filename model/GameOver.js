/* eslint no-console: ["error", { allow: ["info"] }] */

import Selector from "../state/Selector.js";

const GameOver = {};

GameOver.getWinner = (/* state */) => {
  let winnerId;

  // A Catacomb structure is completed.

  // A Forum Romanum structure is completed, and has one of each Clientele and Material.

  return winnerId;
};

GameOver.isGameOver = (state, roundLimit = 100) => {
  // Is there a winner?
  const winnerId = GameOver.getWinner(state);

  if (!R.isNil(winnerId)) {
    const player = Selector.player(winnerId);
    console.info(`Player ${player.name} won!`);
    return true;
  }

  // Did the draw deck run out?
  if (state.orderDeck.length === 0) {
    console.info(`The draw deck ran out.`);
    return true;
  }

  // Did the site cards run out?
  if (state.siteDeck.length === 0) {
    console.info(`The site cards ran out.`);
    return true;
  }

  // Did we hit the round limit?
  if (Selector.currentRound(state) >= roundLimit) {
    console.info(`Round limit exceeded.`);
    return true;
  }

  return false;
};

Object.freeze(GameOver);

export default GameOver;
