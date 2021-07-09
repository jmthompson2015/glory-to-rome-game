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
    key: "architect",
  },
  craftsman: {
    name: "Craftsman",
    color: "green",
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
    key: "thinker",
  },
};

Role.keys = () => Object.keys(Role.properties);

Role.value = (key) => Role.properties[key];

Role.values = () => Object.values(Role.properties);

Object.freeze(Role);

export default Role;
