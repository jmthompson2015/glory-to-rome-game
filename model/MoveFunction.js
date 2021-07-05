import IV from "../utility/InputValidator.js";

import Material from "../artifact/Material.js";
import OrderCard from "../artifact/OrderCard.js";
import Phase from "../artifact/Phase.js";
import Role from "../artifact/Role.js";

import Selector from "../state/Selector.js";

const createCardDescription = (cardInstance, materialType) => {
  const cardId = cardInstance ? cardInstance.id : undefined;
  const cardType = cardInstance ? cardInstance.cardType : undefined;
  const cardName = cardType ? cardType.name : "";
  const materialKey = materialType ? materialType.key : cardType.materialKey;
  const materialName = materialKey ? Material.value(materialKey).name : "";
  const materialValue = cardType ? cardType.materialValue : "";

  return OrderCard.isJack(cardInstance.cardKey)
    ? `${cardId} ${cardName}`
    : `${cardId} ${cardName} ${materialName} ${materialValue}`;
};

const determineRoleName = (moveState, state) => {
  const { roleType } = moveState;
  const { currentPhaseKey, leadRoleKey } = state;

  return currentPhaseKey === Phase.DECLARE_ROLE
    ? roleType.name
    : Role.value(leadRoleKey).name;
};

const createLabel = (moveState, state) => {
  IV.validateNotNil("moveState", moveState);
  IV.validateNotNil("state", state);
  const { cardInstance, materialType } = moveState;
  const roleName = determineRoleName(moveState, state);
  const cardDesc = createCardDescription(cardInstance, materialType);

  return R.isNil(moveState.moveKey)
    ? `${roleName} (${cardDesc})`
    : `${roleName}: ${moveState.moveKey} (${cardDesc})`;
};

const MoveFunction = {
  [Role.ARCHITECT]: {
    execute: (/* moveState, store */) => {},
    isLegal: (/* shipId, state */) => true,
    label: createLabel,
  },
  [Role.CRAFTSMAN]: {
    execute: (/* moveState, store */) => {},
    isLegal: (/* shipId, state */) => true,
    label: createLabel,
  },
  [Role.LABORER]: {
    execute: (/* moveState, store */) => {},
    isLegal: (/* shipId, state */) => true,
    label: createLabel,
  },
  [Role.LEGIONARY]: {
    execute: (/* moveState, store */) => {},
    isLegal: (/* shipId, state */) => true,
    label: createLabel,
  },
  [Role.MERCHANT]: {
    execute: (/* moveState, store */) => {},
    isLegal: (/* shipId, state */) => true,
    label: createLabel,
  },
  [Role.PATRON]: {
    execute: (/* moveState, store */) => {},
    isLegal: (/* shipId, state */) => true,
    label: createLabel,
  },
  [Role.THINKER]: {
    execute: (/* moveState, store */) => {},
    isLegal: (/* shipId, state */) => true,
    label: (moveState, state) => {
      IV.validateNotNil("moveState", moveState);
      IV.validateNotNil("state", state);
      const roleName = determineRoleName(moveState, state);

      return `${roleName}: ${moveState.moveKey}`;
    },
  },
};

MoveFunction.createGameRecord = (moveState, state) => {
  let answer;

  if (moveState) {
    const round = Selector.currentRound(state);
    const gameRecords = Selector.gameRecords(state);
    const roundRecords = R.filter((r) => r.round === round, gameRecords);
    const turn = roundRecords.length + 1;
    const { currentPhaseKey } = state;
    const phaseName = Phase.value(currentPhaseKey).name;
    const player = state.playerInstances[moveState.playerId];
    const playerName = player ? player.name : `Player ${moveState.playerId}`;
    const label = MoveFunction.label(moveState, state);

    answer = `${round}.${turn} ${phaseName}: ${playerName}: ${label}`;
  }

  return answer;
};

MoveFunction.label = (moveState, state) => {
  const { roleKey } = moveState;
  const { leadRoleKey } = state;
  const myRoleKey = roleKey || leadRoleKey;

  return MoveFunction[myRoleKey].label(moveState, state);
};

Object.freeze(MoveFunction);

export default MoveFunction;
