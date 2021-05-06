const { ReactUtilities: RU } = ReactComponent;

class StatusBarUI extends React.PureComponent {
  render() {
    const { helpBase, playerName, round, userMessage } = this.props;
    const helpLinkUI = ReactDOMFactories.a(
      { href: `${helpBase}Help.html`, target: "_blank" },
      "Help"
    );
    const className = "ba";

    const roundCell = RU.createCell(["Round: ", round], 1, className, {
      title: "Round",
    });
    const playerCell = RU.createCell(["Player: ", playerName], 2, className, {
      title: "Player",
    });
    const userMessageCell = RU.createCell(userMessage, 3, className, {
      title: "User Message",
    });
    const helpCell = RU.createCell(helpLinkUI, 4, className);

    const cells = [roundCell, playerCell, userMessageCell, helpCell];
    const row = RU.createRow(cells);

    return RU.createTable(
      row,
      "statusBarUITable",
      "bg-light-gray ma0 tc v-mid w-100"
    );
  }
}

StatusBarUI.propTypes = {
  round: PropTypes.number.isRequired,

  helpBase: PropTypes.string,
  playerName: PropTypes.string,
  userMessage: PropTypes.string,
};

StatusBarUI.defaultProps = {
  helpBase: "./",
  playerName: undefined,
  userMessage: undefined,
};

export default StatusBarUI;
