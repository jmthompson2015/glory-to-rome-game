/* eslint no-console: ["error", { allow: ["log"] }] */

import NewPlayerPanel from "./NewPlayerPanel.js";

function myOnChange(playerState) {
  console.log(`myOnChange() playerState = ${JSON.stringify(playerState)}`);
}

const element1 = React.createElement(NewPlayerPanel, {
  onChange: myOnChange,
  playerId: 1,
});

ReactDOM.render(element1, document.getElementById("inputArea1"));
