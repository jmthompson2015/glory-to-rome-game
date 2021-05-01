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
    color: "Gray",
    options: {
      LAY_FOUNDATION: "lay a foundation",
      BUILD_STRUCTURE: "build structure",
    },
    key: "architect",
  },
  craftsman: {
    name: "Craftsman",
    color: "Green",
    options: {
      LAY_FOUNDATION: "lay a foundation",
      BUILD_STRUCTURE: "build structure",
    },
    key: "craftsman",
  },
  laborer: {
    name: "Laborer",
    color: "Orange",
    key: "laborer",
  },
  legionary: {
    name: "Legionary",
    color: "Red",
    key: "legionary",
  },
  merchant: {
    name: "Merchant",
    color: "Cyan",
    key: "merchant",
  },
  patron: {
    name: "Patron",
    color: "Purple",
    key: "patron",
  },
  thinker: {
    name: "Thinker",
    color: "White",
    options: {
      DRAW_JACK: "draw a jack",
      REFILL_HAND: "refill hand",
      DRAW_CARD: "draw a card",
    },
    key: "thinker",
  },
};

Role.keys = () => Object.keys(Role.properties);

Role.values = () => Object.values(Role.properties);

Role.value = (key) => Role.properties[key];

Object.freeze(Role);

export default Role;
