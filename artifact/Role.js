const Role = {
  ARCHITECT: "architect",
  CRAFTSMAN: "craftsman",
  LABORER: "laborer",
  LEGIONARY: "legionary",
  MERCHANT: "merchant",
  PATRON: "patron",
  THINKER: "thinker",
};

Role.properties = {
  architect: {
    name: "Architect",
    color: "gray",
    options: {
      LAY_FOUNDATION: "Lay a Foundation",
      BUILD_STRUCTURE: "Build a Structure",
    },
    key: "architect",
  },
  craftsman: {
    name: "Craftsman",
    color: "green",
    options: {
      LAY_FOUNDATION: "Lay a Foundation",
      BUILD_STRUCTURE: "Build a Structure",
    },
    key: "craftsman",
  },
  laborer: {
    name: "Laborer",
    color: "orange",
    key: "laborer",
  },
  legionary: {
    name: "Legionary",
    color: "red",
    key: "legionary",
  },
  merchant: {
    name: "Merchant",
    color: "cyan",
    key: "merchant",
  },
  patron: {
    name: "Patron",
    color: "purple",
    key: "patron",
  },
  thinker: {
    name: "Thinker",
    color: "black",
    options: {
      DRAW_JACK: "Draw a Jack",
      REFILL_HAND: "Refill Hand",
      DRAW_CARD: "Draw a Card",
    },
    key: "thinker",
  },
};

Role.keys = () => Object.keys(Role.properties);

Role.values = () => Object.values(Role.properties);

Role.value = (key) => Role.properties[key];

Object.freeze(Role);

export default Role;
