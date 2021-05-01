import Material from "./Material.js";
import Role from "./Role.js";
import Version from "./Version.js";

const OrderCard = {
  ACADEMY: "academy",
  AMPHITHEATRE: "amphitheatre",
  AQUEDUCT: "aqueduct",
  ARCHWAY: "archway",
  ATRIUM: "atrium",
  BAR: "bar",
  BASILICA: "basilica",
  BATH: "bath",
  BRIDGE: "bridge",
  CATACOMB: "catacomb",
  CIRCUS: "circus",
  CIRCUS_MAXIMUS: "circus maximus",
  COLOSSEUM: "colosseum",
  CRANE: "crane",
  DOCK: "dock",
  DOMUS_AUREA: "domus aurea",
  FORUM: "forum",
  FORUM_ROMANUM: "forum romanum",
  FOUNDRY: "foundry",
  FOUNTAIN: "fountain",
  GARDEN: "garden",
  GATE: "gate",
  INSULA: "insula",
  JACK1: "jack1",
  JACK2: "jack2",
  LATRINE: "latrine",
  LEADER: "leader",
  LUDUS_MAGNUS: "ludus magnus",
  MARKET: "market",
  PALACE: "palace",
  PALISADE: "palisade",
  PRISON: "prison",
  ROAD: "road",
  SCHOOL: "school",
  SCRIPTORIUM: "scriptorium",
  SENATE: "senate",
  SEWER: "sewer",
  SHRINE: "shrine",
  STAIRWAY: "stairway",
  STATUE: "statue",
  STOREROOM: "storeroom",
  TEMPLE: "temple",
  TOWER: "tower",
  TRIBUNAL: "tribunal",
  VILLA: "villa",
  VOMITORIUM: "vomitorium",
  WALL: "wall",
};

OrderCard.properties = {
  academy: {
    name: "Academy",
    ability:
      "You may perform one THINKER action after any turn during which you " +
      "performed at least on CRAFTSMAN action.",
    materialKey: Material.BRICK,
    materialValue: 2,
    roleKey: Role.LEGIONARY,
    key: "academy",
  },
  amphitheatre: {
    name: "Amphitheatre",
    ability:
      "Upon completion, you may perform one CRAFTSMAN action for each influence.",
    materialKey: Material.CONCRETE,
    materialValue: 2,
    roleKey: Role.ARCHITECT,
    key: "amphitheatre",
  },
  aqueduct: {
    name: "Aqueduct",
    ability:
      "When performing PATRON action, you may take one additional client from " +
      "your hand. Maximum clientele size x2",
    materialKey: Material.CONCRETE,
    materialValue: 2,
    roleKey: Role.ARCHITECT,
    key: "aqueduct",
  },
  archway: {
    name: "Archway",
    ability:
      "When performing ARCHITECT action, you may take a material from the pool " +
      "instead of your stockpile.",
    materialKey: Material.BRICK,
    materialValue: 2,
    roleKey: Role.LEGIONARY,
    key: "archway",
  },
  atrium: {
    name: "Atrium",
    ability:
      "When performing MERCHANT action, you may take a card from the deck " +
      "instead of your stockpile (Don't look at it).",
    materialKey: Material.BRICK,
    materialValue: 2,
    roleKey: Role.LEGIONARY,
    key: "atrium",
  },
  bar: {
    name: "Bar",
    ability:
      "When performing PATRON action, you may take one additional client card from the deck.",
    count: 6,
    materialKey: Material.RUBBLE,
    materialValue: 1,
    roleKey: Role.LABORER,
    key: "bar",
  },
  basilica: {
    name: "Basilica",
    ability:
      "When performing MERCHANT action, you may move one additional card from " +
      "your hand to your vault.",
    materialKey: Material.MARBLE,
    materialValue: 3,
    roleKey: Role.PATRON,
    key: "basilica",
  },
  bath: {
    name: "Bath",
    ability:
      "When performing PATRON action, each client you hire may perform its " +
      "action once as it enters your clientele.",
    materialKey: Material.BRICK,
    materialValue: 2,
    roleKey: Role.LEGIONARY,
    key: "bath",
  },
  bridge: {
    name: "Bridge",
    ability:
      "When performing LEGIONARY action, you may demand materials from all " +
      "players. You may additionally take one material from each opponent's " +
      "stockpile. Ignore Palisades.",
    materialKey: Material.CONCRETE,
    materialValue: 2,
    roleKey: Role.ARCHITECT,
    key: "bridge",
  },
  catacomb: {
    name: "Catacomb",
    ability: "Upon completion, game ends immediately. Score as usual.",
    materialKey: Material.STONE,
    materialValue: 3,
    roleKey: Role.MERCHANT,
    key: "catacomb",
  },
  circus: {
    name: "Circus",
    ability: "You may play two cards of the same role as a JACK.",
    count: 6,
    materialKey: Material.WOOD,
    materialValue: 1,
    roleKey: Role.CRAFTSMAN,
    versionKey: Version.IMPERIUM,
    key: "circus",
  },
  "circus maximus": {
    name: "Circus Maximus",
    ability:
      "Each of your clients may perform its action twice when you lead or follow its role.",
    materialKey: Material.STONE,
    materialValue: 3,
    roleKey: Role.MERCHANT,
    key: "circus maximus",
  },
  colosseum: {
    name: "Colosseum",
    ability:
      "When performing LEGIONARY action, you may additionally take one matching " +
      "client from each opponent and place it in your vault.",
    materialKey: Material.STONE,
    materialValue: 3,
    roleKey: Role.MERCHANT,
    versionKey: Version.IMPERIUM,
    key: "colosseum",
  },
  crane: {
    name: "Crane",
    ability: "You may use any card to lead or follow ARCHITECT.",
    count: 6,
    materialKey: Material.WOOD,
    materialValue: 1,
    roleKey: Role.CRAFTSMAN,
    versionKey: Version.REPUBLIC,
    key: "crane",
  },
  dock: {
    name: "Dock",
    ability:
      "When performing LABORER action, you may take one additional material from your hand.",
    count: 6,
    materialKey: Material.WOOD,
    materialValue: 1,
    roleKey: Role.CRAFTSMAN,
    key: "dock",
  },
  "domus aurea": {
    name: "Domus Aurea",
    ability:
      "When performing LEGIONARY action, you may additionally tear down one matching " +
      "incomplete building with no material of each victim. Place foundation in your " +
      "stockpile and site in your influence.",
    materialKey: Material.STONE,
    materialValue: 3,
    roleKey: Role.MERCHANT,
    versionKey: Version.REPUBLIC,
    key: "domus aurea",
  },
  forum: {
    name: "Forum",
    ability:
      "You win immediately whenever you have a client of each type in your clientele.",
    materialKey: Material.MARBLE,
    materialValue: 3,
    roleKey: Role.PATRON,
    versionKey: Version.IMPERIUM,
    key: "forum",
  },
  "forum romanum": {
    name: "Forum Romanum",
    ability:
      "You win immediately whenever you have a client of each role in your clientele " +
      "and one material of each type in your stockpile.",
    materialKey: Material.MARBLE,
    materialValue: 3,
    roleKey: Role.PATRON,
    versionKey: Version.REPUBLIC,
    key: "forum romanum",
  },
  foundry: {
    name: "Foundry",
    ability:
      "Upon completion, you may perform one LABORER action for each influence.",
    materialKey: Material.BRICK,
    materialValue: 2,
    roleKey: Role.LEGIONARY,
    key: "foundry",
  },
  fountain: {
    name: "Fountain",
    ability:
      "You may perform CRAFTSMAN actions with cards from the deck instead of from " +
      "your hand. You may also keep the card and skip the action.",
    materialKey: Material.MARBLE,
    materialValue: 3,
    roleKey: Role.PATRON,
    key: "fountain",
  },
  garden: {
    name: "Garden",
    ability:
      "Upon completion, you may perform one PATRON action for each influence.",
    materialKey: Material.STONE,
    materialValue: 3,
    roleKey: Role.MERCHANT,
    key: "garden",
  },
  gate: {
    name: "Gate",
    ability:
      "MARBLE structures provide their functions as soon as you lay their foundations.",
    materialKey: Material.BRICK,
    materialValue: 2,
    roleKey: Role.LEGIONARY,
    key: "gate",
  },
  insula: {
    name: "Insula",
    ability: "Maximum clientele size +2",
    count: 6,
    materialKey: Material.RUBBLE,
    materialValue: 1,
    roleKey: Role.LABORER,
    key: "insula",
  },
  jack1: {
    name: "Jack",
    ability: "Lead or follow any role",
    key: "jack1",
  },
  jack2: {
    name: "Jack",
    ability: "Lead or follow any role",
    key: "jack2",
  },
  latrine: {
    name: "Latrine",
    ability:
      "Before performing THINKER action, you may discard one card to pool.",
    count: 6,
    materialKey: Material.RUBBLE,
    materialValue: 1,
    roleKey: Role.LABORER,
    key: "latrine",
  },
  leader: {
    name: "Leader",
    ability: "LEAD a role from your hand or THINK and draw new cards",
    key: "leader",
  },
  "ludus magnus": {
    name: "Ludus Magnus",
    ability: "Each MERCHANT client in your clientele counts as any role.",
    materialKey: Material.MARBLE,
    materialValue: 3,
    roleKey: Role.PATRON,
    key: "ludus magnus",
  },
  market: {
    name: "Market",
    ability: "Maximum vault size +2",
    count: 6,
    materialKey: Material.WOOD,
    materialValue: 1,
    roleKey: Role.CRAFTSMAN,
    key: "market",
  },
  palace: {
    name: "Palace",
    ability:
      "You may play multiple cards of the same role to perform additional actions.",
    materialKey: Material.MARBLE,
    materialValue: 3,
    roleKey: Role.PATRON,
    key: "palace",
  },
  palisade: {
    name: "Palisade",
    ability: "Immune to LEGIONARY",
    count: 6,
    materialKey: Material.WOOD,
    materialValue: 1,
    roleKey: Role.CRAFTSMAN,
    key: "palisade",
  },
  prison: {
    name: "Prison",
    ability:
      "Upon completion, you may exchange the prison's site (and thus influence) for " +
      "an opponent's completed structure.",
    materialKey: Material.STONE,
    materialValue: 3,
    roleKey: Role.MERCHANT,
    key: "prison",
  },
  road: {
    name: "Road",
    ability:
      "You may use any material towards the completion of STONE structures.",
    count: 6,
    materialKey: Material.RUBBLE,
    materialValue: 1,
    roleKey: Role.LABORER,
    key: "road",
  },
  school: {
    name: "School",
    ability:
      "Upon completion, you may perform one THINKER action for each influence.",
    materialKey: Material.BRICK,
    materialValue: 2,
    roleKey: Role.LEGIONARY,
    key: "school",
  },
  scriptorium: {
    name: "Scriptorium",
    ability:
      "You may complete any structure by adding MARBLE to it, no matter its stated cost.",
    materialKey: Material.STONE,
    materialValue: 3,
    roleKey: Role.MERCHANT,
    key: "scriptorium",
  },
  senate: {
    name: "Senate",
    ability:
      "At the end of each turn, you may take into your hand any JACKS played by opponents.",
    materialKey: Material.CONCRETE,
    materialValue: 2,
    roleKey: Role.ARCHITECT,
    versionKey: Version.IMPERIUM,
    key: "senate",
  },
  sewer: {
    name: "Sewer",
    ability:
      "You may place order cards you used to lead or follow into your stockpile " +
      "at the end of your turn.",
    materialKey: Material.STONE,
    materialValue: 3,
    roleKey: Role.MERCHANT,
    key: "sewer",
  },
  shrine: {
    name: "Shrine",
    ability: "Hand refill size +2",
    materialKey: Material.BRICK,
    materialValue: 2,
    roleKey: Role.LEGIONARY,
    key: "shrine",
  },
  stairway: {
    name: "Stairway",
    ability:
      "When performing ARCHITECT action, you may additionally add a material to " +
      "an opponent's completed structure to make its function available to all players.",
    materialKey: Material.MARBLE,
    materialValue: 3,
    roleKey: Role.PATRON,
    key: "stairway",
  },
  statue: {
    name: "Statue",
    ability: "+3 VP You may place the statue on any site.",
    materialKey: Material.MARBLE,
    materialValue: 3,
    roleKey: Role.PATRON,
    key: "statue",
  },
  storeroom: {
    name: "Storeroom",
    ability: "Each client in your clientele also counts as a LABORER.",
    materialKey: Material.CONCRETE,
    materialValue: 2,
    roleKey: Role.ARCHITECT,
    key: "storeroom",
  },
  temple: {
    name: "Temple",
    ability: "Hand refill size +4",
    materialKey: Material.MARBLE,
    materialValue: 3,
    roleKey: Role.PATRON,
    key: "temple",
  },
  tower: {
    name: "Tower",
    ability:
      "You may use RUBBLE in any structure. You may lay foundations onto out of town " +
      "sites at no extra cost.",
    materialKey: Material.CONCRETE,
    materialValue: 2,
    roleKey: Role.ARCHITECT,
    key: "tower",
  },
  tribunal: {
    name: "Tribunal",
    ability: "After performing THINKER action, you may draw a JACK.",
    materialKey: Material.CONCRETE,
    materialValue: 2,
    roleKey: Role.ARCHITECT,
    versionKey: Version.REPUBLIC,
    key: "tribunal",
  },
  villa: {
    name: "Villa",
    ability:
      "If you use the ARCHITECT to put one stone into the construction of the villa, " +
      "it is completed immediately.",
    materialKey: Material.STONE,
    materialValue: 3,
    roleKey: Role.MERCHANT,
    key: "villa",
  },
  vomitorium: {
    name: "Vomitorium",
    ability:
      "Before performing THINKER action, you may discard all your cards to the pool.",
    materialKey: Material.CONCRETE,
    materialValue: 2,
    roleKey: Role.ARCHITECT,
    key: "vomitorium",
  },
  wall: {
    name: "Wall",
    ability:
      "Immune to LEGIONARY. +1 VP for every two materials in your stockpile.",
    materialKey: Material.CONCRETE,
    materialValue: 2,
    roleKey: Role.ARCHITECT,
    key: "wall",
  },
};

OrderCard.keys = () => Object.keys(OrderCard.properties);

OrderCard.values = () => Object.values(OrderCard.properties);

R.forEach((cardKey) => {
  const card = OrderCard.properties[cardKey];
  if (R.isNil(card.count)) {
    card.count = 3;
  }
}, OrderCard.keys());

OrderCard.keysByVersion = (versionKey) =>
  R.map((c) => c.key, OrderCard.valuesByVersion(versionKey));

OrderCard.value = (key) => OrderCard.properties[key];

OrderCard.valuesByVersion = (versionKey) => {
  const filterFunction = (value) =>
    value.key !== "leader" &&
    !value.key.startsWith("jack") &&
    (R.isNil(value.versionKey) || value.versionKey === versionKey);

  return R.filter(filterFunction, OrderCard.values());
};

Object.freeze(OrderCard);

export default OrderCard;
