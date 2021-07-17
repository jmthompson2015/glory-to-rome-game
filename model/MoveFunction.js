import IV from "../utility/InputValidator.js";

import Material from "../artifact/Material.js";
import MoveOption from "../artifact/MoveOption.js";
import OrderCard from "../artifact/OrderCard.js";
import Phase from "../artifact/Phase.js";
import Role from "../artifact/Role.js";

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";
import StructureState from "../state/StructureState.js";

const createCardDescription = (cardInstance, roleType, materialType) => {
  IV.validateNotNil("cardInstance", cardInstance);
  const cardType = cardInstance ? cardInstance.cardType : undefined;
  const cardName = cardType ? cardType.name : "";
  let answer;

  if (OrderCard.isJack(cardInstance.cardKey)) {
    answer = cardName;
  } else {
    const roleKey = roleType ? roleType.key : cardType.roleKey;
    const roleName = roleKey ? Role.value(roleKey).name : "";
    const materialKey = materialType ? materialType.key : cardType.materialKey;
    const materialName = materialKey ? Material.value(materialKey).name : "";
    const materialValue = cardType ? cardType.materialValue : "";
    answer = `${cardName} ${roleName} ${materialName} ${materialValue}`;
  }

  return answer;
};

const determineRoleName = (moveState, currentPhaseKey, leadRoleKey) => {
  const { roleType } = moveState;
  let answer = "";

  if (R.isNil(currentPhaseKey)) {
    answer = "";
  } else if (currentPhaseKey === Phase.DECLARE_ROLE) {
    answer = roleType.name;
  } else {
    answer = Role.value(leadRoleKey).name;
  }

  return answer;
};

const createLabel = (moveState, currentPhaseKey, leadRoleKey) => {
  IV.validateNotNil("moveState", moveState);
  IV.validateIsString("currentPhaseKey", currentPhaseKey);
  const { cardInstance, materialType, moveKey, roleType } = moveState;
  const roleName = determineRoleName(moveState, currentPhaseKey, leadRoleKey);
  const moveName = MoveOption.value(moveKey).name;
  const cardDesc = createCardDescription(cardInstance, roleType, materialType);

  return R.isNil(moveState.moveKey)
    ? `${roleName} (${cardDesc})`
    : `${moveName} (${cardDesc})`;
};

const modulo = (a, n) => ((a % n) + n) % n;

// /////////////////////////////////////////////////////////////////////////////
const MoveFunction = {
  [MoveOption.BUILD_FROM_HAND]: {
    execute: (moveState, store) => {
      IV.validateNotNil("moveState", moveState);
      IV.validateNotNil("store", store);
      const { cardId, playerId, structureId } = moveState;
      IV.validateIsNumber("cardId", cardId);
      IV.validateIsNumber("playerId", playerId);
      IV.validateIsNumber("structureId", structureId);
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
    },
    isLegal: (/* shipId, state */) => true,
    label: createLabel,
  },
  [MoveOption.BUILD_FROM_STOCKPILE]: {
    execute: (moveState, store) => {
      IV.validateNotNil("moveState", moveState);
      IV.validateNotNil("store", store);
      const { cardId, playerId, structureId } = moveState;
      IV.validateIsNumber("cardId", cardId);
      IV.validateIsNumber("playerId", playerId);
      IV.validateIsNumber("structureId", structureId);
      store.dispatch(
        ActionCreator.transferStockpileToStructure(
          playerId,
          cardId,
          structureId
        )
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
    },
    isLegal: (/* shipId, state */) => true,
    label: createLabel,
  },
  [MoveOption.DECLARE_ROLE]: {
    execute: (/* moveState, store */) => {},
    isLegal: (/* playerId, state */) => true,
    label: (moveState, currentPhaseKey, leadRoleKey) => {
      IV.validateNotNil("moveState", moveState);
      IV.validateIsString("currentPhaseKey", currentPhaseKey);
      const roleName = determineRoleName(
        moveState,
        currentPhaseKey,
        leadRoleKey
      );
      const { cardInstance, materialType, roleType } = moveState;
      const cardDesc = createCardDescription(
        cardInstance,
        roleType,
        materialType
      );

      return `${roleName} (${cardDesc})`;
    },
  },
  [MoveOption.DEMAND_MATERIAL]: {
    execute: (moveState, store) => {
      IV.validateNotNil("moveState", moveState);
      IV.validateNotNil("store", store);
      const { cardId, playerId } = moveState;
      IV.validateIsNumber("cardId", cardId);
      IV.validateIsNumber("playerId", playerId);
      const { materialKey } = Selector.orderCard(
        cardId,
        store.getState()
      ).cardType;
      const player = Selector.player(playerId, store.getState());
      const userMessage = `${player.name} demands ${materialKey}.`;
      store.dispatch(ActionCreator.setUserMessage(userMessage));
      const currentPlayerOrder = Selector.currentPlayerOrder(store.getState());
      const index = currentPlayerOrder.indexOf(playerId);
      const poolCards = Selector.poolCardsByMaterial(
        materialKey,
        store.getState()
      );
      if (poolCards.length > 0) {
        store.dispatch(
          ActionCreator.transferPoolToStockpile(playerId, R.head(poolCards).id)
        );
      }
      // Right neighbor.
      const rightNeighborIndex = modulo(index - 1, currentPlayerOrder.length);
      const rightNeighborId = currentPlayerOrder[rightNeighborIndex];
      const rightCards = Selector.handCardsByMaterial(
        materialKey,
        rightNeighborId,
        store.getState()
      );
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
      const leftCards = Selector.handCardsByMaterial(
        materialKey,
        leftNeighborId,
        store.getState()
      );
      if (leftCards.length > 0) {
        store.dispatch(
          ActionCreator.transferHandToStockpile(
            leftNeighborId,
            R.head(leftCards).id,
            playerId
          )
        );
      }
    },
    isLegal: (/* shipId, state */) => true,
    label: createLabel,
  },
  [MoveOption.DRAW_CARD]: {
    execute: (moveState, store) => {
      IV.validateNotNil("moveState", moveState);
      IV.validateNotNil("store", store);
      const { playerId } = moveState;
      IV.validateIsNumber("playerId", playerId);
      IV.validateNotEmpty("orderDeck", store.getState().orderDeck);
      store.dispatch(ActionCreator.transferOrderToHand(playerId));
    },
    isLegal: (playerId, state) => {
      const leadRoleKey = Selector.leadRoleKey(state);
      const roleKey = Role.THINKER;
      const moveOption = MoveOption.value(MoveOption.DRAW_CARD);
      const handIds = Selector.handIds(playerId, state);
      return (
        leadRoleKey === roleKey &&
        !R.isNil(moveOption) &&
        moveOption.roleKeys.includes(roleKey) &&
        !R.isNil(handIds) &&
        handIds.length >= Selector.refillLimit(playerId, state)
      );
    },
    label: (moveState, currentPhaseKey, leadRoleKey) => {
      IV.validateNotNil("moveState", moveState);
      const roleName = determineRoleName(
        moveState,
        currentPhaseKey,
        leadRoleKey
      );
      const moveName = MoveOption.value(moveState.moveKey).name;

      return `${roleName} ${moveName}`;
    },
  },
  [MoveOption.DRAW_JACK]: {
    execute: (moveState, store) => {
      IV.validateNotNil("moveState", moveState);
      IV.validateNotNil("store", store);
      const { playerId } = moveState;
      IV.validateIsNumber("playerId", playerId);
      IV.validateNotEmpty("jackDeck", store.getState().jackDeck);
      store.dispatch(ActionCreator.transferJackToHand(playerId));
    },
    isLegal: (playerId, state) => {
      const leadRoleKey = Selector.leadRoleKey(state);
      const roleKey = Role.THINKER;
      const moveOption = MoveOption.value(MoveOption.DRAW_JACK);
      const jackDeck = Selector.jackDeck(state);
      return (
        leadRoleKey === roleKey &&
        !R.isNil(moveOption) &&
        moveOption.roleKeys.includes(roleKey) &&
        !R.isNil(jackDeck) &&
        jackDeck.length > 0
      );
    },
    label: (moveState, currentPhaseKey, leadRoleKey) => {
      IV.validateNotNil("moveState", moveState);
      const roleName = determineRoleName(
        moveState,
        currentPhaseKey,
        leadRoleKey
      );
      const moveName = MoveOption.value(moveState.moveKey).name;

      return `${roleName} ${moveName}`;
    },
  },
  [MoveOption.GATHER_MATERIAL]: {
    execute: (moveState, store) => {
      IV.validateNotNil("moveState", moveState);
      IV.validateNotNil("store", store);
      const { cardId, playerId } = moveState;
      IV.validateIsNumber("cardId", cardId);
      IV.validateIsNumber("playerId", playerId);
      const player = Selector.player(playerId, store.getState());
      const card = Selector.orderCard(cardId, store.getState());
      const { materialKey } = card.cardType;
      const userMessage = `${player.name} chose to take ${materialKey}.`;
      store.dispatch(ActionCreator.setUserMessage(userMessage));
      store.dispatch(ActionCreator.transferPoolToStockpile(playerId, cardId));
    },
    isLegal: (playerId, state) => {
      const leadRoleKey = Selector.leadRoleKey(state);
      const roleKey = Role.LABORER;
      const moveOption = MoveOption.value(MoveOption.GATHER_MATERIAL);
      const cardPool = Selector.cardPool(state);
      return (
        leadRoleKey === roleKey &&
        !R.isNil(moveOption) &&
        moveOption.roleKeys.includes(roleKey) &&
        !R.isNil(cardPool) &&
        cardPool.length > 0
      );
    },
    label: createLabel,
  },
  [MoveOption.HIRE_CLIENT]: {
    execute: (moveState, store) => {
      IV.validateNotNil("moveState", moveState);
      IV.validateNotNil("store", store);
      const { cardId, playerId } = moveState;
      IV.validateIsNumber("cardId", cardId);
      IV.validateIsNumber("playerId", playerId);
      const player = Selector.player(playerId, store.getState());
      const card = Selector.orderCard(cardId, store.getState());
      const { roleKey } = card.cardType;
      const article = roleKey === Role.ARCHITECT ? "an" : "a";
      const userMessage = `${player.name} chose to hire ${article} ${roleKey}.`;
      store.dispatch(ActionCreator.setUserMessage(userMessage));
      store.dispatch(ActionCreator.transferPoolToClientele(playerId, cardId));
    },
    isLegal: (/* shipId, state */) => true,
    label: createLabel,
  },
  [MoveOption.LAY_FOUNDATION]: {
    execute: (moveState, store) => {
      IV.validateNotNil("moveState", moveState);
      IV.validateNotNil("store", store);
      const { cardId, materialKey, playerId } = moveState;
      IV.validateIsNumber("cardId", cardId);
      IV.validateIsNumber("playerId", playerId);
      IV.validateIsString("materialKey", materialKey);
      const siteIds = Selector.siteIdsByMaterial(materialKey, store.getState());
      const siteId = R.head(siteIds);
      IV.validateNotNil("siteId", siteId);
      const structureState = StructureState.create({
        foundationId: cardId,
        siteId,
        store,
      });
      store.dispatch(ActionCreator.layFoundation(playerId, structureState));
    },
    isLegal: (/* shipId, state */) => true,
    label: createLabel,
  },
  [MoveOption.REFILL_HAND]: {
    execute: (moveState, store) => {
      IV.validateNotNil("moveState", moveState);
      IV.validateNotNil("store", store);
      const { playerId } = moveState;
      IV.validateIsNumber("playerId", playerId);
      const shortfall = Selector.handShortfall(playerId, store.getState());
      for (let i = 0; i < shortfall; i += 1) {
        IV.validateNotEmpty("orderDeck", store.getState().orderDeck);
        store.dispatch(ActionCreator.transferOrderToHand(playerId));
      }
    },
    isLegal: (playerId, state) => {
      const leadRoleKey = Selector.leadRoleKey(state);
      const roleKey = Role.THINKER;
      const moveOption = MoveOption.value(MoveOption.REFILL_HAND);
      const handIds = Selector.handIds(playerId, state);
      return (
        leadRoleKey === roleKey &&
        !R.isNil(moveOption) &&
        moveOption.roleKeys.includes(roleKey) &&
        !R.isNil(handIds) &&
        handIds.length < Selector.refillLimit(playerId, state)
      );
    },
    label: (moveState, currentPhaseKey, leadRoleKey) => {
      IV.validateNotNil("moveState", moveState);
      const roleName = determineRoleName(
        moveState,
        currentPhaseKey,
        leadRoleKey
      );
      const moveName = MoveOption.value(moveState.moveKey).name;

      return `${roleName} ${moveName}`;
    },
  },
  [MoveOption.SELL_MATERIAL]: {
    execute: (moveState, store) => {
      IV.validateNotNil("moveState", moveState);
      IV.validateNotNil("store", store);
      const { cardId, materialKey, playerId } = moveState;
      IV.validateIsNumber("cardId", cardId);
      IV.validateIsNumber("playerId", playerId);
      IV.validateIsString("materialKey", materialKey);
      const player = Selector.player(playerId, store.getState());

      IV.validateNotNil("cardId", cardId);
      const message = `${player.name} chose to sell ${materialKey}.`;
      store.dispatch(ActionCreator.setUserMessage(message));
      store.dispatch(ActionCreator.transferStockpileToVault(playerId, cardId));
    },
    isLegal: (playerId, state) => {
      const leadRoleKey = Selector.leadRoleKey(state);
      const roleKey = Role.MERCHANT;
      const moveOption = MoveOption.value(MoveOption.SELL_MATERIAL);
      const stockpileIds = Selector.stockpileIds(playerId, state);
      return (
        leadRoleKey === roleKey &&
        !R.isNil(moveOption) &&
        moveOption.roleKeys.includes(roleKey) &&
        !R.isNil(stockpileIds) &&
        stockpileIds.length > 0
      );
    },
    label: createLabel,
  },
};

MoveFunction.createGameRecord = (moveState, state) => {
  let answer;

  if (moveState) {
    const round = Selector.currentRound(state);
    const gameRecords = Selector.gameRecords(state);
    const roundRecords = R.filter((r) => r.round === round, gameRecords);
    const turn = roundRecords.length + 1;
    const { currentPhaseKey, leadRoleKey } = state;
    const phaseName = Phase.value(currentPhaseKey).name;
    const player = state.playerInstances[moveState.playerId];
    const playerName = player ? player.name : `Player ${moveState.playerId}`;
    const label = MoveFunction.label(moveState, currentPhaseKey, leadRoleKey);

    answer = `${round}.${turn} ${phaseName}: ${playerName}: ${label}`;
  }

  return answer;
};

MoveFunction.execute = (moveState, state) => {
  IV.validateNotNil("moveState", moveState);
  IV.validateNotNil("state", state);
  const { moveKey } = moveState;
  const moveFunction = MoveFunction[moveKey];
  IV.validateNotNil("moveFunction", moveFunction);

  return moveFunction.execute(moveState, state);
};

MoveFunction.isLegal = (moveKey, playerId, state) => {
  IV.validateIsString("moveKey", moveKey);
  IV.validateIsNumber("playerId", playerId);
  IV.validateNotNil("state", state);
  const moveFunction = MoveFunction[moveKey];
  IV.validateNotNil("moveFunction", moveFunction);

  return moveFunction.isLegal(playerId, state);
};

MoveFunction.label = (moveState, currentPhaseKey, leadRoleKey) => {
  IV.validateNotNil("moveState", moveState);
  const { moveKey } = moveState;
  const moveFunction = MoveFunction[moveKey];
  IV.validateNotNil("moveFunction", moveFunction);

  return moveFunction.label(moveState, currentPhaseKey, leadRoleKey);
};

Object.freeze(MoveFunction);

export default MoveFunction;
