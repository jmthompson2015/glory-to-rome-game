/* eslint no-console: ["error", { allow: ["error","info","log","warn"] }] */

import IV from "../utility/InputValidator.js";
import PU from "../utility/PromiseUtilities.js";

import Role from "../artifact/Role.js";
import Step from "../artifact/Step.js";

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

import GameOver from "./GameOver.js";
import MoveGenerator from "./MoveGenerator.js";
import RoleFunction from "./RoleFunction.js";
import StrategyResolver from "./StrategyResolver.js";

const StepFunction = {};

const processRoleOptions = (playerId, store) => {
  const options = MoveGenerator.generateRoleOptions(playerId, store.getState());

  if (!R.isEmpty(options)) {
    const delay = Selector.delay(store.getState());
    const player = Selector.player(playerId, store.getState());
    const strategy = StrategyResolver.resolve(player.strategy);

    return strategy
      .chooseRoleOption(options, store.getState(), delay)
      .then((moveState) => {
        if (R.isNil(moveState)) {
          console.log(
            `StepFunction.processRoleOptions() playerId = ${playerId} moveState = ${JSON.stringify(
              moveState
            )}`
          );
          console.log(
            `StepFunction.processRoleOptions() playerId = ${playerId} options = ${JSON.stringify(
              options
            )}`
          );
          console.error(`moveState = ${JSON.stringify(moveState)}`);
        }

        IV.validateNotNil("moveState", moveState);
        const { cardId } = moveState;
        IV.validateNotNil("cardId", cardId);
        const card = Selector.orderCard(cardId, store.getState());
        IV.validateNotNil("card", card);
        let answer;

        const { roleKey } = moveState;

        if (R.isNil(roleKey)) {
          console.error(`roleKey = ${roleKey} card = ${JSON.stringify(card)}`);
        }

        IV.validateNotNil("roleKey", roleKey);
        const role = Role.value(roleKey);
        IV.validateNotNil("role", role);
        store.dispatch(
          ActionCreator.setUserMessage(
            `${player.name} chose the ${role.name} role.`
          )
        );

        if (Selector.isLeader(playerId, store.getState())) {
          store.dispatch(ActionCreator.setLeadRole(roleKey));
        }

        answer = Promise.resolve();

        if (roleKey === Role.THINKER) {
          const roleFunction = RoleFunction[Role.THINKER];
          answer = roleFunction.execute(playerId, store);
        } else {
          store.dispatch(ActionCreator.transferHandToCamp(playerId, cardId));
        }

        return answer;
      });
  }

  return Promise.resolve();
};

StepFunction[Step.DECLARE_ROLE] = (store) => {
  let answer = Promise.resolve();

  if (!GameOver.isGameOver(store)) {
    const { currentPlayerId, currentPlayerOrder } = store.getState();

    answer = processRoleOptions(currentPlayerId, store).then(() => {
      const { leadRoleKey } = store.getState();

      if (leadRoleKey !== Role.THINKER) {
        // Declare role for other players.
        const reduceFunction = (accum, playerId) => {
          const promise = processRoleOptions(playerId, store);

          return R.append(promise, accum);
        };
        const tasks = R.reduce(reduceFunction, [], currentPlayerOrder.slice(1));
        answer = PU.allSequential(tasks);
      }
    });
  }

  return answer;
};

const createTasks = (store) => {
  // Perform role for each player.
  const { currentPlayerOrder, leadRoleKey } = store.getState();
  const roleFunction = RoleFunction[leadRoleKey];
  const reduceFunction = (accum, playerId) => {
    const campIds = Selector.campIds(playerId, store.getState());
    const campCards = Selector.orderCards(campIds, store.getState());
    const roleKeys = R.map((c) => c.cardType.roleKey, campCards);

    return roleKeys.length > 0
      ? accum.then(() => roleFunction.execute(playerId, store))
      : accum;
  };

  console.info("StepFunction.createTasks() ends");
  return R.reduce(reduceFunction, Promise.resolve(), currentPlayerOrder);
};

StepFunction[Step.PERFORM_ROLE] = (store) => {
  if (!GameOver.isGameOver(store)) {
    return store.getState().leadRoleKey !== Role.THINKER
      ? createTasks(store)
      : Promise.resolve();
  }

  console.info("StepFunction[PERFORM_ROLE] ends");
  return Promise.resolve();
};

StepFunction[Step.CLEANUP] = (store) => {
  if (!GameOver.isGameOver(store)) {
    const forEachFunction = (playerId) => {
      const campIds = Selector.campIds(playerId, store.getState());
      if (campIds.length > 0) {
        store.dispatch(
          ActionCreator.transferCampToPool(playerId, R.head(campIds))
        );
      }
    };
    const currentPlayerOrder = Selector.currentPlayerOrder(store.getState());
    R.forEach(forEachFunction, currentPlayerOrder);

    // Give the next player the Leader card.
    const fromPlayerId = currentPlayerOrder[0];
    const cardId = Selector.leaderCardId(store.getState());
    const toPlayerId = currentPlayerOrder[1];
    store.dispatch(
      ActionCreator.transferHandToHand(fromPlayerId, cardId, toPlayerId)
    );
  }

  console.info("StepFunction[CLEANUP] ends");
  return Promise.resolve();
};

Object.freeze(StepFunction);

export default StepFunction;
