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
}) => ({
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
  materialType: Material.value(materialKey),
  roleType: Role.value(roleKey),
});

Object.freeze(MoveState);

export default MoveState;
