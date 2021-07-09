import Role from "./Role.js";

const MoveOption = {
  BUILD_FROM_HAND: "buildHand", // Craftsman
  BUILD_FROM_STOCKPILE: "buildStockpile", // Achitect
  DECLARE_ROLE: "declareRole",
  DEMAND_MATERIAL: "demandMaterial", // Legionary
  DRAW_CARD: "drawCard", // Thinker
  DRAW_JACK: "drawJack", // Thinker
  GATHER_MATERIAL: "gatherMaterial", // Laborer
  HIRE_CLIENT: "hireClient", // Patron
  LAY_FOUNDATION: "layFoundation", // Achitect, Craftsman
  REFILL_HAND: "refillHand", // Thinker
  SELL_MATERIAL: "sellMaterial", // Merchant
};

MoveOption.properties = {
  buildHand: {
    name: "Build a Structure from Hand",
    roleKeys: [Role.CRAFTSMAN],
    key: "buildHand",
  },
  buildStockpile: {
    name: "Build a Structure from Stockpile",
    roleKeys: [Role.ARCHITECT],
    key: "buildStockpile",
  },
  declareRole: {
    name: "Declare Role",
    roleKeys: Role.keys(),
    key: "declareRole",
  },
  demandMaterial: {
    name: "Demand Material",
    roleKeys: [Role.LEGIONARY],
    key: "demandMaterial",
  },
  drawCard: {
    name: "Draw a Card",
    roleKeys: [Role.THINKER],
    key: "drawCard",
  },
  drawJack: {
    name: "Draw a Jack",
    roleKeys: [Role.THINKER],
    key: "drawJack",
  },
  gatherMaterial: {
    name: "Gather Material",
    roleKeys: [Role.LABORER],
    key: "gatherMaterial",
  },
  hireClient: {
    name: "Hire a Client",
    roleKeys: [Role.PATRON],
    key: "hireClient",
  },
  layFoundation: {
    name: "Lay a Foundation",
    roleKeys: [Role.ARCHITECT, Role.CRAFTSMAN],
    key: "layFoundation",
  },
  refillHand: {
    name: "Refill Hand",
    roleKeys: [Role.THINKER],
    key: "refillHand",
  },
  sellMaterial: {
    name: "Sell Material",
    roleKeys: [Role.MERCHANT],
    key: "sellMaterial",
  },
};

MoveOption.keys = () => Object.keys(MoveOption.properties);

MoveOption.value = (key) => MoveOption.properties[key];

MoveOption.values = () => Object.values(MoveOption.properties);

Object.freeze(MoveOption);

export default MoveOption;
