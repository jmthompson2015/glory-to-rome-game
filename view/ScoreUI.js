const { ReactUtilities: RU, TitledElement } = ReactComponent;

class ScoreUI extends React.PureComponent {
  render() {
    const { customKey, playerInstances, playerToScore } = this.props;
    const mapFunction = (playerId) => {
      const player = playerInstances[playerId];
      const score = playerToScore[playerId];
      const cells = [
        RU.createCell(`${player.name}:`, `ScoreNameCell${playerId}`, "pr1"),
        RU.createCell(score, `ScoreCell${playerId}`),
      ];
      return RU.createRow(cells, `ScoreRow${playerId}`);
    };
    const rows = R.map(mapFunction, Object.keys(playerToScore));

    const table = RU.createTable(rows, "ScoreUI", "bg-light-gray pa1 tl");

    return React.createElement(
      TitledElement,
      {
        element: table,
        title: "Scores",
        titleClass: "b bg-gray f5 ph1 pt1 tc v-mid",
      },
      customKey
    );
  }
}

ScoreUI.propTypes = {
  playerInstances: PropTypes.shape().isRequired,
  playerToScore: PropTypes.shape().isRequired,

  customKey: PropTypes.string,
};

ScoreUI.defaultProps = {
  customKey: "ScoreUI",
};

export default ScoreUI;
