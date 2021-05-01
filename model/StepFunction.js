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

const firstRoleCard = (roleKey, hand) => {
  IV.validateNotNil("roleKey", roleKey);
  IV.validateNotEmpty("hand", hand);
  const filterFunction = (card) => card.cardType.roleKey === roleKey;
  const roleCards = R.filter(filterFunction, hand);
  IV.validateNotEmpty("roleCards", roleCards);

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

const processRoleOptions = (playerId, store) => {
  const options0 = roleOptions(playerId, store.getState());
  const leaderId = Selector.leaderId(store.getState());
  let options;
  if (playerId === leaderId) {
    options = options0;
  } else {
    const { leadRoleKey } = store.getState();
    options = options0.includes(leadRoleKey)
      ? [Role.THINKER, leadRoleKey]
      : [Role.THINKER];
  }
  const delay = Selector.delay(store.getState());
  const player = Selector.player(playerId, store.getState());
  const strategy = StrategyResolver.resolve(player.strategy);

  return strategy
    .chooseRoleOption(options, store.getState(), delay)
    .then((roleKey) => {
      IV.validateNotNil("roleKey", roleKey);
      const role = Role.value(roleKey);
      store.dispatch(
        ActionCreator.setUserMessage(
          `${player.name} chose the ${role.name} role.`
        )
      );

      if (playerId === leaderId) {
        store.dispatch(ActionCreator.setLeadRole(roleKey));
      }

      if (roleKey === Role.THINKER) {
        const roleFunction = RoleFunction[Role.THINKER];

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

    return roleKeys.length > 0 ? roleFunction.execute(playerId, store) : accum;
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
