import Material from "./Material.js";

const SiteCard = {
  BRICK: "brick",
  CONCRETE: "concrete",
  MARBLE: "marble",
  RUBBLE: "rubble",
  STONE: "stone",
  WOOD: "wood",
};

SiteCard.properties = {
  brick: {
    name: "Brick",
    materialKey: Material.BRICK,
    materialValue: 2,
    key: "brick",
  },
  concrete: {
    name: "Concrete",
    materialKey: Material.CONCRETE,
    materialValue: 2,
    key: "concrete",
  },
  marble: {
    name: "Marble",
    materialKey: Material.MARBLE,
    materialValue: 3,
    key: "marble",
  },
  rubble: {
    name: "Rubble",
    materialKey: Material.RUBBLE,
    materialValue: 1,
    key: "rubble",
  },
  stone: {
    name: "Stone",
    materialKey: Material.STONE,
    materialValue: 3,
    key: "stone",
  },
  wood: {
    name: "Wood",
    materialKey: Material.WOOD,
    materialValue: 1,
    key: "wood",
  },
};

SiteCard.keys = () => Object.keys(SiteCard.properties);

SiteCard.values = () => Object.values(SiteCard.properties);

R.forEach((cardKey) => {
  const card = SiteCard.properties[cardKey];
  if (R.isNil(card.count)) {
    card.count = 6;
  }
  if (R.isNil(card.image)) {
    card.image = `resource/{version}/siteCard/${card.name}_Site.png`;
    card.imageBack = `resource/{version}/siteCard/${card.name}_SiteBack.png`;
  }
}, SiteCard.keys());

SiteCard.image = (card, version = "v2.0", isFaceup = true) => {
  let answer;

  if (SiteCard.keys().includes(card.key)) {
    answer = isFaceup
      ? card.image.replace("{version}", version)
      : card.imageBack.replace("{version}", version);
  }

  return answer;
};

SiteCard.value = (key) => SiteCard.properties[key];

Object.freeze(SiteCard);

export default SiteCard;
