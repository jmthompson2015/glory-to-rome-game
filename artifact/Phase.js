const Phase = {
  DECLARE_ROLE: "declareRole",
  PERFORM_ROLE: "performRole",
  CLEANUP: "cleanup",

  properties: {
    declareRole: {
      name: "Declare Role",
      key: "declareRole",
    },
    performRole: {
      name: "Perform Role",
      key: "performRole",
    },
    cleanup: {
      name: "Cleanup",
      key: "cleanup",
    },
  },
};

Phase.keys = () => Object.keys(Phase.properties);

Phase.values = () => Object.values(Phase.properties);

Phase.value = (key) => Phase.properties[key];

Object.freeze(Phase);

export default Phase;
