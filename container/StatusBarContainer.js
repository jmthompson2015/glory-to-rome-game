import Phase from "../artifact/Phase.js";

import Selector from "../state/Selector.js";

import Endpoint from "../view/Endpoint.js";
import StatusBarUI from "../view/StatusBarUI.js";

function mapStateToProps(state, ownProps) {
  const leader = Selector.player(Selector.leaderId(state), state);
  const phase = Phase.value(Selector.currentPhaseKey(state));
  const player = Selector.currentPlayer(state);

  return {
    helpBase: ownProps.helpBase || `${Endpoint.NETWORK_RESOURCE}view/`,
    leaderName: leader ? leader.name : undefined,
    phaseName: phase ? phase.name : undefined,
    playerName: player ? player.name : undefined,
    round: Selector.currentRound(state),
    userMessage: Selector.userMessage(state),
  };
}

export default ReactRedux.connect(mapStateToProps)(StatusBarUI);
