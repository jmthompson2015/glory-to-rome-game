import Version from "../artifact/Version.js";

import PlayerState from "../state/PlayerState.js";

import NewPlayerPanel from "./NewPlayerPanel.js";

const { ReactUtilities: RU, Select } = ReactComponent;

const PLAYER_COUNTS = [2, 3, 4, 5];
const INITIAL_PLAYER1 = PlayerState.create({
  id: 1,
  name: "Alfred", // Pennyworth
  isComputer: false,
  strategy: "HumanPlayerStrategy",
});
const INITIAL_PLAYER2 = PlayerState.create({
  id: 2,
  name: "Bruce", // Wayne
  strategy: "RandomPlayerStrategy",
});
const INITIAL_PLAYER3 = PlayerState.create({
  id: 3,
  name: "Clark", // Kent
  strategy: "RandomPlayerStrategy",
});
const INITIAL_PLAYER4 = PlayerState.create({
  id: 4,
  name: "Diana", // Prince
  strategy: "RandomPlayerStrategy",
});
const INITIAL_PLAYER5 = PlayerState.create({
  id: 5,
  name: "Edward", // Nygma
  strategy: "RandomPlayerStrategy",
});
const INITIAL_PLAYERS2 = {
  1: INITIAL_PLAYER1,
  2: INITIAL_PLAYER2,
};
const INITIAL_PLAYERS3 = R.assoc(3, INITIAL_PLAYER3, INITIAL_PLAYERS2);
const INITIAL_PLAYERS4 = R.assoc(4, INITIAL_PLAYER4, INITIAL_PLAYERS3);
const INITIAL_PLAYERS5 = R.assoc(5, INITIAL_PLAYER5, INITIAL_PLAYERS4);

const createPlayersForCount = R.cond([
  [R.equals(2), R.always(INITIAL_PLAYERS2)],
  [R.equals(3), R.always(INITIAL_PLAYERS3)],
  [R.equals(4), R.always(INITIAL_PLAYERS4)],
  [R.equals(5), R.always(INITIAL_PLAYERS5)],
]);

const createButtons = (onClick) => {
  const okButton = RU.createButton("OK", "okButton", undefined, { onClick });

  return RU.createSpan(okButton);
};

const createCountSelect = (count, onChange) => {
  const reduceFunction = (accum, v) =>
    R.append({ key: v.toString(), label: v.toString() }, accum);
  const values = R.reduce(reduceFunction, [], PLAYER_COUNTS);

  return React.createElement(Select, {
    id: "CountSelect",
    values,
    onChange,
    initialValue: count ? count.toString() : undefined,
  });
};

const createNewPlayerPanel = (playerState, onChange) => {
  const panel = React.createElement(NewPlayerPanel, {
    key: `player${playerState.id}`,
    playerId: playerState.id,
    onChange,
    customKey: `player${playerState.id}`,
    initialName: playerState.name,
    initialStrategy: playerState.strategy,
  });

  return ReactDOMFactories.div(
    { key: `player${playerState.id}`, className: "ma1" },
    panel
  );
};

const createVersionSelect = (versionKey, onChange) => {
  const reduceFunction = (accum, v) =>
    R.append({ key: v.key, label: v.name }, accum);
  const values = R.reduce(reduceFunction, [], Version.values());

  return React.createElement(Select, {
    id: "VersionSelect",
    values,
    onChange,
    initialValue: versionKey,
  });
};

const createInitialInput = (
  customKey,
  count,
  players,
  versionKey,
  handleCountChange,
  handlePlayerChange,
  handleVersionChange
) => {
  const versionSelect = createVersionSelect(versionKey, handleVersionChange);
  const countSelect = createCountSelect(count, handleCountChange);
  const playerPanel1 = createNewPlayerPanel(players[1], handlePlayerChange);
  const playerPanel2 = createNewPlayerPanel(players[2], handlePlayerChange);

  const versionPromptCell = RU.createCell("Version:", "versionPromptCell");
  const versionSelectCell = RU.createCell(versionSelect, "versionCell");
  const countPromptCell = RU.createCell("Player Count:", "countPromptCell");
  const countSelectCell = RU.createCell(countSelect, "countCell");
  const rows1 = [
    RU.createRow([versionPromptCell, versionSelectCell], "versionSelectRow"),
    RU.createRow([countPromptCell, countSelectCell], "countSelectRow"),
  ];
  const versionCountTable = RU.createTable(rows1, "versionCountTable");
  const cells = [playerPanel1, playerPanel2];

  if (count > 2) {
    const playerPanel3 = createNewPlayerPanel(players[3], handlePlayerChange);
    cells.push(playerPanel3);
  }

  if (count > 3) {
    const playerPanel4 = createNewPlayerPanel(players[4], handlePlayerChange);
    cells.push(playerPanel4);
  }

  if (count > 4) {
    const playerPanel5 = createNewPlayerPanel(players[5], handlePlayerChange);
    cells.push(playerPanel5);
  }

  const playerTable = RU.createFlexboxWrap(
    cells,
    `playerTable${count}`,
    "f6 tl"
  );

  const rows2 = [
    RU.createRow(RU.createCell(versionCountTable), "versionCountTableRow"),
    RU.createRow(RU.createCell(playerTable), `playerTableRow${count}`),
  ];

  return RU.createTable(rows2, `initialInput${count}`, "f6 tl");
};

// /////////////////////////////////////////////////////////////////////////////////////////////////
class NewGameDialog extends React.Component {
  constructor(props) {
    super(props);

    const { initialCount, initialVersionKey } = props;
    const initialPlayers = createPlayersForCount(initialCount);
    this.state = { players: initialPlayers, versionKey: initialVersionKey };

    this.handleCountChange = this.handleCountChangeFunction.bind(this);
    this.handlePlayerChange = this.handlePlayerChangeFunction.bind(this);
    this.handleVersionChange = this.handleVersionChangeFunction.bind(this);
    this.ok = this.okFunction.bind(this);
  }

  handleCountChangeFunction(newCount0) {
    const newCount = parseInt(newCount0, 10);
    const newPlayers = createPlayersForCount(newCount);

    this.setState({ players: newPlayers });
  }

  handlePlayerChangeFunction(playerState) {
    const { players } = this.state;
    const newPlayers = R.assoc(playerState.id, playerState, players);

    this.setState({ players: newPlayers });
  }

  handleVersionChangeFunction(newVersionKey) {
    this.setState({ versionKey: newVersionKey });
  }

  get count() {
    const { players } = this.state;

    return Object.keys(players).length;
  }

  get versionKey() {
    const { versionKey } = this.state;

    return versionKey;
  }

  okFunction() {
    const { callback } = this.props;
    const { players, versionKey } = this.state;

    callback(versionKey, players);
  }

  render() {
    const { customKey } = this.props;
    const { players } = this.state;
    const initialInput = createInitialInput(
      customKey,
      this.count,
      players,
      this.versionKey,
      this.handleCountChange,
      this.handlePlayerChange,
      this.handleVersionChange
    );
    const buttons = createButtons(this.ok);

    return React.createElement(ReactComponent.OptionPane, {
      key: `${customKey}${this.count}`,
      buttons,
      buttonsClass: "b bg-light-gray f5 pa1 tr v-mid",
      className: "bg-white ma0 pa0",
      initialInput,
      message: "",
      title: "New Game",
      titleClass: "b bg-light-gray f5 pa1 tc v-mid",
    });
  }
}

NewGameDialog.propTypes = {
  callback: PropTypes.func.isRequired,

  customKey: PropTypes.string,
  initialCount: PropTypes.number,
  initialVersionKey: PropTypes.string,
};

NewGameDialog.defaultProps = {
  customKey: "NewGameDialog",
  initialCount: 5,
  initialVersionKey: Version.IMPERIUM,
};

export default NewGameDialog;
