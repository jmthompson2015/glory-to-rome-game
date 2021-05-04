import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

import TestData from "../model/TestData.js";

import Endpoint from "./Endpoint.js";
import TableauUI from "./TableauUI.js";

const store = TestData.createStore();
const playerId = 1;
store.dispatch(
  ActionCreator.addToPlayerArray("playerToInfluence", playerId, 32)
);
store.dispatch(
  ActionCreator.addToPlayerArray("playerToInfluence", playerId, 35)
);

store.dispatch(
  ActionCreator.addToPlayerArray("playerToClientele", playerId, 38)
);
store.dispatch(
  ActionCreator.addToPlayerArray("playerToClientele", playerId, 47)
);

store.dispatch(ActionCreator.addToPlayerArray("playerToVault", playerId, 50));
store.dispatch(ActionCreator.setOrderCardFaceup(50, false));
store.dispatch(ActionCreator.addToPlayerArray("playerToVault", playerId, 53));
store.dispatch(ActionCreator.setOrderCardFaceup(53, false));

store.dispatch(
  ActionCreator.addToPlayerArray("playerToStockpile", playerId, 56)
);
store.dispatch(
  ActionCreator.addToPlayerArray("playerToStockpile", playerId, 59)
);

store.dispatch(ActionCreator.addToPlayerArray("playerToCamp", playerId, 62));
const state = store.getState();

const element = React.createElement(TableauUI, {
  campCards: Selector.campCards(playerId, state),
  clienteleCards: Selector.clienteleCards(playerId, state),
  handCards: Selector.handCards(playerId, state),
  influenceCards: Selector.influenceCards(playerId, state),
  player: Selector.player(playerId, state),
  resourceBase: Endpoint.LOCAL_RESOURCE,
  stockpileCards: Selector.stockpileCards(playerId, state),
  structures: Selector.structures(
    Selector.structureIds(playerId, state),
    state
  ),
  vaultCards: Selector.vaultCards(playerId, state),
  width: 150,
});
ReactDOM.render(element, document.getElementById("panel"));
