/* eslint no-console: ["error", { allow: ["log"] }] */

import Version from "../artifact/Version.js";

import NewGameDialog from "./NewGameDialog.js";

function myCallback(versionKey, playerInstances) {
  console.log(
    `myCallback() versionKey = ${versionKey}\nplayerInstances = ${JSON.stringify(
      playerInstances,
      null,
      2
    )}`
  );
}

const element1 = React.createElement(NewGameDialog, {
  callback: myCallback,
  initialCount: 5,
  initialVersionKey: Version.IMPERIUM,
});

ReactDOM.render(element1, document.getElementById("inputArea1"));
