/* eslint no-console: ["error", { allow: ["error","log"] }] */

import IV from "../utility/InputValidator.js";

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

const performLaborerOption = (playerId, store) => (cardId) => {
  IV.validateNotNil("cardId", cardId);
  const player = Selector.player(playerId, store.getState());
  const card = Selector.orderCard(cardId, store.getState());
  const { materialKey } = card.cardType;
  const userMessage = `${player.name} chose to take ${materialKey}.`;
  store.dispatch(ActionCreator.setUserMessage(userMessage));
  store.dispatch(ActionCreator.transferPoolToStockpile(playerId, cardId));
};

const performMerchantOption = (playerId, store) => (cardId) => {
  IV.validateNotNil("cardId", cardId);
  const player = Selector.player(playerId, store.getState());
  const card = Selector.orderCard(cardId, store.getState());
  const { materialKey } = card.cardType;
  const userMessage = `${player.name} chose to sell ${materialKey}.`;
  store.dispatch(ActionCreator.setUserMessage(userMessage));
  store.dispatch(ActionCreator.transferStockpileToVault(playerId, cardId));
};

const performPatronOption = (playerId, store) => (cardId) => {
  IV.validateNotNil("cardId", cardId);
  const player = Selector.player(playerId, store.getState());
  const card = Selector.orderCard(cardId, store.getState());
  const { roleKey } = card.cardType;
  const article = roleKey === Role.ARCHITECT ? "an" : "a";
  const userMessage = `${player.name} chose to hire ${article} ${roleKey}.`;
  store.dispatch(ActionCreator.setUserMessage(userMessage));
  store.dispatch(ActionCreator.transferPoolToClientele(playerId, cardId));
};

const performThinkerOption = (playerId, store) => (thinkerOption) => {
  IV.validateNotNil("thinkerOption", thinkerOption);
  const player = Selector.player(playerId, store.getState());
  const { options } = Role.value(Role.THINKER);
  const userMessage = `${player.name} chose to ${thinkerOption}.`;
  store.dispatch(ActionCreator.setUserMessage(userMessage));
  const shortfall = computeShortfall(playerId, store.getState());

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
    execute: (playerId, store) => {
      // Take a card from Pool and place it in Stockpile.
      console.log(`RoleFunction LABORER execute()`);
      const options = Selector.cardPool(store.getState());
      const player = Selector.player(playerId, store.getState());
      const strategy = StrategyResolver.resolve(player.strategy);
      const delay = Selector.delay(store.getState());
      return strategy
        .chooseLaborerOption(options, store.getState(), delay)
        .then(performLaborerOption(playerId, store))
        .catch((error) => {
          console.error(error.message);
          throw error;
        });
    },
    isLegal: (playerId, state) => {
      console.log(`RoleFunction LABORER isLegal()`);
      const cardPool = Selector.cardPool(state);
      return cardPool.length > 0;
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
    execute: (playerId, store) => {
      // Take one material from Stockpile and place face-down in Vault.
      const options = Selector.stockpile(playerId, store.getState());
      const player = Selector.player(playerId, store.getState());
      const strategy = StrategyResolver.resolve(player.strategy);
      const delay = Selector.delay(store.getState());
      return strategy
        .chooseMerchantOption(options, store.getState(), delay)
        .then(performMerchantOption(playerId, store))
        .catch((error) => {
          console.error(error.message);
          throw error;
        });
    },
    isLegal: (playerId, state) => {
      console.log(`RoleFunction MERCHANT isLegal()`);
      const stockpile = Selector.stockpile(playerId, state);
      return stockpile.length > 0;
    },
    label: (/* state */) => {
      console.log(`RoleFunction MERCHANT label()`);
    },
  },
  [Role.PATRON]: {
    execute: (playerId, store) => {
      // Take a card from the Pool and place it in Clientele.
      const options = Selector.cardPool(store.getState());
      const player = Selector.player(playerId, store.getState());
      const strategy = StrategyResolver.resolve(player.strategy);
      const delay = Selector.delay(store.getState());
      return strategy
        .choosePatronOption(options, store.getState(), delay)
        .then(performPatronOption(playerId, store))
        .catch((error) => {
          console.error(error.message);
          throw error;
        });
    },
    isLegal: (playerId, state) => {
      console.log(`RoleFunction PATRON isLegal()`);
      const cardPool = Selector.cardPool(state);
      return cardPool.length > 0;
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
    isLegal: (/* state */) => true,
    label: (/* state */) => {
      console.log(`RoleFunction THINKER label()`);
    },
  },
};

Object.freeze(RoleFunction);

export default RoleFunction;
