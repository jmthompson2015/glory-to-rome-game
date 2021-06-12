/* eslint no-console: ["error", { allow: ["error","warn"] }] */

import IV from "../utility/InputValidator.js";

import Role from "../artifact/Role.js";

import MoveState from "../state/MoveState.js";
import Selector from "../state/Selector.js";

const MoveGenerator = {};

const isJack = (card) => (card ? card.cardKey.startsWith("jack") : false);

const createMoves = (cardIds, playerId, state) => {
  const mapFunction = (cardId) => {
    const card = Selector.orderCard(cardId, state);

    return MoveState.create({
      playerId,
      cardId,
      materialKey: card.cardType.materialKey,
      roleKey: card.cardType.roleKey,
      state,
    });
  };

  return R.map(mapFunction, cardIds);
};

const filterJacks = (cardIds, state) => {
  IV.validateNotNil("state", state);
  IV.validateIsArray("cardIds", cardIds);
  const filterFunction = (id) => {
    const orderCard = state.orderCardInstances[id];
    return !isJack(orderCard);
  };

  return R.filter(filterFunction, cardIds);
};

const filterLeader = (cardIds, state) => {
  IV.validateNotNil("state", state);
  IV.validateIsArray("cardIds", cardIds);
  const leaderCardId = Selector.leaderCardId(state);

  return R.without([leaderCardId], cardIds);
};

const generateBuildStructureOptions = (cards, options, playerId, state) => {
  const reduceFunction = (accum, stockpileCard) => {
    const { materialKey } = stockpileCard.cardType;
    const structureIds2 = Selector.unfinishedStructureIdsByMaterial(
      playerId,
      materialKey,
      state
    );
    const forEachFunction = (structureId) => {
      const move = MoveState.create({
        playerId,
        moveKey: options.BUILD_STRUCTURE,
        cardId: stockpileCard.id,
        roleKey: stockpileCard.cardType.roleKey,
        structureId,
        state,
      });
      accum.push(move);
    };
    R.forEach(forEachFunction, structureIds2);
    return accum;
  };

  return R.reduce(reduceFunction, [], cards);
};

const generateLayFoundationOptions = (handIds, options, playerId, state) => {
  const reduceFunction = (accum, card) => {
    const { materialKey } = card.cardType;
    IV.validateNotNil("materialKey", materialKey);
    const siteIds = Selector.siteIdsByMaterial(materialKey, state);

    if (siteIds.length > 0) {
      accum.push(
        MoveState.create({
          playerId,
          moveKey: options.LAY_FOUNDATION,
          cardId: card.id,
          materialKey,
          roleKey: card.cardType.roleKey,
          state,
        })
      );
    }
    return accum;
  };
  const handCards = Selector.orderCards(handIds, state);

  return R.reduce(reduceFunction, [], handCards);
};

const generateLeaderRoleOptions = (playerId, state) => {
  const reduceFunction = (accum, cardId) => {
    const card = Selector.orderCard(cardId, state);

    if (isJack(card)) {
      const mapFunction = (roleKey) => {
        accum.push(MoveState.create({ playerId, cardId, roleKey, state }));
      };
      const roleKeys = R.without([Role.THINKER], Role.keys());
      const moves = R.map(mapFunction, roleKeys);
      accum.push(...moves);
    } else {
      const { materialKey, roleKey } = card.cardType;
      accum.push(
        MoveState.create({ playerId, cardId, materialKey, roleKey, state })
      );
    }

    return accum;
  };
  const handIds = Selector.handIds(playerId, state);

  return R.reduce(reduceFunction, [], handIds);
};

const generateNonLeaderRoleOptions = (playerId, state) => {
  const leadRoleKey = Selector.leadRole(state);
  const reduceFunction = (accum, cardId) => {
    const card = Selector.orderCard(cardId, state);

    if (isJack(card)) {
      accum.push(
        MoveState.create({ playerId, cardId, roleKey: leadRoleKey, state })
      );
    } else if (card.cardType.roleKey === leadRoleKey) {
      const { materialKey, roleKey } = card.cardType;
      accum.push(
        MoveState.create({ playerId, cardId, materialKey, roleKey, state })
      );
    }

    return accum;
  };
  const cardId = Selector.leaderCardId(state);
  const move = MoveState.create({
    playerId,
    cardId,
    roleKey: Role.THINKER,
    state,
  });
  const handIds = Selector.handIds(playerId, state);

  return R.reduce(reduceFunction, [move], handIds);
};

// /////////////////////////////////////////////////////////////////////////////
MoveGenerator.generateArchitectOptions = (playerId, state) => {
  const { options } = Role.value(Role.ARCHITECT);
  const handIds0 = filterLeader(Selector.handIds(playerId, state), state);
  const handIds = filterJacks(handIds0, state);
  let answer = [];

  if (!R.isEmpty(handIds)) {
    answer = generateLayFoundationOptions(handIds, options, playerId, state);
  }

  const stockpileCards = Selector.stockpileCards(playerId, state);
  const structureIds = Selector.unfinishedStructureIds(playerId, state);

  if (!R.isEmpty(stockpileCards) && !R.isEmpty(structureIds)) {
    const newOptions = generateBuildStructureOptions(
      stockpileCards,
      options,
      playerId,
      state
    );
    answer = R.concat(answer, newOptions);
  }

  return answer;
};

MoveGenerator.generateCraftsmanOptions = (playerId, state) => {
  const { options } = Role.value(Role.CRAFTSMAN);
  const handIds0 = filterLeader(Selector.handIds(playerId, state), state);
  const handIds = filterJacks(handIds0, state);
  let answer = [];

  if (!R.isEmpty(handIds)) {
    answer = generateLayFoundationOptions(handIds, options, playerId, state);
  }

  const structureIds = Selector.unfinishedStructureIds(playerId, state);

  if (!R.isEmpty(handIds) && !R.isEmpty(structureIds)) {
    const handCards = Selector.orderCards(handIds, state);
    const newOptions = generateBuildStructureOptions(
      handCards,
      options,
      playerId,
      state
    );
    answer = R.concat(answer, newOptions);
  }

  return answer;
};

MoveGenerator.generateLaborerOptions = (playerId, state) => {
  const cardIds = Selector.cardPool(state);

  return createMoves(cardIds, playerId, state);
};

MoveGenerator.generateLegionaryOptions = (playerId, state) => {
  const handIds = filterJacks(Selector.handIds(playerId, state), state);
  const cardIds = filterLeader(handIds, state);

  return createMoves(cardIds, playerId, state);
};

MoveGenerator.generateMerchantOptions = (playerId, state) => {
  // Vault limited by Influence.
  const vaultIds = Selector.vaultIds(playerId, state);
  const influence = Selector.computeInfluence(playerId, state);
  let answer = [];

  if (vaultIds.length < influence) {
    const cardIds = Selector.stockpileIds(playerId, state);
    answer = createMoves(cardIds, playerId, state);
  }

  return answer;
};

MoveGenerator.generatePatronOptions = (playerId, state) => {
  // Clientele limited by Influence.
  const clienteleIds = Selector.clienteleIds(playerId, state);
  const influence = Selector.computeInfluence(playerId, state);
  let answer = [];

  if (clienteleIds.length < influence) {
    const cardIds = Selector.cardPool(state);
    answer = createMoves(cardIds, playerId, state);
  }

  return answer;
};

MoveGenerator.generateRoleOptions = (playerId, state) =>
  Selector.isLeader(playerId, state)
    ? generateLeaderRoleOptions(playerId, state)
    : generateNonLeaderRoleOptions(playerId, state);

MoveGenerator.generateThinkerOptions = (playerId, state) => {
  const answer = [];
  const { options } = Role.value(Role.THINKER);

  if (state.jackDeck.length > 0) {
    answer.push(
      MoveState.create({
        playerId,
        moveKey: options.DRAW_JACK,
        roleKey: Role.THINKER,
      })
    );
  }

  const shortfall = Selector.handShortfall(playerId, state);
  answer.push(
    shortfall > 0
      ? MoveState.create({
          playerId,
          moveKey: options.REFILL_HAND,
          roleKey: Role.THINKER,
        })
      : MoveState.create({
          playerId,
          moveKey: options.DRAW_CARD,
          roleKey: Role.THINKER,
        })
  );

  return answer;
};

MoveGenerator.generateOptions = (roleKey, playerId, state) => {
  let answer = [];

  switch (roleKey) {
    case Role.ARCHITECT:
      answer = MoveGenerator.generateArchitectOptions(playerId, state);
      break;
    case Role.CRAFTSMAN:
      answer = MoveGenerator.generateCraftsmanOptions(playerId, state);
      break;
    case Role.LABORER:
      answer = MoveGenerator.generateLaborerOptions(playerId, state);
      break;
    case Role.LEGIONARY:
      answer = MoveGenerator.generateLegionaryOptions(playerId, state);
      break;
    case Role.MERCHANT:
      answer = MoveGenerator.generateMerchantOptions(playerId, state);
      break;
    case Role.PATRON:
      answer = MoveGenerator.generatePatronOptions(playerId, state);
      break;
    case Role.THINKER:
      answer = MoveGenerator.generateThinkerOptions(playerId, state);
      break;
    default:
      console.error(`Unknown roleKey = ${roleKey}`);
  }

  return answer;
};

Object.freeze(MoveGenerator);

export default MoveGenerator;
