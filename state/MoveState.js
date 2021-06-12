import Material from "../artifact/Material.js";
import Role from "../artifact/Role.js";

const MoveState = {};

MoveState.create = ({
  cardId,
  materialKey,
  moveKey,
  moveStates,
  playerId,
  roleKey,
  structureId,
  state,
}) => {
  let cardInstance;
  let playerInstance;
  let structureInstance;

  if (!R.isNil(state)) {
    cardInstance = state.orderCardInstances[cardId];
    playerInstance = state.playerInstances[playerId];
    structureInstance = state.structureInstances[structureId];
  }

  return {
    // Required.
    playerId,
    // Situational.
    cardId,
    materialKey,
    moveKey,
    moveStates,
    roleKey,
    structureId,
    // Managed.
    cardInstance,
    materialType: Material.value(materialKey),
    playerInstance,
    roleType: Role.value(roleKey),
    structureInstance,
  };
};

Object.freeze(MoveState);

export default MoveState;
