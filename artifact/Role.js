const Role = {
  ARCHITECT: "architect",
  CRAFTSMAN: "craftsman",
  LABORER: "laborer",
  LEGIONARY: "legionary",
  MERCHANT: "merchant",
  PATRON: "patron",
};

Role.properties = {
  architect: {
    name: "Architect",
    color: "Gray",
    key: "architect",
  },
  craftsman: {
    name: "Craftsman",
    color: "Green",
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
};

Role.keys = () => Object.keys(Role.properties);

Role.values = () => Object.values(Role.properties);

Role.value = (key) => Role.properties[key];

Object.freeze(Role);

export default Role;
