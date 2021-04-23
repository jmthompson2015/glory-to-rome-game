import Material from "./Material.js";

const MiscCard = {
  JACK1: "jack1",
  JACK2: "jack2",
  LEADER: "leader",
  MERCHANT_BONUS_BRICK: "merchant bonus brick",
  MERCHANT_BONUS_CONCRETE: "merchant bonus concrete",
  MERCHANT_BONUS_MARBLE: "merchant bonus marble",
  MERCHANT_BONUS_RUBBLE: "merchant bonus rubble",
  MERCHANT_BONUS_STONE: "merchant bonus stone",
  MERCHANT_BONUS_WOOD: "merchant bonus wood",
};

MiscCard.properties = {
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
  leader: {
    name: "Leader",
    ability: "LEAD a role from your hand or THINK and draw new cards",
    key: "leader",
  },
  "merchant bonus brick": {
    name: "Merchant Bonus (Brick)",
    ability:
      "+3 victory points for the player with the most BRICK in his vault at the end of the game.",
    materialKey: Material.BRICK,
    materialValue: 3,
    key: "merchant bonus brick",
  },
  "merchant bonus concrete": {
    name: "Merchant Bonus (Concrete)",
    ability:
      "+3 victory points for the player with the most CONCRETE in his vault at " +
      "the end of the game.",
    materialKey: Material.CONCRETE,
    materialValue: 3,
    key: "merchant bonus concrete",
  },
  "merchant bonus marble": {
    name: "Merchant Bonus (Marble)",
    ability:
      "+3 victory points for the player with the most MARBLE in his vault at the end of the game.",
    materialKey: Material.MARBLE,
    materialValue: 3,
    key: "merchant bonus marble",
  },
  "merchant bonus rubble": {
    name: "Merchant Bonus (Rubble)",
    ability:
      "+3 victory points for the player with the most RUBBLE in his vault at the end of the game.",
    materialKey: Material.RUBBLE,
    materialValue: 3,
    key: "merchant bonus rubble",
  },
  "merchant bonus stone": {
    name: "Merchant Bonus (Stone)",
    ability:
      "+3 victory points for the player with the most STONE in his vault at the end of the game.",
    materialKey: Material.STONE,
    materialValue: 3,
    key: "merchant bonus stone",
  },
  "merchant bonus wood": {
    name: "Merchant Bonus (Wood)",
    ability:
      "+3 victory points for the player with the most WOOD in his vault at the end of the game.",
    materialKey: Material.WOOD,
    materialValue: 3,
    key: "merchant bonus wood",
  },
};

MiscCard.keys = () => Object.keys(MiscCard.properties);

MiscCard.values = () => Object.values(MiscCard.properties);

MiscCard.value = (key) => MiscCard.properties[key];

Object.freeze(MiscCard);

export default MiscCard;
