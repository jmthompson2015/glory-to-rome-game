import PlayerState from "../state/PlayerState.js";

const { ReactUtilities: RU, Select } = ReactComponent;

const computerTypes = [
  // "MCTSPlayerStrategy",
  "RandomPlayerStrategy",
  // "SimplePlayerStrategy",
];
const humanTypes = ["HumanPlayerStrategy"];
const playerTypes = R.concat(computerTypes, humanTypes).sort();
const typeToName = {
  HumanPlayerStrategy: "Human",
  MCTSPlayerStrategy: "MCTS (computer)",
  RandomPlayerStrategy: "Random (computer)",
  SimplePlayerStrategy: "Simple (computer)",
};

const createNameInput = (name, onChange) =>
  ReactDOMFactories.input({ type: "text", size: 12, value: name, onChange });

const createStrategySelect = (strategy, onChange) => {
  const reduceFunction = (accum, s) =>
    R.append({ key: s, label: typeToName[s] }, accum);
  const values = R.reduce(reduceFunction, [], playerTypes);

  return React.createElement(Select, {
    id: "StrategySelect",
    values,
    onChange,
    initialValue: strategy,
  });
};

// /////////////////////////////////////////////////////////////////////////////////////////////////
class NewPlayerPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = { name: props.initialName, strategy: props.initialStrategy };

    this.handleNameChange = this.handleNameChangeFunction.bind(this);
    this.handleTypeChange = this.handleTypeChangeFunction.bind(this);
  }

  handleNameChangeFunction(event) {
    const { onChange, playerId } = this.props;
    const { strategy } = this.state;
    const name = event.target.value;
    this.setState({ name });
    const player = PlayerState.create({
      id: playerId,
      name,
      isComputer: computerTypes.includes(strategy),
      strategy,
    });

    onChange(player);
  }

  handleTypeChangeFunction(newStrategy) {
    const { onChange, playerId } = this.props;
    const { name } = this.state;
    this.setState({ strategy: newStrategy });
    const player = PlayerState.create({
      id: playerId,
      name,
      isComputer: computerTypes.includes(newStrategy),
      strategy: newStrategy,
    });

    onChange(player);
  }

  render() {
    const { customKey, playerId } = this.props;
    const { name, strategy } = this.state;
    const nameInput = createNameInput(name, this.handleNameChange);
    const strategySelect = createStrategySelect(
      strategy,
      this.handleTypeChange
    );

    const titleCell = RU.createCell(`Player ${playerId}`, "titleCell", "b f5");
    const namePromptCell = RU.createCell("Name:", "namePromptCell", "pa1");
    const nameInputCell = RU.createCell(nameInput, "nameInputCell", "pa1");
    const strategyPromptCell = RU.createCell(
      "Type:",
      "strategyPromptCell",
      "pa1"
    );
    const strategySelectCell = RU.createCell(
      strategySelect,
      "strategySelectCell",
      "pa1"
    );

    const rows1 = [
      RU.createRow([namePromptCell, nameInputCell], "nameRow"),
      RU.createRow([strategyPromptCell, strategySelectCell], "strategyRow"),
    ];
    const inputTable = RU.createTable(rows1, "inputTable", "tl");

    const rows2 = [
      RU.createRow(titleCell, "titleRow"),
      RU.createRow(inputTable, "inputTableRow"),
    ];

    return RU.createTable(rows2, customKey, "bg-white center f6 ma0 tc");
  }
}

NewPlayerPanel.propTypes = {
  onChange: PropTypes.func.isRequired,
  playerId: PropTypes.number.isRequired,

  customKey: PropTypes.string,
  initialName: PropTypes.string,
  initialStrategy: PropTypes.string,
};

NewPlayerPanel.defaultProps = {
  customKey: "NewPlayerPanel",
  initialName: "Alfred",
  initialStrategy: "RandomPlayerStrategy",
};

export default NewPlayerPanel;
