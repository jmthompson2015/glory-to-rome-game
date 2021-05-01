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

const determineLaborerOptions = (playerId, state) => {
  const cardPoolIds = Selector.cardPool(state);
  const cardPool = Selector.orderCards(cardPoolIds, state);
  const reduceFunction = (accum, card) => {
    if (card && card.cardType && card.cardType.materialKey) {
      return R.append(card.cardType.materialKey, accum);
    }
    return accum;
  };

  return R.uniq(R.reduce(reduceFunction, [], cardPool));
};

const determineMerchantOptions = (playerId, state) => {
  const stockpileIds = Selector.stockpile(playerId, state);
  const stockpile = Selector.orderCards(stockpileIds, state);
  const reduceFunction = (accum, card) => {
    if (card && card.cardType && card.cardType.materialKey) {
      return R.append(card.cardType.materialKey, accum);
    }
    return accum;
  };

  return R.uniq(R.reduce(reduceFunction, [], stockpile));
};

const determinePatronOptions = (playerId, state) => {
  const cardPoolIds = Selector.cardPool(state);
  const cardPool = Selector.orderCards(cardPoolIds, state);
  const reduceFunction = (accum, card) => {
    if (card && card.cardType && card.cardType.roleKey) {
      return R.append(card.cardType.roleKey, accum);
    }
    return accum;
  };

  return R.uniq(R.reduce(reduceFunction, [], cardPool));
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

const firstLaborerCard = (materialKey, cardPool) => {
  const filterFunction = (card) => card.cardType.materialKey === materialKey;
  const materialCards = R.filter(filterFunction, cardPool);
  IV.validateNotEmpty("materialCards", materialCards);

  return R.head(materialCards).id;
};

const firstMaterialCard = (materialKey, stockpile) => {
  const filterFunction = (card) => card.cardType.materialKey === materialKey;
  const materialCards = R.filter(filterFunction, stockpile);
  IV.validateNotEmpty("materialCards", materialCards);

  return R.head(materialCards).id;
};

const firstPatronCard = (roleKey, cardPool) => {
  const filterFunction = (card) => card.cardType.roleKey === roleKey;
  const roleCards = R.filter(filterFunction, cardPool);
  IV.validateNotEmpty("roleCards", roleCards);

  return R.head(roleCards).id;
};

const performLaborerOption = (playerId, store) => (materialKey) => {
  IV.validateNotNil("materialKey", materialKey);
  const player = Selector.player(playerId, store.getState());
  const userMessage = `${player.name} chose to take ${materialKey}.`;
  store.dispatch(ActionCreator.setUserMessage(userMessage));
  const cardPoolIds = Selector.cardPool(store.getState());
  const cardPool = Selector.orderCards(cardPoolIds, store.getState());
  const cardId = firstLaborerCard(materialKey, cardPool);
  store.dispatch(ActionCreator.transferPoolToStockpile(playerId, cardId));
};

const performMerchantOption = (playerId, store) => (materialKey) => {
  IV.validateNotNil("materialKey", materialKey);
  const player = Selector.player(playerId, store.getState());
  const userMessage = `${player.name} chose to sell ${materialKey}.`;
  store.dispatch(ActionCreator.setUserMessage(userMessage));
  const stockpileIds = Selector.stockpile(playerId, store.getState());
  const stockpile = Selector.orderCards(stockpileIds, store.getState());
  const cardId = firstMaterialCard(materialKey, stockpile);
  store.dispatch(ActionCreator.transferStockpileToVault(playerId, cardId));
};

const performPatronOption = (playerId, store) => (roleKey) => {
  IV.validateNotNil("roleKey", roleKey);
  const player = Selector.player(playerId, store.getState());
  const article = roleKey === Role.ARCHITECT ? "an" : "a";
  const userMessage = `${player.name} chose to hire ${article} ${roleKey}.`;
  store.dispatch(ActionCreator.setUserMessage(userMessage));
  const cardPoolIds = Selector.cardPool(store.getState());
  const cardPool = Selector.orderCards(cardPoolIds, store.getState());
  const cardId = firstPatronCard(roleKey, cardPool);
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
      const state = store.getState();
      const options = determineLaborerOptions(playerId, state);
      const player = Selector.player(playerId, state);
      const strategy = StrategyResolver.resolve(player.strategy);
      const delay = Selector.delay(state);
      return strategy
        .chooseLaborerOption(options, state, delay)
        .then((materialKey) => {
          performLaborerOption(playerId, store)(materialKey);
        })
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
      const state = store.getState();
      const options = determineMerchantOptions(playerId, state);
      const player = Selector.player(playerId, state);
      const strategy = StrategyResolver.resolve(player.strategy);
      const delay = Selector.delay(state);
      return strategy
        .chooseMerchantOption(options, state, delay)
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
      const state = store.getState();
      const options = determinePatronOptions(playerId, state);
      const player = Selector.player(playerId, state);
      const strategy = StrategyResolver.resolve(player.strategy);
      const delay = Selector.delay(state);
      return strategy
        .choosePatronOption(options, state, delay)
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
