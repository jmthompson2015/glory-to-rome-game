/* eslint no-console: ["error", { allow: ["log"] }] */

import IV from "../utility/InputValidator.js";
import PU from "../utility/PromiseUtilities.js";

import Role from "../artifact/Role.js";
import Step from "../artifact/Step.js";

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

import GameOver from "./GameOver.js";
import RoleFunction from "./RoleFunction.js";
import StrategyResolver from "./StrategyResolver.js";

const StepFunction = {};

const determineRoleOptions = (playerId, state) => {
  const handIds = Selector.hand(playerId, state);
  const leaderCardId = Selector.leaderCard(state).id;
  let answer;

  if (Selector.isLeader(playerId, state)) {
    answer = [leaderCardId, ...handIds];
  } else {
    const leadRoleKey = Selector.leadRole(state);
    const filterFunction = (cardId) => {
      const card = Selector.orderCard(cardId, state);

      return card.cardType.roleKey === leadRoleKey;
    };
    const roleCardIds = R.filter(filterFunction, handIds);
    answer = [leaderCardId, ...roleCardIds];
  }

  return answer;
};

const processRoleOptions = (playerId, store) => {
  const options = determineRoleOptions(playerId, store.getState());
  const delay = Selector.delay(store.getState());
  const player = Selector.player(playerId, store.getState());
  const strategy = StrategyResolver.resolve(player.strategy);

  return strategy
    .chooseRoleOption(options, store.getState(), delay)
    .then((cardId) => {
      IV.validateNotNil("cardId", cardId);
      const card = Selector.orderCard(cardId, store.getState());
      const { roleKey } = card.cardType;
      const role = Role.value(roleKey);
      store.dispatch(
        ActionCreator.setUserMessage(
          `${player.name} chose the ${role.name} role.`
        )
      );

      if (Selector.isLeader(playerId, store.getState())) {
        store.dispatch(ActionCreator.setLeadRole(roleKey));
      }

      let answer = Promise.resolve();

      if (roleKey === Role.THINKER) {
        const roleFunction = RoleFunction[Role.THINKER];
        answer = roleFunction.execute(playerId, store);
      } else {
        store.dispatch(ActionCreator.transferHandToCamp(playerId, cardId));
      }

      return answer;
    });
};

StepFunction[Step.DECLARE_ROLE] = (store) => {
  if (!GameOver.isGameOver(store)) {
    const { currentPlayerId, currentPlayerOrder } = store.getState();

    processRoleOptions(currentPlayerId, store).then(() => {
      const { leadRoleKey } = store.getState();

      if (leadRoleKey !== Role.THINKER) {
        // Declare role for other players.
        const reduceFunction = (accum, playerId) => {
          const promise = processRoleOptions(playerId, store);

          return R.append(promise, accum);
        };
        const tasks = R.reduce(reduceFunction, [], currentPlayerOrder.slice(1));
        return PU.allSequential(tasks);
      }

      return Promise.resolve();
    });
  }

  return Promise.resolve();
};

const createTasks = (store) => {
  // Perform role for each player.
  const { currentPlayerOrder, leadRoleKey } = store.getState();
  const roleFunction = RoleFunction[leadRoleKey];
  const reduceFunction = (accum, playerId) => {
    const campIds = Selector.camp(playerId, store.getState());
    const campCards = Selector.orderCards(campIds, store.getState());
    const roleKeys = R.map((c) => c.cardType.roleKey, campCards);

    return roleKeys.length > 0
      ? accum.then(() => roleFunction.execute(playerId, store))
      : accum;
  };

  return R.reduce(reduceFunction, Promise.resolve(), currentPlayerOrder);
};

StepFunction[Step.PERFORM_ROLE] = (store) => {
  console.log(`leadRoleKey = ${store.getState().leadRoleKey}`);
  return store.getState().leadRoleKey !== Role.THINKER
    ? createTasks(store)
    : Promise.resolve();
};

Object.freeze(StepFunction);

export default StepFunction;
