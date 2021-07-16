/* eslint no-console: ["error", { allow: ["error","warn"] }] */

import IV from "../utility/InputValidator.js";

import MoveOption from "../artifact/MoveOption.js";
import Role from "../artifact/Role.js";

import MoveState from "../state/MoveState.js";
import Selector from "../state/Selector.js";

const MoveGenerator = {};

const createMoves = (cardIds, moveKey, playerId, state) => {
  const mapFunction = (cardId) => {
    const card = Selector.orderCard(cardId, state);

    return MoveState.create({
      moveKey,
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
  const filterFunction = (id) => !Selector.isJack(id, state);

  return R.filter(filterFunction, cardIds);
};

const generateBuildStructureOptions = (cards, moveKey, playerId, state) => {
  const reduceFunction = (accum, stockpileCard) => {
    const { materialKey } = stockpileCard.cardType;
    const structureIds2 = Selector.unfinishedStructureIdsByMaterial(
      materialKey,
      playerId,
      state
    );
    const forEachFunction = (structureId) => {
      const move = MoveState.create({
        cardId: stockpileCard.id,
        moveKey,
        playerId,
        roleKey: stockpileCard.cardType.roleKey,
        state,
        structureId,
      });
      accum.push(move);
    };
    R.forEach(forEachFunction, structureIds2);
    return accum;
  };

  return R.reduce(reduceFunction, [], cards);
};

const generateLayFoundationOptions = (handIds, playerId, state) => {
  const reduceFunction = (accum, card) => {
    const { materialKey } = card.cardType;
    IV.validateNotNil("materialKey", materialKey);
    const siteIds = Selector.siteIdsByMaterial(materialKey, state);

    if (siteIds.length > 0) {
      accum.push(
        MoveState.create({
          cardId: card.id,
          materialKey,
          moveKey: MoveOption.LAY_FOUNDATION,
          playerId,
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
    const moveKey = MoveOption.DECLARE_ROLE;

    if (Selector.isJack(cardId, state)) {
      const reduceFunction2 = (accum2, m) =>
        accum2 || Selector.isJack(m.cardId, state);
      const isAlreadyJack = R.reduce(reduceFunction2, false, accum);

      if (!isAlreadyJack) {
        const mapFunction = (roleKey) =>
          MoveState.create({ cardId, moveKey, playerId, roleKey, state });
        const roleKeys = R.without([Role.THINKER], Role.keys());
        const moves = R.map(mapFunction, roleKeys);
        accum.push(...moves);
      }
    } else {
      const { materialKey, roleKey } = card.cardType;
      accum.push(
        MoveState.create({
          cardId,
          moveKey,
          playerId,
          materialKey,
          roleKey,
          state,
        })
      );
    }

    return accum;
  };
  const thinkerMoves = MoveGenerator.generateThinkerOptions(playerId, state);
  const handIds = Selector.handIds(playerId, state);

  return R.reduce(reduceFunction, thinkerMoves, handIds);
};

const generateNonLeaderRoleOptions = (playerId, state) => {
  const leadRoleKey = Selector.leadRoleKey(state);
  const reduceFunction = (accum, cardId) => {
    const card = Selector.orderCard(cardId, state);
    const moveKey = MoveOption.DECLARE_ROLE;

    if (Selector.isJack(cardId, state)) {
      accum.push(
        MoveState.create({
          cardId,
          moveKey,
          playerId,
          roleKey: leadRoleKey,
          state,
        })
      );
    } else if (card.cardType.roleKey === leadRoleKey) {
      const { materialKey, roleKey } = card.cardType;
      accum.push(
        MoveState.create({
          cardId,
          materialKey,
          moveKey,
          playerId,
          roleKey,
          state,
        })
      );
    }

    return accum;
  };
  const thinkerMoves = MoveGenerator.generateThinkerOptions(playerId, state);
  const handIds = Selector.handIds(playerId, state);

  return R.reduce(reduceFunction, thinkerMoves, handIds);
};

// /////////////////////////////////////////////////////////////////////////////
MoveGenerator.generateArchitectOptions = (playerId, state) => {
  const handIds0 = Selector.handIds(playerId, state);
  const handIds = filterJacks(handIds0, state);
  let answer = [];

  if (!R.isEmpty(handIds)) {
    answer = generateLayFoundationOptions(handIds, playerId, state);
  }

  const moveKey = MoveOption.BUILD_FROM_STOCKPILE;
  const stockpileCards = Selector.stockpileCards(playerId, state);
  const structureIds = Selector.unfinishedStructureIds(playerId, state);

  if (!R.isEmpty(stockpileCards) && !R.isEmpty(structureIds)) {
    const newOptions = generateBuildStructureOptions(
      stockpileCards,
      moveKey,
      playerId,
      state
    );
    answer = R.concat(answer, newOptions);
  }

  return answer;
};

MoveGenerator.generateCraftsmanOptions = (playerId, state) => {
  const handIds0 = Selector.handIds(playerId, state);
  const handIds = filterJacks(handIds0, state);
  let answer = [];

  if (!R.isEmpty(handIds)) {
    answer = generateLayFoundationOptions(handIds, playerId, state);
  }

  const moveKey = MoveOption.BUILD_FROM_HAND;
  const structureIds = Selector.unfinishedStructureIds(playerId, state);

  if (!R.isEmpty(handIds) && !R.isEmpty(structureIds)) {
    const handCards = Selector.orderCards(handIds, state);
    const newOptions = generateBuildStructureOptions(
      handCards,
      moveKey,
      playerId,
      state
    );
    answer = R.concat(answer, newOptions);
  }

  return answer;
};

MoveGenerator.generateLaborerOptions = (playerId, state) => {
  const cardIds = Selector.cardPool(state);
  const moveKey = MoveOption.GATHER_MATERIAL;

  return createMoves(cardIds, moveKey, playerId, state);
};

MoveGenerator.generateLegionaryOptions = (playerId, state) => {
  const handIds = filterJacks(Selector.handIds(playerId, state), state);
  const moveKey = MoveOption.DEMAND_MATERIAL;

  return createMoves(handIds, moveKey, playerId, state);
};

MoveGenerator.generateMerchantOptions = (playerId, state) => {
  // Vault limited by Influence.
  const vaultIds = Selector.vaultIds(playerId, state);
  const influence = Selector.computeInfluence(playerId, state);
  const moveKey = MoveOption.SELL_MATERIAL;
  let answer = [];

  if (vaultIds.length < influence) {
    const cardIds = Selector.stockpileIds(playerId, state);
    answer = createMoves(cardIds, moveKey, playerId, state);
  }

  return answer;
};

MoveGenerator.generatePatronOptions = (playerId, state) => {
  // Clientele limited by Influence.
  const clienteleIds = Selector.clienteleIds(playerId, state);
  const influence = Selector.computeInfluence(playerId, state);
  const moveKey = MoveOption.HIRE_CLIENT;
  let answer = [];

  if (clienteleIds.length < influence) {
    const cardIds = Selector.cardPool(state);
    answer = createMoves(cardIds, moveKey, playerId, state);
  }

  return answer;
};

MoveGenerator.generateRoleOptions = (playerId, state) =>
  Selector.isLeader(playerId, state)
    ? generateLeaderRoleOptions(playerId, state)
    : generateNonLeaderRoleOptions(playerId, state);

MoveGenerator.generateThinkerOptions = (playerId, state) => {
  const answer = [];
  const cardId = Selector.leaderCardId(state);

  if (state.jackDeck.length > 0) {
    answer.push(
      MoveState.create({
        cardId,
        moveKey: MoveOption.DRAW_JACK,
        playerId,
        roleKey: Role.THINKER,
      })
    );
  }

  const shortfall = Selector.handShortfall(playerId, state);
  answer.push(
    shortfall > 0
      ? MoveState.create({
          cardId,
          moveKey: MoveOption.REFILL_HAND,
          playerId,
          roleKey: Role.THINKER,
        })
      : MoveState.create({
          cardId,
          moveKey: MoveOption.DRAW_CARD,
          playerId,
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
