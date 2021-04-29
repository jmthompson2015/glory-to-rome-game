/* eslint no-console: ["error", { allow: ["error","log"] }] */

import Role from "../artifact/Role.js";

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

import StrategyResolver from "./StrategyResolver.js";

const computeShortfall = (playerId, state) => {
  const hand = Selector.hand(playerId, state);
  const refillLimit = Selector.refillLimit(playerId, state);

  return refillLimit - hand.length;
};

const determineThinkerOptions = (playerId, state) => {
  const answer = [];
  const { options } = Role.value(Role.THINKER);

  if (state.jackDeck.length > 0) {
    answer.push(options.DRAW_JACK);
  }

  const shortfall = computeShortfall(playerId, state);
  answer.push(shortfall > 0 ? options.REFILL_HAND : options.DRAW_CARD);

  return answer;
};

const performThinkerOption = (playerId, store) => (thinkerOption) => {
  const state = store.getState();
  const player = Selector.player(playerId, state);
  const { options } = Role.value(Role.THINKER);
  const userMessage = `${player.name} chose to ${thinkerOption}.`;
  store.dispatch(ActionCreator.setUserMessage(userMessage));
  const shortfall = computeShortfall(playerId, state);

  switch (thinkerOption) {
    case options.DRAW_JACK:
      store.dispatch(ActionCreator.transferJackToHand(playerId));
      break;
    case options.REFILL_HAND:
      for (let i = 0; i < shortfall; i += 1) {
        store.dispatch(ActionCreator.transferOrderToHand(playerId));
      }
      break;
    case options.DRAW_CARD:
      store.dispatch(ActionCreator.transferOrderToHand(playerId));
      break;
    default:
      throw new Error(`Unknown thinkerOption: ${thinkerOption}`);
  }
};

// /////////////////////////////////////////////////////////////////////////////
const RoleFunction = {
  [Role.ARCHITECT]: {
    execute: (/* store */) => {
      // Lay a foundation: Place a card from Hand and a Site card to Structure.
      // Add Material: Take a card from Stockpile and place it under the Structure.
      // Possibly also complete a Structure: Move Site from Structure to Influence.
      console.log(`RoleFunction ARCHITECT execute()`);
    },
    isLegal: (/* state */) => {
      console.log(`RoleFunction ARCHITECT isLegal()`);
    },
    label: (/* state */) => {
      console.log(`RoleFunction ARCHITECT label()`);
    },
  },
  [Role.CRAFTSMAN]: {
    execute: (/* store */) => {
      // Lay a foundation: Place a card from Hand and a Site card to Structure.
      // Add Material: Take a card from Hand and place it under the Structure.
      // Possibly also complete a Structure: Move Site from Structure to Influence.
      console.log(`RoleFunction CRAFTSMAN execute()`);
    },
    isLegal: (/* state */) => {
      console.log(`RoleFunction CRAFTSMAN isLegal()`);
    },
    label: (/* state */) => {
      console.log(`RoleFunction CRAFTSMAN label()`);
    },
  },
  [Role.LABORER]: {
    execute: (/* store */) => {
      // Take a card from Pool and place it in Stockpile.
      console.log(`RoleFunction LABORER execute()`);
    },
    isLegal: (/* state */) => {
      console.log(`RoleFunction LABORER isLegal()`);
    },
    label: (/* state */) => {
      console.log(`RoleFunction LABORER label()`);
    },
  },
  [Role.LEGIONARY]: {
    execute: (/* store */) => {
      // Demand materials: Take one from Pool, one from each neighbor and place in Stockpile.
      console.log(`RoleFunction LEGIONARY execute()`);
    },
    isLegal: (/* state */) => {
      console.log(`RoleFunction LEGIONARY isLegal()`);
    },
    label: (/* state */) => {
      console.log(`RoleFunction LEGIONARY label()`);
    },
  },
  [Role.MERCHANT]: {
    execute: (/* store */) => {
      // Take on material from Stockpile and place face-down in Vault.
      console.log(`RoleFunction MERCHANT execute()`);
    },
    isLegal: (/* state */) => {
      console.log(`RoleFunction MERCHANT isLegal()`);
    },
    label: (/* state */) => {
      console.log(`RoleFunction MERCHANT label()`);
    },
  },
  [Role.PATRON]: {
    execute: (/* store */) => {
      // Take a card from the Pool and place it in Clientele.
      console.log(`RoleFunction PATRON execute()`);
    },
    isLegal: (/* state */) => {
      console.log(`RoleFunction PATRON isLegal()`);
    },
    label: (/* state */) => {
      console.log(`RoleFunction PATRON label()`);
    },
  },
  [Role.THINKER]: {
    execute: (playerId, store) => {
      // The Leader does ONE of the following:
      // Take one Jack.
      // Draw as many Order cards from the draw pile as you need to fill to your hand
      // refill size (normally five).
      // Draw one additional Order card (if you are at or above your hand refill size).
      const state = store.getState();
      const options = determineThinkerOptions(playerId, state);
      const player = Selector.player(playerId, state);
      const strategy = StrategyResolver.resolve(player.strategy);
      const delay = Selector.delay(state);
      return strategy
        .chooseThinkerOption(options, state, delay)
        .then(performThinkerOption(playerId, store))
        .catch((error) => {
          console.error(error.message);
          throw error;
        });
    },
    isLegal: (/* state */) => {
      console.log(`RoleFunction THINKER isLegal()`);
    },
    label: (/* state */) => {
      console.log(`RoleFunction THINKER label()`);
    },
  },
};

Object.freeze(RoleFunction);

export default RoleFunction;
