import Endpoint from "../view/Endpoint.js";
import GameUI from "../view/GameUI.js";

const mapStateToProps = (state) => ({
  resourceBase: Endpoint.LOCAL_RESOURCE,
  state,
});

export default ReactRedux.connect(mapStateToProps)(GameUI);
