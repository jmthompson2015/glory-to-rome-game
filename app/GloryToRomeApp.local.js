import GtRGame from "../model/GtRGame.js";
import Reducer from "../state/Reducer.js";
import Setup from "../model/Setup.js";
import TestData from "../model/TestData.js";

import Endpoint from "../view/Endpoint.js";

import GameContainer from "../container/GameContainer.js";
import GameRecordsContainer from "../container/GameRecordsContainer.js";
import StatusBarContainer from "../container/StatusBarContainer.js";

const GloryToRomeApp = {};

const isLocal = true;
const endpoint = isLocal ? Endpoint.LOCAL_RESOURCE : Endpoint.NETWORK_RESOURCE;
const resourceBase = endpoint;
const helpBase = `${endpoint}view/`;

const playGame = () => {
  document.getElementById("newGamePanel").style.display = "none";

  const store = Redux.createStore(Reducer.root);
  const players = TestData.createPlayers();
  const newPlayer0 = {
    ...players[0],
    isComputer: false,
    strategy: "HumanPlayerStrategy",
  };
  players[0] = newPlayer0;
  console.log(`players = ${JSON.stringify(players)}`);
  Setup.execute(store, players);

  // Status Bar
  const container2 = React.createElement(StatusBarContainer, { helpBase });
  const element2 = React.createElement(
    ReactRedux.Provider,
    { store },
    container2
  );
  ReactDOM.render(element2, document.getElementById("statusBarPanel"));

  // Game Panel
  const container3 = React.createElement(GameContainer, { resourceBase });
  const element3 = React.createElement(
    ReactRedux.Provider,
    { store },
    container3
  );
  ReactDOM.render(element3, document.getElementById("gamePanel"));

  // Game Records
  const container4 = React.createElement(GameRecordsContainer);
  const element4 = React.createElement(
    ReactRedux.Provider,
    { store },
    container4
  );
  ReactDOM.render(element4, document.getElementById("gameRecords"));

  GtRGame.execute(store);
};

// const element1 = React.createElement(NewGameDialog, {
//   initialPlayerToTableau: Setup.createInitialPlayerToTableau(),
//   callback: playGame,
// });
//
// ReactDOM.render(element1, document.getElementById("newGamePanel"));
playGame();

Object.freeze(GloryToRomeApp);

export default GloryToRomeApp;
