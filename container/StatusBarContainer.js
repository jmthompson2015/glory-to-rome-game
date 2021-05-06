import Selector from "../state/Selector.js";

import Endpoint from "../view/Endpoint.js";
import StatusBarUI from "../view/StatusBarUI.js";

function mapStateToProps(state, ownProps) {
  const player = Selector.currentPlayer(state);

  return {
    helpBase: ownProps.helpBase || `${Endpoint.NETWORK_RESOURCE}view/`,
    playerName: player ? player.name : undefined,
    round: Selector.currentRound(state),
    userMessage: Selector.userMessage(state),
  };
}

export default ReactRedux.connect(mapStateToProps)(StatusBarUI);
