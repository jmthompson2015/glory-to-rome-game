const PlayerState = {};

PlayerState.create = ({
  id,
  name,
  isComputer = true,
  strategy = "RandomPlayerStrategy",
}) =>
  Immutable({
    // Required.
    id,
    name,
    // Situational.
    isComputer,
    strategy,
  });

Object.freeze(PlayerState);

export default PlayerState;
