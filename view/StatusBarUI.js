const { ReactUtilities: RU } = ReactComponent;

class StatusBarUI extends React.PureComponent {
  render() {
    const {
      helpBase,
      leaderName,
      leadRoleName,
      phaseName,
      playerName,
      round,
      userMessage,
    } = this.props;
    const helpLinkUI = ReactDOMFactories.a(
      { href: `${helpBase}Help.html`, target: "_blank" },
      "Help"
    );
    const className = "ba";

    const roundCell = RU.createCell(["Round: ", round], 1, className, {
      title: "Round",
    });
    const leaderCell = RU.createCell(["Leader: ", leaderName], 2, className, {
      title: "Leader",
    });
    const phaseCell = RU.createCell(["Phase: ", phaseName], 3, className, {
      title: "Phase",
    });
    const leadRoleCell = RU.createCell(
      ["Lead Role: ", leadRoleName],
      4,
      className,
      {
        title: "Lead Role Name",
      }
    );
    const playerCell = RU.createCell(["Player: ", playerName], 5, className, {
      title: "Player",
    });
    const userMessageCell = RU.createCell(userMessage, 6, className, {
      title: "User Message",
    });
    const helpCell = RU.createCell(helpLinkUI, 7, className);

    const cells = [
      roundCell,
      leaderCell,
      phaseCell,
      leadRoleCell,
      playerCell,
      userMessageCell,
      helpCell,
    ];
    const row = RU.createRow(cells);
    const customKey =
      `${leaderName}-${leadRoleName}-${phaseName}-${playerName}` +
      `-${round}-${userMessage}`;

    return RU.createTable(row, customKey, "bg-light-gray ma0 tc v-mid w-100");
  }
}

StatusBarUI.propTypes = {
  round: PropTypes.number.isRequired,

  helpBase: PropTypes.string,
  leaderName: PropTypes.string,
  leadRoleName: PropTypes.string,
  phaseName: PropTypes.string,
  playerName: PropTypes.string,
  userMessage: PropTypes.string,
};

StatusBarUI.defaultProps = {
  helpBase: "./",
  leaderName: undefined,
  leadRoleName: undefined,
  phaseName: undefined,
  playerName: undefined,
  userMessage: undefined,
};

export default StatusBarUI;
