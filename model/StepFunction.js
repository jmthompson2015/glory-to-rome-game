/* eslint no-console: ["error", { allow: ["log"] }] */

import PU from "../utility/PromiseUtilities.js";

import Role from "../artifact/Role.js";
import Step from "../artifact/Step.js";

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

import GameOver from "./GameOver.js";
import RoleFunction from "./RoleFunction.js";
import StrategyResolver from "./StrategyResolver.js";

const StepFunction = {};

const firstRoleCard = (roleKey, hand) => {
  const filterFunction = (card) => card.cardType.roleKey === roleKey;
  const roleCards = R.filter(filterFunction, hand);

  return R.head(roleCards).id;
};

const roleOptions = (playerId, state) => {
  const handIds = Selector.hand(playerId, state);
  const hand = Selector.orderCards(handIds, state);
  const reduceFunction = (accum, card) => {
    if (card && card.cardType && card.cardType.roleKey) {
      return R.append(card.cardType.roleKey, accum);
    }
    return accum;
  };

  return R.uniq(R.reduce(reduceFunction, [Role.THINKER], hand));
};

const processOptions = (playerId, store) => {
  const options0 = roleOptions(playerId, store.getState());
  const { leadRoleKey } = store.getState();
  const options = options0.includes(leadRoleKey)
    ? [Role.THINKER, leadRoleKey]
    : [Role.THINKER];
  const delay = Selector.delay(store.getState());
  const player = Selector.player(playerId, store.getState());
  const strategy = StrategyResolver.resolve(player.strategy);

  return strategy
    .chooseRoleOption(options, store.getState(), delay)
    .then((roleKey) => {
      const role = Role.value(roleKey);
      store.dispatch(
        ActionCreator.setUserMessage(
          `${player.name} chose the ${role.name} role.`
        )
      );

      if (playerId === store.getState().leaderId) {
        store.dispatch(ActionCreator.setLeadRole(roleKey));
      }

      if (roleKey === Role.THINKER) {
        const roleFunction = RoleFunction[roleKey];

        return roleFunction.execute(playerId, store);
      }

      const handIds = Selector.hand(playerId, store.getState());
      const hand = Selector.orderCards(handIds, store.getState());
      const cardId = firstRoleCard(roleKey, hand);
      store.dispatch(ActionCreator.transferHandToCamp(playerId, cardId));

      return Promise.resolve();
    });
};

StepFunction[Step.DECLARE_ROLE] = (store) => {
  if (!GameOver.isGameOver(store)) {
    const { currentPlayerOrder, leaderId } = store.getState();
    store.dispatch(ActionCreator.setCurrentPlayer(leaderId));

    processOptions(leaderId, store).then(() => {
      const { leadRoleKey } = store.getState();

      if (leadRoleKey !== Role.THINKER) {
        // Declare role for other players.
        const reduceFunction = (accum, playerId) => {
          const promise = processOptions(playerId, /* options, */ store);

          return R.append(promise, accum);
        };
        const tasks = R.reduce(reduceFunction, [], currentPlayerOrder.slice(1));
        PU.allSequential(tasks);
      }

      return Promise.resolve();
    });
  }

  return Promise.resolve();
};

StepFunction[Step.PERFORM_ROLE] = (store) => {
  const state = store.getState();
  console.log(
    `round = ${state.currentRound} phase = ${state.currentPhaseKey} ` +
      `player = ${state.currentPlayerId} step = ${state.currentStepKey}`
  );
  const { leadRoleKey } = store.getState();
  if (leadRoleKey !== Role.THINKER) {
    // Perform role for each player.
    // const roleFunction = RoleFunction[leadRoleKey];
    // roleFunction.execute(store);
  }
};

Object.freeze(StepFunction);

export default StepFunction;
