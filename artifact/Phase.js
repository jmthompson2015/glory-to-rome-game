const Phase = {
  DECLARE_ROLE: "declareRole",
  PERFORM_ROLE: "performRole",

  properties: {
    declareRole: {
      name: "Declare Role",
      key: "declareRole",
    },
    performRole: {
      name: "Perform Role",
      key: "performRole",
    },
  },
};

Phase.keys = () => Object.keys(Phase.properties);

Phase.values = () => Object.values(Phase.properties);

Phase.value = (key) => Phase.properties[key];

Object.freeze(Phase);

export default Phase;
