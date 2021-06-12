import StatusBarUI from "./StatusBarUI.js";

const element = React.createElement(StatusBarUI, {
  leaderName: "Alfred",
  leadRoleName: "Architecture",
  phaseName: "Declare Role",
  playerName: "Clark",
  round: 12,
  userMessage: "Somebody attacked someone.",
});
ReactDOM.render(element, document.getElementById("panel"));
