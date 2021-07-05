/* eslint no-console: ["error", { allow: ["error","log"] }] */

import IV from "../utility/InputValidator.js";

import Role from "../artifact/Role.js";

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";
import StructureState from "../state/StructureState.js";

import MoveFunction from "./MoveFunction.js";
import MG from "./MoveGenerator.js";
import SR from "./StrategyResolver.js";

const modulo = (a, n) => ((a % n) + n) % n;

const performArchitectOption = (playerId, store) => (moveState) => {
  IV.validateNotNil("playerId", playerId);
  IV.validateNotNil("store", store);
  IV.validateNotNil("moveState", moveState);
  const gameRecord = MoveFunction.createGameRecord(moveState, store.getState());
  store.dispatch(ActionCreator.addGameRecord(gameRecord));
  const { moveKey } = moveState;
  const { options } = Role.value(Role.ARCHITECT);

  if (moveKey === options.LAY_FOUNDATION) {
    const { cardId, materialKey } = moveState;
    const siteIds = Selector.siteIdsByMaterial(materialKey, store.getState());
    const siteId = R.head(siteIds);
    IV.validateNotNil("cardId", cardId);
    IV.validateNotNil("siteId", siteId);
    const structureState = StructureState.create({
      foundationId: cardId,
      siteId,
      store,
    });
    store.dispatch(ActionCreator.layFoundation(playerId, structureState));
  } else if (moveKey === options.BUILD_STRUCTURE) {
    const { cardId, structureId } = moveState;
    IV.validateNotNil("cardId", cardId);
    IV.validateNotNil("structureId", structureId);
    store.dispatch(
      ActionCreator.transferStockpileToStructure(playerId, cardId, structureId)
    );

    if (Selector.isStructureComplete(structureId, store.getState())) {
      const structure = Selector.structure(structureId, store.getState());
      store.dispatch(
        ActionCreator.transferStructureToInfluence(
          structureId,
          playerId,
          structure.siteId
        )
      );
    }
  }
};

const performCraftsmanOption = (playerId, store) => (moveState) => {
  IV.validateNotNil("playerId", playerId);
  IV.validateNotNil("store", store);
  IV.validateNotNil("moveState", moveState);
  const gameRecord = MoveFunction.createGameRecord(moveState, store.getState());
  store.dispatch(ActionCreator.addGameRecord(gameRecord));
  const { moveKey } = moveState;
  const { options } = Role.value(Role.CRAFTSMAN);

  if (moveKey === options.LAY_FOUNDATION) {
    const { cardId, materialKey } = moveState;
    const siteId = R.head(
      Selector.siteIdsByMaterial(materialKey, store.getState())
    );
    IV.validateNotNil("cardId", cardId);
    IV.validateNotNil("siteId", siteId);
    const structureState = StructureState.create({
      foundationId: cardId,
      siteId,
      store,
    });
    store.dispatch(ActionCreator.layFoundation(playerId, structureState));
  } else if (moveKey === options.BUILD_STRUCTURE) {
    const { cardId, structureId } = moveState;
    IV.validateNotNil("cardId", cardId);
    IV.validateNotNil("structureId", structureId);
    store.dispatch(
      ActionCreator.transferHandToStructure(playerId, cardId, structureId)
    );

    if (Selector.isStructureComplete(structureId, store.getState())) {
      const structure = Selector.structure(structureId, store.getState());
      store.dispatch(
        ActionCreator.transferStructureToInfluence(
          structureId,
          playerId,
          structure.siteId
        )
      );
    }
  }
};

const performLaborerOption = (playerId, store) => (moveState) => {
  IV.validateNotNil("moveState", moveState);
  const gameRecord = MoveFunction.createGameRecord(moveState, store.getState());
  store.dispatch(ActionCreator.addGameRecord(gameRecord));
  const { cardId } = moveState;
  IV.validateNotNil("cardId", cardId);
  const player = Selector.player(playerId, store.getState());
  const card = Selector.orderCard(cardId, store.getState());
  const { materialKey } = card.cardType;
  const userMessage = `${player.name} chose to take ${materialKey}.`;
  store.dispatch(ActionCreator.setUserMessage(userMessage));
  store.dispatch(ActionCreator.transferPoolToStockpile(playerId, cardId));
};

const performLegionaryOption = (playerId, store) => (moveState) => {
  IV.validateNotNil("moveState", moveState);
  const gameRecord = MoveFunction.createGameRecord(moveState, store.getState());
  store.dispatch(ActionCreator.addGameRecord(gameRecord));
  const { cardId } = moveState;
  IV.validateNotNil("cardId", cardId);
  const { materialKey } = Selector.orderCard(cardId, store.getState()).cardType;
  const player = Selector.player(playerId, store.getState());
  const userMessage = `${player.name} demands ${materialKey}.`;
  store.dispatch(ActionCreator.setUserMessage(userMessage));
  const currentPlayerOrder = Selector.currentPlayerOrder(store.getState());
  const index = currentPlayerOrder.indexOf(playerId);
  const filterFunction = (orderCard) =>
    orderCard.cardType.materialKey === materialKey;

  // Pool.
  const poolIds = Selector.cardPool(store.getState());
  const pool = Selector.orderCards(poolIds, store.getState());
  const poolCards = R.filter(filterFunction, pool);

  if (poolCards.length > 0) {
    store.dispatch(
      ActionCreator.transferPoolToStockpile(playerId, R.head(poolCards).id)
    );
  }

  // Right neighbor.
  const rightNeighborIndex = modulo(index - 1, currentPlayerOrder.length);
  const rightNeighborId = currentPlayerOrder[rightNeighborIndex];
  const rightHand = Selector.handCards(rightNeighborId, store.getState());
  const rightCards = R.filter(filterFunction, rightHand);

  if (rightCards.length > 0) {
    store.dispatch(
      ActionCreator.transferHandToStockpile(
        rightNeighborId,
        R.head(rightCards).id,
        playerId
      )
    );
  }

  // Left neighbor.
  const leftNeighborIndex = modulo(index + 1, currentPlayerOrder.length);
  const leftNeighborId = currentPlayerOrder[leftNeighborIndex];
  const leftHand = Selector.handCards(leftNeighborId, store.getState());
  const leftCards = R.filter(filterFunction, leftHand);

  if (leftCards.length > 0) {
    store.dispatch(
      ActionCreator.transferHandToStockpile(
        leftNeighborId,
        R.head(leftCards).id,
        playerId
      )
    );
  }
};

const performMerchantOption = (playerId, store) => (moveState) => {
  IV.validateNotNil("moveState", moveState);
  const gameRecord = MoveFunction.createGameRecord(moveState, store.getState());
  store.dispatch(ActionCreator.addGameRecord(gameRecord));
  const { cardId, materialKey } = moveState;
  const player = Selector.player(playerId, store.getState());

  if (cardId) {
    IV.validateNotNil("cardId", cardId);
    const message = `${player.name} chose to sell ${materialKey}.`;
    store.dispatch(ActionCreator.setUserMessage(message));
    store.dispatch(ActionCreator.transferStockpileToVault(playerId, cardId));
  } else {
    const message = `${player.name} can't play Merchant.`;
    console.error(`cardId = ${cardId} message = ${message}`);
    store.dispatch(ActionCreator.setUserMessage(message));
  }
};

const performPatronOption = (playerId, store) => (moveState) => {
  IV.validateNotNil("moveState", moveState);
  const gameRecord = MoveFunction.createGameRecord(moveState, store.getState());
  store.dispatch(ActionCreator.addGameRecord(gameRecord));
  const { cardId } = moveState;
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
  const userMessage = `${player.name} chose to ${thinkerOption.moveKey}.`;
  store.dispatch(ActionCreator.setUserMessage(userMessage));
  const shortfall = Selector.handShortfall(playerId, store.getState());

  switch (thinkerOption.moveKey) {
    case options.DRAW_JACK:
      if (!R.isEmpty(store.getState().jackDeck)) {
        store.dispatch(ActionCreator.transferJackToHand(playerId));
      }
      break;
    case options.REFILL_HAND:
      for (let i = 0; i < shortfall; i += 1) {
        IV.validateNotEmpty("orderDeck", store.getState().orderDeck);
        store.dispatch(ActionCreator.transferOrderToHand(playerId));
      }
      break;
    case options.DRAW_CARD:
      IV.validateNotEmpty("orderDeck", store.getState().orderDeck);
      store.dispatch(ActionCreator.transferOrderToHand(playerId));
      break;
    default:
      throw new Error(`Unknown thinkerOption: ${thinkerOption}`);
  }
};

// /////////////////////////////////////////////////////////////////////////////
const RoleFunction = {
  [Role.ARCHITECT]: {
    execute: (playerId, store) => {
      // Lay a foundation: Place a card from Hand and a Site card to Structure.
      // Add Material: Take a card from Stockpile and place it under the Structure.
      // Possibly also complete a Structure: Move Site from Structure to Influence.
      if (store.getState().isVerbose) {
        console.log(`RoleFunction ARCHITECT execute()`);
      }
      const options = MG.generateArchitectOptions(playerId, store.getState());
      let answer = Promise.resolve();

      if (!R.isEmpty(options)) {
        const player = Selector.player(playerId, store.getState());
        const strategy = SR.resolve(player.strategy);
        const delay = Selector.delay(store.getState());
        answer = strategy
          .chooseArchitectOption(options, store, delay)
          .then(performArchitectOption(playerId, store));
      }

      return answer;
    },
  },
  [Role.CRAFTSMAN]: {
    execute: (playerId, store) => {
      // Lay a foundation: Place a card from Hand and a Site card to Structure.
      // Add Material: Take a card from Hand and place it under the Structure.
      // Possibly also complete a Structure: Move Site from Structure to Influence.
      if (store.getState().isVerbose) {
        console.log(`RoleFunction CRAFTSMAN execute()`);
      }
      const options = MG.generateCraftsmanOptions(playerId, store.getState());
      let answer = Promise.resolve();

      if (!R.isEmpty(options)) {
        const player = Selector.player(playerId, store.getState());
        const strategy = SR.resolve(player.strategy);
        const delay = Selector.delay(store.getState());
        answer = strategy
          .chooseCraftsmanOption(options, store, delay)
          .then(performCraftsmanOption(playerId, store));
      }

      return answer;
    },
  },
  [Role.LABORER]: {
    execute: (playerId, store) => {
      // Take a card from Pool and place it in Stockpile.
      if (store.getState().isVerbose) {
        console.log(`RoleFunction LABORER execute()`);
      }
      const options = MG.generateLaborerOptions(playerId, store.getState());
      let answer = Promise.resolve();

      if (!R.isEmpty(options)) {
        const player = Selector.player(playerId, store.getState());
        const strategy = SR.resolve(player.strategy);
        const delay = Selector.delay(store.getState());
        answer = strategy
          .chooseLaborerOption(options, store, delay)
          .then(performLaborerOption(playerId, store));
      }

      return answer;
    },
  },
  [Role.LEGIONARY]: {
    execute: (playerId, store) => {
      // Demand materials: Take one from Pool, one from each neighbor and place in Stockpile.
      if (store.getState().isVerbose) {
        console.log(`RoleFunction LEGIONARY execute()`);
      }
      const options = MG.generateLegionaryOptions(playerId, store.getState());
      let answer = Promise.resolve();

      if (!R.isEmpty(options)) {
        const player = Selector.player(playerId, store.getState());
        const strategy = SR.resolve(player.strategy);
        const delay = Selector.delay(store.getState());
        answer = strategy
          .chooseLegionaryOption(options, store, delay)
          .then(performLegionaryOption(playerId, store));
      }

      return answer;
    },
  },
  [Role.MERCHANT]: {
    execute: (playerId, store) => {
      // Take one material from Stockpile and place face-down in Vault.
      if (store.getState().isVerbose) {
        console.log(`RoleFunction MERCHANT execute()`);
      }
      const options = MG.generateMerchantOptions(playerId, store.getState());
      let answer = Promise.resolve();

      if (!R.isEmpty(options)) {
        const player = Selector.player(playerId, store.getState());
        const strategy = SR.resolve(player.strategy);
        const delay = Selector.delay(store.getState());
        answer = strategy
          .chooseMerchantOption(options, store, delay)
          .then(performMerchantOption(playerId, store));
      }

      return answer;
    },
  },
  [Role.PATRON]: {
    execute: (playerId, store) => {
      // Take a card from the Pool and place it in Clientele.
      if (store.getState().isVerbose) {
        console.log(`RoleFunction PATRON execute()`);
      }
      const options = MG.generatePatronOptions(playerId, store.getState());
      let answer = Promise.resolve();

      if (!R.isEmpty(options)) {
        const player = Selector.player(playerId, store.getState());
        const strategy = SR.resolve(player.strategy);
        const delay = Selector.delay(store.getState());
        answer = strategy
          .choosePatronOption(options, store, delay)
          .then(performPatronOption(playerId, store));
      }

      return answer;
    },
  },
  [Role.THINKER]: {
    execute: (playerId, store) => {
      // The Leader does ONE of the following:
      // Take one Jack.
      // Draw as many Order cards from the draw pile as you need to fill to your hand
      // refill size (normally five).
      // Draw one additional Order card (if you are at or above your hand refill size).
      if (store.getState().isVerbose) {
        console.log(`RoleFunction THINKER execute()`);
      }
      const move = Selector.currentMove(store.getState());
      performThinkerOption(playerId, store)(move);
      return Promise.resolve();
    },
  },
};

RoleFunction.execute = (roleKey, playerId, store) => {
  IV.validateNotNil("roleKey", roleKey);
  IV.validateNotNil("playerId", playerId);
  IV.validateNotNil("store", store);
  const roleFunction = RoleFunction[roleKey];
  IV.validateNotNil("roleFunction", roleFunction);

  return roleFunction.execute(playerId, store);
};

Object.freeze(RoleFunction);

export default RoleFunction;
